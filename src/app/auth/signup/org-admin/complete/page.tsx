'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function OrgAdminCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState('');
  const action = searchParams.get('action') || 'start';

  useEffect(() => {
    completeSetup();
  }, []);

  const completeSetup = async () => {
    try {
      // Get quick setup data from session storage
      const quickSetupData = sessionStorage.getItem('quickSetup');
      if (!quickSetupData) {
        throw new Error('Setup data not found');
      }

      const setupData = JSON.parse(quickSetupData);
      
      // Check if this is OAuth signup
      const oauthEmail = sessionStorage.getItem('oauthEmail');
      const oauthProvider = sessionStorage.getItem('oauthProvider');
      const isOAuth = !!oauthEmail;

      // Create organization and user
      const response = await fetch('/api/auth/org-admin-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...setupData,
          isOAuth,
          oauthProvider: oauthProvider || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create organization');
      }

      const result = await response.json();

      // Clear session storage
      sessionStorage.removeItem('quickSetup');
      sessionStorage.removeItem('oauthEmail');
      sessionStorage.removeItem('oauthName');
      sessionStorage.removeItem('oauthProvider');
      sessionStorage.removeItem('signupDisplayName');

      setStatus('success');

      // If not OAuth, sign in with credentials
      if (!isOAuth && setupData.email && setupData.password) {
        await signIn('credentials', {
          email: setupData.email,
          password: setupData.password,
          redirect: false,
        });
      }

      // Redirect based on first action after a short delay
      setTimeout(() => {
        switch (action) {
          case 'invite':
            router.push('/dashboard/teams/invite');
            break;
          case 'questions':
            router.push('/dashboard/questions');
            break;
          case 'customize':
            router.push('/dashboard/settings/organization');
            break;
          case 'start':
          default:
            router.push('/dashboard');
            break;
        }
      }, 1500);
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to complete setup');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-(--surface,#0b0f14) flex items-center justify-center">
      <div className="text-center max-w-md">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-(--brand,#6c8cff) mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-(--ink,#e6edf3) mb-2">
              Creating your organization...
            </h2>
            <p className="text-(--muted,#93a4b8)">
              Setting up your teams and preferences
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-(--ink,#e6edf3) mb-2">
              All set! 🎉
            </h2>
            <p className="text-(--muted,#93a4b8)">
              Taking you to your dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-(--ink,#e6edf3) mb-2">
              Something went wrong
            </h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button
              onClick={() => router.push('/auth/signup/org-admin')}
              className="px-6 py-2 rounded-lg bg-(--brand,#6c8cff) hover:opacity-90 text-white font-medium"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
