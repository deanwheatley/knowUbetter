import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';
import { organizationTemplateService } from '@/lib/services/organizationTemplateService';
import type { OrganizationType, TeamStructure } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      organizationType,
      teamStructure,
      firstAction,
      orgName,
      email,
      displayName,
      password,
      isOAuth,
      oauthProvider,
    } = body;

    if (!organizationType || !teamStructure || !email || !displayName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If not OAuth, password is required
    if (!isOAuth && !password) {
      return NextResponse.json(
        { error: 'Password is required for email/password signup' },
        { status: 400 }
      );
    }

    // Get template configuration
    const template = organizationTemplateService.getTemplate(
      organizationType as OrganizationType
    );

    // Get team names based on structure
    const teamNames = organizationTemplateService.getTeamNames(
      teamStructure as TeamStructure
    );

    // Determine organization name
    const organizationName = orgName || `${displayName}'s Organization`;

    // Create organization and user
    const result = await authService.signUpOrgAdmin({
      email,
      password: password || `oauth-${Date.now()}`, // Temp password for OAuth users
      displayName,
      organizationName,
      firstTeamName: teamNames[0] || 'General',
      branding: {
        logoUrl: template.branding.logoUrl,
        primaryColor: template.branding.primaryColor,
        secondaryColor: template.branding.secondaryColor,
      },
    });

    // Create additional teams if needed
    if (teamNames.length > 1) {
      const { teamService } = await import('@/lib/services/teamService');
      
      for (let i = 1; i < teamNames.length; i++) {
        await teamService.create({
          organizationId: result.organizationId,
          name: teamNames[i],
          createdBy: result.userId,
        });
      }
    }

    // Update organization with template settings
    const { organizationService } = await import('@/lib/services/organizationService');
    await organizationService.update(result.organizationId, {
      evaluationPeriodDays: template.evaluationPeriodDays,
      maxLicenses: template.maxLicenses,
      ssoGoogle: template.auth.google,
      ssoFacebook: template.auth.facebook,
    });

    return NextResponse.json({
      success: true,
      userId: result.userId,
      organizationId: result.organizationId,
    });
  } catch (error: any) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create organization' },
      { status: 500 }
    );
  }
}
