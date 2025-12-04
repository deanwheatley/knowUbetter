'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function OAuthCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [accountType, setAccountType] = useState<'user' | 'org-admin' | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasInvitation, setHasInvitation] = useState(false);
  const [invitationInfo, setInvitationInfo] = useState<any>(null);

  useEffect(() => {
    // Get OAuth info from session storage
    const oauthEmail = sessionStorage.getItem('oauthEmail');
    const oauthName = sessionStorage.getItem('oauthName');
    
    if (!oauthEmail) {
      router.push('/auth/login');
      return;
    }

    setDisplayName(oauthName || '');

    // Check for pending invitation
    checkInvitation(oauthEmail);
  }, [router]);

  const checkInvitation = async (email: string) => {
    try {
      const response = await fetch(`/api/auth/check-invitation?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.hasInvitation) {
        setHasInvitation(true);
        setInvitationInfo(data);
        setAccountType('user'); // Default to user if invited
      }
    } catch (error) {
      console.error('Error checking invitation:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountType) {
      setError('Please select an account type');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const oauthEmail = sessionStorage.getItem('oauthEmail');
      const oauthProvider = sessionStorage.getItem('oauthProvider');

      if (accountType === 'org-admin') {
        // Redirect to org admin quick setup
        sessionStorage.setItem('signupDisplayName', displayName);
        router.push('/auth/signup/org-admin/quick-setup');
      } else {
        // Create user account
        const response = await fetch('/api/auth/oauth-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: oauthEmail,
            displayName,
            provider: oauthProvider,
            invitationId: invitationInfo?.invitationId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create account');
        }

        // Clear session storage
        sessionStorage.removeItem('oauthEmail');
        sessionStorage.removeItem('oauthName');
        sessionStorage.removeItem('oauthProvider');

        // Redirect based on invitation status
        if (hasInvitation) {
          router.push('/auth/welcome');
        } else {
          router.push('/auth/welcome?noTeam=true');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to complete signup');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-svh flex items-center justify-center bg-(--surface,#0b0f14) text-(--ink,#e6edf3)">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-(--panel,#11161d) shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="knowUbetter" 
              width={40} 
              height={40} 
              className="w-10 h-10 rounded-md ring-1 ring-white/10"
            />
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Complete Your Account</h2>
              <p className="text-xs text-(--muted,#93a1b3) -mt-0.5">
                Just one more step
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="text-sm text-red-300 bg-red-950/30 border border-red-900/50 rounded-md p-3">
              {error}
            </div>
          )}

          {hasInvitation && (
            <div className="text-sm text-blue-300 bg-blue-950/30 border border-blue-900/50 rounded-md p-3">
              <p className="font-medium">You've been invited!</p>
              <p className="text-xs mt-1">
                {invitationInfo.organizationName} has invited you to join their team.
              </p>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm" htmlFor="displayName">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How should we call you?"
              required
            />
          </div>

          {!hasInvitation && (
            <div className="space-y-3">
              <label className="block text-sm">Account Type</label>
              
              <button
                type="button"
                onClick={() => setAccountType('user')}
                className={`w-full text-left rounded-lg border p-4 transition-all ${
                  accountType === 'user'
                    ? 'border-(--brand,#6c8cff) bg-(--brand,#6c8cff)/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-medium">Standard User</div>
                <div className="text-xs text-(--muted,#93a1b3) mt-1">
                  Join an existing organization
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('org-admin')}
                className={`w-full text-left rounded-lg border p-4 transition-all ${
                  accountType === 'org-admin'
                    ? 'border-(--brand,#6c8cff) bg-(--brand,#6c8cff)/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-medium">Organization Admin</div>
                <div className="text-xs text-(--muted,#93a1b3) mt-1">
                  Create and manage your own organization
                </div>
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !accountType}
            className="w-full rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 disabled:opacity-60 text-white"
          >
            {loading ? 'Creating account…' : 'Continue'}
          </button>
        </form>
      </div>
    </main>
  );
}
