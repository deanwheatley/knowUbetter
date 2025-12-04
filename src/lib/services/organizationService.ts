import { generateClient } from 'aws-amplify/data';
import type { Organization } from '@/types';

// Type assertion for Amplify client with Organization model
// The Organization model exists in the deployed schema but types haven't been regenerated yet
const client = generateClient<any>() as any;

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
    if (updates.kudosPerQuestion !== undefined) updateData.kudosPerQuestion = updates.kudosPerQuestion;
    if (updates.weeklyQuestionLimit !== undefined) updateData.weeklyQuestionLimit = updates.weeklyQuestionLimit;
    if (updates.invitationExpirationDays !== undefined) updateData.invitationExpirationDays = updates.invitationExpirationDays;

    const result = await client.models.Organization.update(updateData as any);

    if (!result.data) {
      throw new Error('Failed to update organization');
    }

    return result.data;
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
  async list(): Promise<any[]> {
    const result = await client.models.Organization.list({});
    
    return result.data;
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
    } as any);

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
    } as any);
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

    await client.models.Organization.update(updateData as any);
  },

};
