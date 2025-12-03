import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

/**
 * Data Isolation Middleware
 * Ensures all queries are filtered by organizationId for multi-tenant data isolation
 */

export interface IsolationContext {
  userId: string;
  organizationId: string;
  role: 'USER' | 'TEAM_ADMIN' | 'ORG_ADMIN' | 'SYSTEM_ADMIN';
}

export const dataIsolation = {
  /**
   * Get user context for isolation
   */
  async getUserContext(userId: string): Promise<IsolationContext | null> {
    const user = await client.models.User.get({ id: userId });
    
    if (!user.data) {
      return null;
    }

    return {
      userId: user.data.id,
      organizationId: user.data.organizationId,
      role: user.data.role as any,
    };
  },

  /**
   * Validate user belongs to organization
   */
  async validateOrganizationAccess(
    userId: string,
    organizationId: string
  ): Promise<boolean> {
    const context = await this.getUserContext(userId);
    
    if (!context) {
      return false;
    }

    // System admins can access any organization
    if (context.role === 'SYSTEM_ADMIN') {
      return true;
    }

    return context.organizationId === organizationId;
  },

  /**
   * Validate user can access team
   */
  async validateTeamAccess(userId: string, teamId: string): Promise<boolean> {
    const context = await this.getUserContext(userId);
    
    if (!context) {
      return false;
    }

    const team = await client.models.Team.get({ id: teamId });
    
    if (!team.data) {
      return false;
    }

    // System admins can access any team
    if (context.role === 'SYSTEM_ADMIN') {
      return true;
    }

    // Check if team belongs to user's organization
    return team.data.organizationId === context.organizationId;
  },

  /**
   * Validate user can access another user's data
   */
  async validateUserAccess(
    requestingUserId: string,
    targetUserId: string
  ): Promise<boolean> {
    const requestingContext = await this.getUserContext(requestingUserId);
    const targetUser = await client.models.User.get({ id: targetUserId });
    
    if (!requestingContext || !targetUser.data) {
      return false;
    }

    // System admins can access any user
    if (requestingContext.role === 'SYSTEM_ADMIN') {
      return true;
    }

    // Users can access other users in their organization
    return requestingContext.organizationId === targetUser.data.organizationId;
  },

  /**
   * Filter query by organization
   */
  addOrganizationFilter(
    filter: any,
    organizationId: string,
    bypassForSystemAdmin: boolean = false
  ): any {
    // System admins can bypass organization filter if specified
    if (bypassForSystemAdmin) {
      return filter;
    }

    return {
      ...filter,
      organizationId: { eq: organizationId },
    };
  },

  /**
   * Validate role hierarchy
   */
  canManageRole(
    managerRole: string,
    targetRole: string
  ): boolean {
    const roleHierarchy = ['USER', 'TEAM_ADMIN', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
    const managerIndex = roleHierarchy.indexOf(managerRole);
    const targetIndex = roleHierarchy.indexOf(targetRole);
    
    // Can only manage roles below your own
    return managerIndex > targetIndex;
  },

  /**
   * Check if user is org admin for organization
   */
  async isOrgAdmin(userId: string, organizationId: string): Promise<boolean> {
    const context = await this.getUserContext(userId);
    
    if (!context) {
      return false;
    }

    return (
      context.organizationId === organizationId &&
      (context.role === 'ORG_ADMIN' || context.role === 'SYSTEM_ADMIN')
    );
  },

  /**
   * Check if user is team admin for team
   */
  async isTeamAdmin(userId: string, teamId: string): Promise<boolean> {
    const context = await this.getUserContext(userId);
    
    if (!context) {
      return false;
    }

    // System and Org admins have team admin privileges
    if (context.role === 'SYSTEM_ADMIN' || context.role === 'ORG_ADMIN') {
      return true;
    }

    const team = await client.models.Team.get({ id: teamId });
    
    if (!team.data) {
      return false;
    }

    // Check if user is in team's admin list
    const teamAdminIds = team.data.teamAdminIds || [];
    return teamAdminIds.includes(userId);
  },

  /**
   * Get accessible organizations for user
   */
  async getAccessibleOrganizations(userId: string): Promise<string[]> {
    const context = await this.getUserContext(userId);
    
    if (!context) {
      return [];
    }

    // System admins can access all organizations
    if (context.role === 'SYSTEM_ADMIN') {
      const orgs = await client.models.Organization.list();
      return orgs.data.map(org => org.id);
    }

    // Other users can only access their own organization
    return [context.organizationId];
  },

  /**
   * Get accessible teams for user
   */
  async getAccessibleTeams(userId: string): Promise<string[]> {
    const context = await this.getUserContext(userId);
    
    if (!context) {
      return [];
    }

    // Get all teams in user's organization
    const teams = await client.models.Team.list({
      filter: { organizationId: { eq: context.organizationId } },
    });

    return teams.data.map(team => team.id);
  },
};
