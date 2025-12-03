import { generateClient } from 'aws-amplify/data';

const client = generateClient<any>();

/**
 * User Service
 * Handles user operations with multi-tenancy support
 */

export const userService = {
  /**
   * Create a new user with organization
   */
  async create(data: {
    username: string;
    email: string;
    displayName: string;
    organizationId: string;
    role?: 'USER' | 'TEAM_ADMIN' | 'ORG_ADMIN' | 'SYSTEM_ADMIN';
    authProvider?: 'KNOWUBETTER' | 'GOOGLE' | 'FACEBOOK' | 'SSO';
    avatar?: string;
    about?: string;
  }): Promise<any> {
    // Validate organization exists
    const org = await client.models.Organization.get({ id: data.organizationId });
    if (!org.data) {
      throw new Error('Organization not found');
    }

    const result = await client.models.User.create({
      username: data.username,
      email: data.email,
      displayName: data.displayName,
      organizationId: data.organizationId,
      role: data.role || 'USER',
      teamAdminFor: [],
      authProvider: data.authProvider || 'KNOWUBETTER',
      avatar: data.avatar,
      about: data.about,
      totalKudos: 0,
      propKudos: 0,
      weeklyPropAllowance: 100,
      usedPropAllowance: 0,
    } as any);

    if (!result.data) {
      throw new Error('Failed to create user');
    }

    return result.data;
  },

  /**
   * Get user by ID
   */
  async getById(id: string): Promise<any | null> {
    const result = await client.models.User.get({ id });
    return result.data || null;
  },

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<any | null> {
    const result = await client.models.User.list({
      filter: { email: { eq: email } },
    });
    return result.data[0] || null;
  },

  /**
   * List users by organization
   */
  async listByOrganization(organizationId: string): Promise<any[]> {
    const result = await client.models.User.list({
      filter: { organizationId: { eq: organizationId } },
    });
    return result.data;
  },

  /**
   * Assign role to user
   */
  async assignRole(
    userId: string,
    role: 'USER' | 'TEAM_ADMIN' | 'ORG_ADMIN' | 'SYSTEM_ADMIN'
  ): Promise<any> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate role hierarchy
    const roleHierarchy = ['USER', 'TEAM_ADMIN', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
    const currentRoleIndex = roleHierarchy.indexOf(user.role);
    const newRoleIndex = roleHierarchy.indexOf(role);

    // Only allow role changes within valid hierarchy
    if (newRoleIndex < currentRoleIndex) {
      // Downgrading role - clear team admin assignments if needed
      if (role === 'USER' && user.teamAdminFor?.length > 0) {
        await client.models.User.update({
          id: userId,
          role,
          teamAdminFor: [],
        } as any);
      } else {
        await client.models.User.update({
          id: userId,
          role,
        } as any);
      }
    } else {
      await client.models.User.update({
        id: userId,
        role,
      } as any);
    }

    return this.getById(userId);
  },

  /**
   * Check if user has permission
   */
  checkPermission(
    userRole: string,
    requiredRole: 'USER' | 'TEAM_ADMIN' | 'ORG_ADMIN' | 'SYSTEM_ADMIN'
  ): boolean {
    const roleHierarchy = ['USER', 'TEAM_ADMIN', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    
    return userRoleIndex >= requiredRoleIndex;
  },

  /**
   * Add user to team
   */
  async addToTeam(userId: string, teamId: string): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const team = await client.models.Team.get({ id: teamId });
    if (!team || !team.data) {
      throw new Error('Team not found');
    }

    const teamData = team.data as any;

    // Validate team belongs to user's organization
    if (teamData.organizationId !== user.organizationId) {
      throw new Error('Team does not belong to user organization');
    }

    // Create team membership
    await client.models.TeamMember.create({
      userId,
      teamId,
      role: 'MEMBER',
      joinedAt: new Date().toISOString(),
    } as any);

    // Update team member count
    await client.models.Team.update({
      id: teamId,
      memberCount: (teamData.memberCount || 0) + 1,
    } as any);
  },

  /**
   * Remove user from team
   */
  async removeFromTeam(userId: string, teamId: string): Promise<void> {
    const memberships = await client.models.TeamMember.list({
      filter: {
        userId: { eq: userId },
        teamId: { eq: teamId },
      },
    });

    if (memberships.data.length > 0) {
      const membershipData = memberships.data[0] as any;
      await client.models.TeamMember.delete({ id: membershipData.id });

      // Update team member count
      const team = await client.models.Team.get({ id: teamId });
      if (team && team.data) {
        const teamData = team.data as any;
        await client.models.Team.update({
          id: teamId,
          memberCount: Math.max(0, (teamData.memberCount || 0) - 1),
        } as any);
      }
    }
  },

  /**
   * Add user as team admin
   */
  async addAsTeamAdmin(userId: string, teamId: string): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const team = await client.models.Team.get({ id: teamId });
    if (!team || !team.data) {
      throw new Error('Team not found');
    }

    const teamData = team.data as any;

    // Validate team belongs to user's organization
    if (teamData.organizationId !== user.organizationId) {
      throw new Error('Team does not belong to user organization');
    }

    // Update user's teamAdminFor array
    const teamAdminFor = user.teamAdminFor || [];
    if (!teamAdminFor.includes(teamId)) {
      teamAdminFor.push(teamId);
      await client.models.User.update({
        id: userId,
        teamAdminFor,
      } as any);
    }

    // Update team's teamAdminIds array
    const teamAdminIds = teamData.teamAdminIds || [];
    if (!teamAdminIds.includes(userId)) {
      teamAdminIds.push(userId);
      await client.models.Team.update({
        id: teamId,
        teamAdminIds,
      } as any);
    }

    // Upgrade user role to TEAM_ADMIN if they're just a USER
    if (user.role === 'USER') {
      await this.assignRole(userId, 'TEAM_ADMIN');
    }
  },

  /**
   * Remove user as team admin
   */
  async removeAsTeamAdmin(userId: string, teamId: string): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const team = await client.models.Team.get({ id: teamId });
    if (!team || !team.data) {
      throw new Error('Team not found');
    }

    const teamData = team.data as any;

    // Update user's teamAdminFor array
    const teamAdminFor = (user.teamAdminFor || []).filter((id: string) => id !== teamId);
    await client.models.User.update({
      id: userId,
      teamAdminFor,
    } as any);

    // Update team's teamAdminIds array
    const teamAdminIds = (teamData.teamAdminIds || []).filter((id: string) => id !== userId);
    await client.models.Team.update({
      id: teamId,
      teamAdminIds,
    } as any);

    // Downgrade user role to USER if they're no longer admin of any team
    if (teamAdminFor.length === 0 && user.role === 'TEAM_ADMIN') {
      await this.assignRole(userId, 'USER');
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: {
      displayName?: string;
      avatar?: string;
      about?: string;
    }
  ): Promise<any> {
    const updateData: any = { id: userId };

    if (updates.displayName !== undefined) updateData.displayName = updates.displayName;
    if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
    if (updates.about !== undefined) updateData.about = updates.about;

    const result = await client.models.User.update(updateData as any);
    return result.data;
  },

  /**
   * Update last active timestamp
   */
  async updateLastActive(userId: string): Promise<void> {
    await client.models.User.update({
      id: userId,
      lastAllowanceReset: new Date().toISOString(),
    } as any);
  },
};
