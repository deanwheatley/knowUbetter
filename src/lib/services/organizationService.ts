import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import type { Organization } from '@/types';

const client = generateClient<Schema>();

/**
 * Organization Service
 * Handles CRUD operations and business logic for organizations
 */

export const organizationService = {
  /**
   * Create a new organization
   */
  async create(data: {
    name: string;
    createdBy: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
  }): Promise<any> {
    const createData: any = {
      name: data.name,
      createdBy: data.createdBy,
      status: 'ACTIVE',
      totalLicenses: 'unlimited',
      usedLicenses: 0,
      primaryColor: data.primaryColor || '#3B82F6',
      secondaryColor: data.secondaryColor || '#8B5CF6',
      ssoKnowUbetter: true,
      ssoGoogle: true,
      ssoFacebook: true,
      ssoEnterpriseEnabled: false,
      kudosPerQuestion: 10,
      weeklyQuestionLimit: 50,
      invitationExpirationDays: 30,
      teamCount: 0,
      userCount: 1,
      activeUserCount: 1,
    };

    if (data.logoUrl) {
      createData.logoUrl = data.logoUrl;
    }

    const result = await client.models.Organization.create(createData);

    if (!result.data) {
      throw new Error('Failed to create organization');
    }

    return result.data;
  },

  /**
   * Get organization by ID
   */
  async getById(id: string): Promise<any | null> {
    const result = await client.models.Organization.get({ id });
    
    if (!result.data) {
      return null;
    }

    return result.data;
  },

  /**
   * Update organization
   */
  async update(
    id: string,
    updates: Partial<{
      name: string;
      status: 'active' | 'trial' | 'inactive';
      logoUrl: string;
      primaryColor: string;
      secondaryColor: string;
      ssoGoogle: boolean;
      ssoFacebook: boolean;
      kudosPerQuestion: number;
      weeklyQuestionLimit: number;
      invitationExpirationDays: number;
    }>
  ): Promise<any> {
    const updateData: any = { id };

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.status !== undefined) updateData.status = updates.status.toUpperCase();
    if (updates.logoUrl !== undefined) updateData.logoUrl = updates.logoUrl;
    if (updates.primaryColor !== undefined) updateData.primaryColor = updates.primaryColor;
    if (updates.secondaryColor !== undefined) updateData.secondaryColor = updates.secondaryColor;
    if (updates.ssoGoogle !== undefined) updateData.ssoGoogle = updates.ssoGoogle;
    if (updates.ssoFacebook !== undefined) updateData.ssoFacebook = updates.ssoFacebook;
    if (updates.kudosPerQuestion !== undefined) updateData.kudosPerQuestion = updates.kudosPerQuestion;
    if (updates.weeklyQuestionLimit !== undefined) updateData.weeklyQuestionLimit = updates.weeklyQuestionLimit;
    if (updates.invitationExpirationDays !== undefined) updateData.invitationExpirationDays = updates.invitationExpirationDays;

    const result = await client.models.Organization.update(updateData);

    if (!result.data) {
      throw new Error('Failed to update organization');
    }

    return this.mapToOrganization(result.data);
  },

  /**
   * Delete organization
   */
  async delete(id: string): Promise<void> {
    await client.models.Organization.delete({ id });
  },

  /**
   * List all organizations (System Admin only)
   */
  async list(): Promise<Organization[]> {
    const result = await client.models.Organization.list();
    
    return result.data.map(org => this.mapToOrganization(org));
  },

  /**
   * Check available licenses
   */
  async checkAvailableLicenses(organizationId: string): Promise<number | 'unlimited'> {
    const org = await this.getById(organizationId);
    
    if (!org) {
      throw new Error('Organization not found');
    }

    if (org.totalLicenses === 'unlimited') {
      return 'unlimited';
    }

    return org.availableLicenses;
  },

  /**
   * Reserve a license (when inviting a user)
   */
  async reserveLicense(organizationId: string): Promise<boolean> {
    const org = await this.getById(organizationId);
    
    if (!org) {
      throw new Error('Organization not found');
    }

    if (org.totalLicenses === 'unlimited') {
      return true;
    }

    if (org.availableLicenses <= 0) {
      return false;
    }

    await client.models.Organization.update({
      id: organizationId,
      usedLicenses: org.usedLicenses + 1,
    });

    return true;
  },

  /**
   * Release a license (when user is removed or invitation expires)
   */
  async releaseLicense(organizationId: string): Promise<void> {
    const org = await this.getById(organizationId);
    
    if (!org) {
      throw new Error('Organization not found');
    }

    if (org.totalLicenses === 'unlimited') {
      return;
    }

    await client.models.Organization.update({
      id: organizationId,
      usedLicenses: Math.max(0, org.usedLicenses - 1),
    });
  },

  /**
   * Update organization metrics
   */
  async updateMetrics(
    organizationId: string,
    metrics: {
      teamCount?: number;
      userCount?: number;
      activeUserCount?: number;
    }
  ): Promise<void> {
    const updateData: any = { id: organizationId };

    if (metrics.teamCount !== undefined) updateData.teamCount = metrics.teamCount;
    if (metrics.userCount !== undefined) updateData.userCount = metrics.userCount;
    if (metrics.activeUserCount !== undefined) updateData.activeUserCount = metrics.activeUserCount;

    await client.models.Organization.update(updateData);
  },

  /**
   * Map Amplify model to Organization type
   */
  mapToOrganization(data: any): Organization {
    return {
      id: data.id,
      name: data.name,
      createdAt: new Date(data.createdAt),
      createdBy: data.createdBy,
      status: data.status.toLowerCase() as 'active' | 'trial' | 'inactive',
      totalLicenses: data.totalLicenses === 'unlimited' ? 'unlimited' : parseInt(data.totalLicenses),
      usedLicenses: data.usedLicenses,
      availableLicenses: data.totalLicenses === 'unlimited' 
        ? Infinity 
        : parseInt(data.totalLicenses) - data.usedLicenses,
      branding: {
        logoUrl: data.logoUrl,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
      },
      ssoConfig: {
        knowUbetter: data.ssoKnowUbetter,
        google: data.ssoGoogle,
        facebook: data.ssoFacebook,
        enterpriseSSO: data.ssoEnterpriseEnabled ? {
          enabled: data.ssoEnterpriseEnabled,
          provider: data.ssoEnterpriseProvider as 'okta' | 'azure' | 'saml',
          config: data.ssoEnterpriseConfig || {},
        } : undefined,
      },
      settings: {
        kudosPerQuestion: data.kudosPerQuestion,
        weeklyQuestionLimit: data.weeklyQuestionLimit,
        invitationExpirationDays: data.invitationExpirationDays === 0 ? null : data.invitationExpirationDays,
      },
      teamCount: data.teamCount,
      userCount: data.userCount,
      activeUserCount: data.activeUserCount,
    };
  },
};
