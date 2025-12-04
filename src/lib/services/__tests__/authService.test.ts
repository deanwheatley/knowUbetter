import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';

// Mock AWS Amplify auth functions
vi.mock('aws-amplify/auth', () => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  getCurrentUser: vi.fn(),
  fetchAuthSession: vi.fn(),
}));

// Mock services
vi.mock('../userService', () => ({
  userService: {
    create: vi.fn(),
    getByEmail: vi.fn(),
    addToTeam: vi.fn(),
  },
}));

vi.mock('../organizationService', () => ({
  organizationService: {
    create: vi.fn(),
    getById: vi.fn(),
  },
}));

vi.mock('../teamService', () => ({
  teamService: {
    create: vi.fn(),
  },
}));

vi.mock('../invitationService', () => ({
  invitationService: {
    getById: vi.fn(),
    accept: vi.fn(),
    listByOrganization: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInWithEmail', () => {
    it('should sign in user with email and password', async () => {
      const { signIn, getCurrentUser, fetchAuthSession } = await import('aws-amplify/auth');
      const { userService } = await import('../userService');

      vi.mocked(signIn).mockResolvedValue({
        isSignedIn: true,
        nextStep: { signInStep: 'DONE' },
      } as any);

      // Mock getCurrentUser for getSession call
      vi.mocked(getCurrentUser).mockResolvedValue({
        username: 'test@example.com',
        userId: 'cognito-user-1',
        signInDetails: {
          loginId: 'test@example.com',
        },
      } as any);

      // Mock fetchAuthSession for getSession call
      vi.mocked(fetchAuthSession).mockResolvedValue({
        tokens: {
          accessToken: { toString: () => 'token' },
        },
      } as any);

      vi.mocked(userService.getByEmail).mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        organizationId: 'org-1',
        role: 'USER',
        teams: [],
        teamAdminFor: [],
      } as any);

      const session = await authService.signInWithEmail('test@example.com', 'password123');

      expect(signIn).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
      });
      expect(session).toEqual({
        userId: 'user-1',
        email: 'test@example.com',
        organizationId: 'org-1',
        role: 'USER',
        teamIds: [],
        teamAdminFor: [],
      });
    });

    it('should throw error if sign in fails', async () => {
      const { signIn } = await import('aws-amplify/auth');

      vi.mocked(signIn).mockResolvedValue({
        isSignedIn: false,
        nextStep: { signInStep: 'CONFIRM_SIGN_IN' },
      } as any);

      await expect(
        authService.signInWithEmail('test@example.com', 'wrong-password')
      ).rejects.toThrow('Sign in failed');
    });
  });

  describe('signUpUser', () => {
    it('should create new user account', async () => {
      const { signUp } = await import('aws-amplify/auth');
      const { userService } = await import('../userService');

      vi.mocked(signUp).mockResolvedValue({
        isSignUpComplete: true,
        userId: 'cognito-user-1',
        nextStep: { signUpStep: 'DONE' },
      } as any);

      vi.mocked(userService.create).mockResolvedValue({
        id: 'user-1',
        email: 'newuser@example.com',
      } as any);

      await authService.signUpUser({
        email: 'newuser@example.com',
        password: 'password123',
        displayName: 'New User',
        organizationId: 'org-1',
      });

      expect(signUp).toHaveBeenCalledWith({
        username: 'newuser@example.com',
        password: 'password123',
        options: {
          userAttributes: {
            email: 'newuser@example.com',
            preferred_username: 'New User',
          },
        },
      });

      expect(userService.create).toHaveBeenCalledWith({
        username: 'newuser@example.com',
        email: 'newuser@example.com',
        displayName: 'New User',
        organizationId: 'org-1',
        role: 'USER',
        authProvider: 'KNOWUBETTER',
      });
    });
  });

  describe('signUpOrgAdmin', () => {
    it('should create organization and admin user', async () => {
      const { signUp } = await import('aws-amplify/auth');
      const { userService } = await import('../userService');
      const { organizationService } = await import('../organizationService');
      const { teamService } = await import('../teamService');

      vi.mocked(signUp).mockResolvedValue({
        isSignUpComplete: true,
        userId: 'cognito-admin-1',
        nextStep: { signUpStep: 'DONE' },
      } as any);

      vi.mocked(organizationService.create).mockResolvedValue({
        id: 'org-1',
        name: 'Test Org',
      } as any);

      vi.mocked(userService.create).mockResolvedValue({
        id: 'admin-1',
        email: 'admin@example.com',
      } as any);

      vi.mocked(teamService.create).mockResolvedValue({
        id: 'team-1',
        name: 'Engineering',
      } as any);

      const result = await authService.signUpOrgAdmin({
        email: 'admin@example.com',
        password: 'password123',
        displayName: 'Admin User',
        organizationName: 'Test Org',
        firstTeamName: 'Engineering',
        branding: {
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
        },
      });

      expect(organizationService.create).toHaveBeenCalledWith({
        name: 'Test Org',
        createdBy: expect.any(String),
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        logoUrl: undefined,
      });

      expect(userService.create).toHaveBeenCalledWith({
        username: 'admin@example.com',
        email: 'admin@example.com',
        displayName: 'Admin User',
        organizationId: 'org-1',
        role: 'ORG_ADMIN',
        authProvider: 'KNOWUBETTER',
      });

      expect(teamService.create).toHaveBeenCalledWith({
        organizationId: 'org-1',
        name: 'Engineering',
        createdBy: 'admin-1',
      });

      expect(result).toEqual({
        userId: 'admin-1',
        organizationId: 'org-1',
      });
    });
  });

  describe('getSession', () => {
    it('should return session with organization context', async () => {
      const { getCurrentUser, fetchAuthSession } = await import('aws-amplify/auth');
      const { userService } = await import('../userService');

      vi.mocked(getCurrentUser).mockResolvedValue({
        username: 'test@example.com',
        userId: 'cognito-1',
        signInDetails: { loginId: 'test@example.com' },
      } as any);

      vi.mocked(fetchAuthSession).mockResolvedValue({
        tokens: { accessToken: 'token' },
      } as any);

      vi.mocked(userService.getByEmail).mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        organizationId: 'org-1',
        role: 'TEAM_ADMIN',
        teams: [{ teamId: 'team-1' }, { teamId: 'team-2' }],
        teamAdminFor: ['team-1'],
      } as any);

      const session = await authService.getSession();

      expect(session).toEqual({
        userId: 'user-1',
        email: 'test@example.com',
        organizationId: 'org-1',
        role: 'TEAM_ADMIN',
        teamIds: ['team-1', 'team-2'],
        teamAdminFor: ['team-1'],
      });
    });

    it('should return null if not authenticated', async () => {
      const { getCurrentUser } = await import('aws-amplify/auth');

      vi.mocked(getCurrentUser).mockRejectedValue(new Error('Not authenticated'));

      const session = await authService.getSession();

      expect(session).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if user is authenticated', async () => {
      const { getCurrentUser } = await import('aws-amplify/auth');

      vi.mocked(getCurrentUser).mockResolvedValue({
        username: 'test@example.com',
      } as any);

      const result = await authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false if user is not authenticated', async () => {
      const { getCurrentUser } = await import('aws-amplify/auth');

      vi.mocked(getCurrentUser).mockRejectedValue(new Error('Not authenticated'));

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('getOrgSSOConfig', () => {
    it('should return SSO configuration for organization', async () => {
      const { organizationService } = await import('../organizationService');

      vi.mocked(organizationService.getById).mockResolvedValue({
        id: 'org-1',
        ssoKnowUbetter: true,
        ssoGoogle: true,
        createdBy: 'admin-1',
      } as any);

      const config = await authService.getOrgSSOConfig('org-1');

      expect(config).toEqual({
        knowUbetter: true,
        google: true,
        disabledBy: undefined,
      });
    });

    it('should return disabled info when Google SSO is disabled', async () => {
      const { organizationService } = await import('../organizationService');

      vi.mocked(organizationService.getById).mockResolvedValue({
        id: 'org-1',
        ssoKnowUbetter: true,
        ssoGoogle: false,
        createdBy: 'admin-1',
      } as any);

      const config = await authService.getOrgSSOConfig('org-1');

      expect(config).toEqual({
        knowUbetter: true,
        google: false,
        disabledBy: ['admin-1'],
      });
    });
  });
});
