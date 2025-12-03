import { generateClient } from 'aws-amplify/data';

const client = generateClient<any>();

/**
 * Team Service
 * Handles team operations with multi-tenancy support
 */

export const teamService = {
  /**
   * Create a new team
   */
  async create(data: {
    organizationId: string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    pictureUrl?: string;
    createdBy: string;
  }): Promise<any> {
    // Validate organization exists
    const org = await client.models.Organization.get({ id: data.organizationId });
    if (!org.data) {
      throw new Error('Organization not found');
    }

    const result = await client.models.Team.create({
      organizationId: data.organizationId,
      name: data.name,
      description: data.description,
      color: data.color || '#3B82F6',
      icon: data.icon || '👥',
      pictureUrl: data.pictureUrl,
      createdBy: data.createdBy,
      isAdminLocked: false,
      memberCount: 0,
      totalKudos: 0,
      teamAdminIds: [],
    } as any);

    if (!result.data) {
      throw new Error('Failed to create team');
    }

    // Update organization team count
    const orgData = org.data as any;
    await client.models.Organization.update({
      id: data.organizationId,
      teamCount: (orgData.teamCount || 0) + 1,
    } as any);

    return result.data;
  },

  /**
   * Get team by ID
   */
  async getById(id: string): Promise<any | null> {
    const result = await client.models.Team.get({ id });
    return result.data || null;
  },

  /**
   * List teams by organization
   */
  async listByOrganization(organizationId: string): Promise<any[]> {
    const result = await client.models.Team.list({
      filter: { organizationId: { eq: organizationId } },
    });
    return result.data;
  },

  /**
   * Update team
   */
  async update(
    teamId: string,
    updates: {
      name?: string;
      description?: string;
      color?: string;
      icon?: string;
      pictureUrl?: string;
      isAdminLocked?: boolean;
    }
  ): Promise<any> {
    const updateData: any = { id: teamId };

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.color !== undefined) updateData.color = updates.color;
    if (updates.icon !== undefined) updateData.icon = updates.icon;
    if (updates.pictureUrl !== undefined) updateData.pictureUrl = updates.pictureUrl;
    if (updates.isAdminLocked !== undefined) updateData.isAdminLocked = updates.isAdminLocked;

    const result = await client.models.Team.update(updateData as any);
    return result.data;
  },

  /**
   * Delete team
   */
  async delete(teamId: string): Promise<void> {
    const team = await this.getById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    // Delete all team memberships
    const memberships = await client.models.TeamMember.list({
      filter: { teamId: { eq: teamId } },
    });

    for (const membership of memberships.data) {
      await client.models.TeamMember.delete({ id: membership.id });
    }

    // Delete the team
    await client.models.Team.delete({ id: teamId });

    // Update organization team count
    const org = await client.models.Organization.get({ id: team.organizationId });
    if (org && org.data) {
      const orgData = org.data as any;
      await client.models.Organization.update({
        id: team.organizationId,
        teamCount: Math.max(0, (orgData.teamCount || 0) - 1),
      } as any);
    }
  },

  /**
   * Add team admin
   */
  async addTeamAdmin(teamId: string, userId: string): Promise<void> {
    const team = await this.getById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const user = await client.models.User.get({ id: userId });
    if (!user || !user.data) {
      throw new Error('User not found');
    }

    const userData = user.data as any;

    // Validate user belongs to same organization
    if (userData.organizationId !== team.organizationId) {
      throw new Error('User does not belong to team organization');
    }

    // Update team's teamAdminIds
    const teamAdminIds = team.teamAdminIds || [];
    if (!teamAdminIds.includes(userId)) {
      teamAdminIds.push(userId);
      await client.models.Team.update({
        id: teamId,
        teamAdminIds,
      } as any);
    }

    // Update user's teamAdminFor
    const teamAdminFor = userData.teamAdminFor || [];
    if (!teamAdminFor.includes(teamId)) {
      teamAdminFor.push(teamId);
      await client.models.User.update({
        id: userId,
        teamAdminFor,
      } as any);
    }

    // Upgrade user role if needed
    if (userData.role === 'USER') {
      await client.models.User.update({
        id: userId,
        role: 'TEAM_ADMIN',
      } as any);
    }
  },

  /**
   * Remove team admin
   */
  async removeTeamAdmin(teamId: string, userId: string): Promise<void> {
    const team = await this.getById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const user = await client.models.User.get({ id: userId });
    if (!user || !user.data) {
      throw new Error('User not found');
    }

    const userData = user.data as any;

    // Update team's teamAdminIds
    const teamAdminIds = (team.teamAdminIds || []).filter((id: string) => id !== userId);
    await client.models.Team.update({
      id: teamId,
      teamAdminIds,
    } as any);

    // Update user's teamAdminFor
    const teamAdminFor = (userData.teamAdminFor || []).filter((id: string) => id !== teamId);
    await client.models.User.update({
      id: userId,
      teamAdminFor,
    } as any);

    // Downgrade user role if they're no longer admin of any team
    if (teamAdminFor.length === 0 && userData.role === 'TEAM_ADMIN') {
      await client.models.User.update({
        id: userId,
        role: 'USER',
      } as any);
    }
  },

  /**
   * Upload team picture
   */
  async uploadPicture(teamId: string, pictureUrl: string): Promise<void> {
    await client.models.Team.update({
      id: teamId,
      pictureUrl,
    } as any);
  },

  /**
   * Generate auto icon for team
   */
  generateAutoIcon(teamName: string): string {
    const emojis = ['👥', '🎯', '🚀', '⭐', '💡', '🔥', '⚡', '🎨', '🏆', '💪'];
    const index = teamName.length % emojis.length;
    return emojis[index];
  },

  /**
   * Get team members
   */
  async getMembers(teamId: string): Promise<any[]> {
    const memberships = await client.models.TeamMember.list({
      filter: { teamId: { eq: teamId } },
    });

    const members = [];
    for (const membership of memberships.data) {
      const membershipData = membership as any;
      const user = await client.models.User.get({ id: membershipData.userId });
      if (user && user.data) {
        members.push({
          ...user.data,
          membershipRole: membershipData.role,
          joinedAt: membershipData.joinedAt,
        });
      }
    }

    return members;
  },

  /**
   * Check if user is team admin
   */
  async isTeamAdmin(teamId: string, userId: string): Promise<boolean> {
    const team = await this.getById(teamId);
    if (!team) {
      return false;
    }

    const teamAdminIds = team.teamAdminIds || [];
    return teamAdminIds.includes(userId);
  },

  /**
   * Validate team access for user
   */
  async validateAccess(teamId: string, userId: string): Promise<boolean> {
    const team = await this.getById(teamId);
    if (!team) {
      return false;
    }

    const user = await client.models.User.get({ id: userId });
    if (!user || !user.data) {
      return false;
    }

    const userData = user.data as any;

    // Check if user belongs to same organization
    return userData.organizationId === team.organizationId;
  },
};
