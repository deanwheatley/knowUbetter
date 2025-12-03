import { generateClient } from 'aws-amplify/data';
import { userService } from './userService';
import { organizationService } from './organizationService';
import { teamService } from './teamService';

const client = generateClient<any>();

/**
 * Invitation Service
 * Handles smart invitation processing with existing user detection
 */

export interface InvitationResult {
  email: string;
  status: 'invited' | 'assigned' | 'error';
  message: string;
  invitationId?: string;
}

export interface InvitationSummary {
  teamsAssigned: InvitationResult[];
  invitationsSent: InvitationResult[];
  errors: InvitationResult[];
}

export const invitationService = {
  /**
   * Smart invitation processing
   * - If user exists in same org: assign to teams immediately
   * - If user exists in different org: return error
   * - If user doesn't exist: send invitation email
   */
  async processInvitations(
    organizationId: string,
    emails: string[],
    teamIds: string[],
    invitedBy: string,
    message?: string
  ): Promise<InvitationSummary> {
    const summary: InvitationSummary = {
      teamsAssigned: [],
      invitationsSent: [],
      errors: [],
    };

    // Validate organization exists
    const org = await organizationService.getById(organizationId);
    if (!org) {
      throw new Error('Organization not found');
    }

    // Validate teams exist and belong to organization
    for (const teamId of teamIds) {
      const team = await teamService.getById(teamId);
      if (!team) {
        throw new Error(`Team ${teamId} not found`);
      }
      const teamData = team as any;
      if (teamData.organizationId !== organizationId) {
        throw new Error(`Team ${teamId} does not belong to organization`);
      }
    }

    // Process each email
    for (const email of emails) {
      try {
        const result = await this.processInvitation(
          organizationId,
          email,
          teamIds,
          invitedBy,
          message
        );

        if (result.status === 'assigned') {
          summary.teamsAssigned.push(result);
        } else if (result.status === 'invited') {
          summary.invitationsSent.push(result);
        } else {
          summary.errors.push(result);
        }
      } catch (error: any) {
        summary.errors.push({
          email,
          status: 'error',
          message: error.message || 'Failed to process invitation',
        });
      }
    }

    return summary;
  },

  /**
   * Process single invitation
   */
  async processInvitation(
    organizationId: string,
    email: string,
    teamIds: string[],
    invitedBy: string,
    message?: string
  ): Promise<InvitationResult> {
    // Check if user exists
    const existingUser = await userService.getByEmail(email);

    if (existingUser) {
      const userData = existingUser as any;

      // Check if user belongs to same organization
      if (userData.organizationId === organizationId) {
        // User exists in same org - assign to teams immediately
        for (const teamId of teamIds) {
          try {
            await userService.addToTeam(userData.id, teamId);
          } catch (error) {
            // User might already be in team, continue
            console.log(`User ${email} already in team ${teamId}`);
          }
        }

        // TODO: Send in-app notification

        return {
          email,
          status: 'assigned',
          message: `User already exists - added to ${teamIds.length} team(s)`,
        };
      } else {
        // User exists in different org - error
        return {
          email,
          status: 'error',
          message: 'User belongs to a different organization',
        };
      }
    }

    // User doesn't exist - create invitation
    const invitation = await this.createInvitation(
      organizationId,
      email,
      teamIds,
      invitedBy,
      message
    );

    // TODO: Send invitation email

    return {
      email,
      status: 'invited',
      message: 'Invitation sent',
      invitationId: invitation.id,
    };
  },

  /**
   * Create invitation record
   */
  async createInvitation(
    organizationId: string,
    email: string,
    teamIds: string[],
    invitedBy: string,
    message?: string
  ): Promise<any> {
    // Check if invitation already exists
    const existing = await this.getByEmail(organizationId, email);
    if (existing && existing.status === 'PENDING') {
      // Update existing invitation
      return await client.models.Invitation.update({
        id: existing.id,
        teamIds,
        message,
        invitedBy,
      } as any);
    }

    // Reserve license
    const canReserve = await organizationService.reserveLicense(organizationId);
    if (!canReserve) {
      throw new Error('No available licenses');
    }

    // Get organization settings for expiration
    const org = await organizationService.getById(organizationId);
    const orgData = org as any;
    const expirationDays = orgData.invitationExpirationDays || 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    // Create invitation
    const result = await client.models.Invitation.create({
      organizationId,
      email,
      teamIds,
      invitedBy,
      message,
      status: 'PENDING',
      expiresAt: expiresAt.toISOString(),
    } as any);

    if (!result.data) {
      throw new Error('Failed to create invitation');
    }

    return result.data;
  },

  /**
   * Get invitation by email
   */
  async getByEmail(organizationId: string, email: string): Promise<any | null> {
    const result = await client.models.Invitation.list({
      filter: {
        organizationId: { eq: organizationId },
        email: { eq: email },
      },
    });

    return result.data[0] || null;
  },

  /**
   * Get invitation by ID
   */
  async getById(id: string): Promise<any | null> {
    const result = await client.models.Invitation.get({ id });
    return result.data || null;
  },

  /**
   * List invitations by organization
   */
  async listByOrganization(
    organizationId: string,
    status?: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'RESCINDED'
  ): Promise<any[]> {
    const filter: any = {
      organizationId: { eq: organizationId },
    };

    if (status) {
      filter.status = { eq: status };
    }

    const result = await client.models.Invitation.list({ filter });
    return result.data;
  },

  /**
   * Accept invitation
   */
  async accept(invitationId: string, userId: string): Promise<void> {
    const invitation = await this.getById(invitationId);
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    const invitationData = invitation as any;

    if (invitationData.status !== 'PENDING') {
      throw new Error('Invitation is not pending');
    }

    // Check if expired
    if (new Date(invitationData.expiresAt) < new Date()) {
      await this.expire(invitationId);
      throw new Error('Invitation has expired');
    }

    // Assign user to teams
    for (const teamId of invitationData.teamIds) {
      await userService.addToTeam(userId, teamId);
    }

    // Mark invitation as accepted
    await client.models.Invitation.update({
      id: invitationId,
      status: 'ACCEPTED',
      acceptedAt: new Date().toISOString(),
    } as any);
  },

  /**
   * Rescind/cancel invitation
   */
  async rescind(invitationId: string): Promise<void> {
    const invitation = await this.getById(invitationId);
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    const invitationData = invitation as any;

    // Release license
    await organizationService.releaseLicense(invitationData.organizationId);

    // Mark as rescinded
    await client.models.Invitation.update({
      id: invitationId,
      status: 'RESCINDED',
    } as any);
  },

  /**
   * Expire invitation
   */
  async expire(invitationId: string): Promise<void> {
    const invitation = await this.getById(invitationId);
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    const invitationData = invitation as any;

    // Release license
    await organizationService.releaseLicense(invitationData.organizationId);

    // Mark as expired
    await client.models.Invitation.update({
      id: invitationId,
      status: 'EXPIRED',
    } as any);
  },

  /**
   * Resend invitation
   */
  async resend(invitationId: string): Promise<void> {
    const invitation = await this.getById(invitationId);
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    const invitationData = invitation as any;

    if (invitationData.status !== 'PENDING') {
      throw new Error('Can only resend pending invitations');
    }

    // TODO: Send invitation email

    // Update last sent timestamp
    await client.models.Invitation.update({
      id: invitationId,
      updatedAt: new Date().toISOString(),
    } as any);
  },

  /**
   * Check for expired invitations and process them
   * This should be run as a cron job
   */
  async processExpiredInvitations(): Promise<number> {
    const allInvitations = await client.models.Invitation.list({
      filter: {
        status: { eq: 'PENDING' },
      },
    });

    let expiredCount = 0;
    const now = new Date();

    for (const invitation of allInvitations.data) {
      const invitationData = invitation as any;
      if (new Date(invitationData.expiresAt) < now) {
        await this.expire(invitationData.id);
        expiredCount++;
      }
    }

    return expiredCount;
  },
};
