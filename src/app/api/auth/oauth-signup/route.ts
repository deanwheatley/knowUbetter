import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { invitationService } from '@/lib/services/invitationService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, displayName, provider, invitationId } = body;

    if (!email || !displayName) {
      return NextResponse.json(
        { error: 'Email and display name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userService.getByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    let organizationId: string;
    let role: 'USER' | 'ORG_ADMIN' = 'USER';

    if (invitationId) {
      // User has invitation - get organization from invitation
      const invitation = await invitationService.getById(invitationId);
      if (!invitation) {
        return NextResponse.json(
          { error: 'Invitation not found' },
          { status: 404 }
        );
      }
      organizationId = (invitation as any).organizationId;
    } else {
      // No invitation - create account without organization
      // User will need to wait for invitation or request to join teams
      // For now, we'll create a placeholder organization or handle this differently
      return NextResponse.json(
        { error: 'Account creation without invitation not yet implemented' },
        { status: 400 }
      );
    }

    // Create user record
    const user = await userService.create({
      username: email,
      email,
      displayName,
      organizationId,
      role,
      authProvider: provider.toUpperCase(),
    });

    // If invitation exists, accept it
    if (invitationId) {
      await invitationService.accept(invitationId, user.id);
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Error creating OAuth user:', error);
    return NextResponse.json(
      { error: 'Failed to create user account' },
      { status: 500 }
    );
  }
}
