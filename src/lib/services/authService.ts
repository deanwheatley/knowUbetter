import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { userService } from './userService';
import { organizationService } from './organizationService';

/**
 * Authentication Service
 * Handles user authentication with organization context
 */

export interface AuthSession {
  userId: string;
  email: string;
  organizationId: string;
  role: 'USER' | 'TEAM_ADMIN' | 'ORG_ADMIN' | 'SYSTEM_ADMIN';
  teamIds: string[];
  teamAdminFor: string[];
}

export const authService = {
  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string): Promise<AuthSession> {
    const result = await signIn({
      username: email,
      password,
    });

    if (result.isSignedIn) {
      return await this.getSession();
    }

    throw new Error('Sign in failed');
  },

  /**
   * Sign up new user
   */
  async signUpUser(data: {
    email: string;
    password: string;
    displayName: string;
    organizationId: string;
    invitationId?: string;
  }): Promise<void> {
    // Create Cognito user
    await signUp({
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          preferred_username: data.displayName,
        },
      },
    });

    // Create user record in database
    await userService.create({
      username: data.email,
      email: data.email,
      displayName: data.displayName,
      organizationId: data.organizationId,
      role: 'USER',
      authProvider: 'KNOWUBETTER',
    });
  },

  /**
   * Sign up organization admin
   */
  async signUpOrgAdmin(data: {
    email: string;
    password: string;
    displayName: string;
    organizationName: string;
    firstTeamName: string;
    branding?: {
      logoUrl?: string;
      primaryColor?: string;
      secondaryColor?: string;
    };
  }): Promise<{ userId: string; organizationId: string }> {
    // Create Cognito user
    const cognitoResult = await signUp({
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          preferred_username: data.displayName,
        },
      },
    });

    // Create organization
    const organization = await organizationService.create({
      name: data.organizationName,
      createdBy: cognitoResult.userId || data.email,
      logoUrl: data.branding?.logoUrl,
      primaryColor: data.branding?.primaryColor,
      secondaryColor: data.branding?.secondaryColor,
    });

    // Create user record
    const user = await userService.create({
      username: data.email,
      email: data.email,
      displayName: data.displayName,
      organizationId: organization.id,
      role: 'ORG_ADMIN',
      authProvider: 'KNOWUBETTER',
    });

    // Create first team
    const teamService = (await import('./teamService')).teamService;
    await teamService.create({
      organizationId: organization.id,
      name: data.firstTeamName,
      createdBy: user.id,
    });

    return {
      userId: user.id,
      organizationId: organization.id,
    };
  },

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    await signOut();
  },

  /**
   * Get current session with organization context
   */
  async getSession(): Promise<AuthSession | null> {
    try {
      const cognitoUser = await getCurrentUser();
      const session = await fetchAuthSession();

      if (!cognitoUser || !session.tokens) {
        return null;
      }

      // Get user from database
      const user = await userService.getByEmail(
        cognitoUser.signInDetails?.loginId || cognitoUser.username
      );

      if (!user) {
        return null;
      }

      const userData = user as any;

      return {
        userId: userData.id,
        email: userData.email,
        organizationId: userData.organizationId,
        role: userData.role,
        teamIds: userData.teams?.map((t: any) => t.teamId) || [],
        teamAdminFor: userData.teamAdminFor || [],
      };
    } catch (error) {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await getCurrentUser();
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get organization SSO configuration
   */
  async getOrgSSOConfig(organizationId: string): Promise<{
    knowUbetter: boolean;
    google: boolean;
    facebook: boolean;
    disabledBy?: string[];
  }> {
    const org = await organizationService.getById(organizationId);

    if (!org) {
      return {
        knowUbetter: true,
        google: false,
        facebook: false,
      };
    }

    const orgData = org as any;

    return {
      knowUbetter: orgData.ssoKnowUbetter !== false,
      google: orgData.ssoGoogle === true,
      facebook: orgData.ssoFacebook === true,
      disabledBy: orgData.ssoGoogle === false || orgData.ssoFacebook === false
        ? [orgData.createdBy]
        : undefined,
    };
  },

  /**
   * Check for pending invitation by email
   */
  async checkInvitation(email: string): Promise<{
    hasInvitation: boolean;
    organizationId?: string;
    organizationName?: string;
    teamIds?: string[];
    invitationId?: string;
  }> {
    // This would query the Invitation model
    // For now, returning a placeholder
    return {
      hasInvitation: false,
    };
  },

  /**
   * Accept invitation and create user
   */
  async acceptInvitation(
    invitationId: string,
    userData: {
      email: string;
      password: string;
      displayName: string;
    }
  ): Promise<void> {
    // Get invitation details
    const invitation = await this.checkInvitation(userData.email);

    if (!invitation.hasInvitation || !invitation.organizationId) {
      throw new Error('No valid invitation found');
    }

    // Create user
    await this.signUpUser({
      email: userData.email,
      password: userData.password,
      displayName: userData.displayName,
      organizationId: invitation.organizationId,
      invitationId,
    });

    // Assign to teams
    if (invitation.teamIds) {
      for (const teamId of invitation.teamIds) {
        await userService.addToTeam(userData.email, teamId);
      }
    }

    // Mark invitation as accepted
    // This would update the Invitation model
  },

  /**
   * Sign in with Google OAuth (using AWS Amplify)
   */
  async signInWithGoogle(): Promise<void> {
    const { signInWithRedirect } = await import('aws-amplify/auth');
    await signInWithRedirect({ provider: 'Google' });
  },

  /**
   * Sign in with Facebook OAuth (using AWS Amplify)
   */
  async signInWithFacebook(): Promise<void> {
    const { signInWithRedirect } = await import('aws-amplify/auth');
    await signInWithRedirect({ provider: 'Facebook' });
  },

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<any> {
    try {
      const cognitoUser = await getCurrentUser();
      const session = await fetchAuthSession();

      if (!cognitoUser || !session.tokens) {
        return null;
      }

      // Get user from database
      const user = await userService.getByEmail(
        cognitoUser.signInDetails?.loginId || cognitoUser.username
      );

      return user;
    } catch (error) {
      return null;
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(updates: {
    displayName?: string;
    avatar?: string;
    about?: string;
  }): Promise<void> {
    const cognitoUser = await getCurrentUser();
    
    if (!cognitoUser) {
      throw new Error('Not authenticated');
    }

    const user = await userService.getByEmail(
      cognitoUser.signInDetails?.loginId || cognitoUser.username
    );

    if (!user) {
      throw new Error('User not found');
    }

    const userData = user as any;

    await userService.updateProfile(userData.id, updates);
  },
};
