'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    const handleOAuthCallback = async () => {
      if (status === 'authenticated' && session?.user) {
        const user = session.user as any;

        // Check if this is a new OAuth user who needs to complete signup
        if (!user.id || !user.organizationId) {
          // New OAuth user - redirect to OAuth completion page
          // Store OAuth info in session storage for signup flow
          sessionStorage.setItem('oauthEmail', user.email || '');
          sessionStorage.setItem('oauthName', user.name || '');
          sessionStorage.setItem('oauthProvider', 'google');
          
          router.push('/auth/signup/oauth-complete');
          return;
        }

        // Existing user - redirect to dashboard
        router.push('/dashboard');
      } else if (status === 'unauthenticated') {
        // Redirect to login if not authenticated
        router.push('/auth/login');
      }
    };

    handleOAuthCallback();
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-(--surface,#0b0f14) flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--brand,#6c8cff) mx-auto"></div>
        <p className="mt-4 text-(--muted,#93a4b8)">Completing sign in...</p>
      </div>
    </div>
  );
}
