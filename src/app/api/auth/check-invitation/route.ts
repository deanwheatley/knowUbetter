import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const invitationInfo = await authService.checkInvitation(email);

    return NextResponse.json(invitationInfo);
  } catch (error) {
    console.error('Error checking invitation:', error);
    return NextResponse.json(
      { error: 'Failed to check invitation' },
      { status: 500 }
    );
  }
}
