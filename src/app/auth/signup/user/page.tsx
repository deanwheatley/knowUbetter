'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { authService } from '@/lib/services/authService';

export default function UserSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState<any>(null);
  const [checkingInvitation, setCheckingInvitation] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      checkForInvitation(emailParam);
    }
  }, [searchParams]);

  const checkForInvitation = async (emailToCheck: string) => {
    setCheckingInvitation(true);
    try {
      const result = await authService.checkInvitation(emailToCheck);
      if (result.hasInvitation) {
        setInvitation(result);
      }
    } catch (err) {
      console.error('Error checking invitation:', err);
    } finally {
      setCheckingInvitation(false);
    }
  };

  const handleEmailBlur = () => {
    if (email && !invitation) {
      checkForInvitation(email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      if (invitation?.hasInvitation) {
        await authService.acceptInvitation(invitation.invitationId, {
          email,
          password,
          displayName,
        });
      } else {
        setError('You need an invitation to sign up. Please contact your organization admin.');
        setLoading(false);
        return;
      }

      router.push('/auth/welcome');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-svh flex items-center justify-center bg-(--surface,#0b0f14) text-(--ink,#e6edf3) px-4 py-12">
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
              <h2 className="text-2xl font-semibold leading-tight">Create Your Account</h2>
              <p className="text-xs text-(--muted,#93a1b3) -mt-0.5">
                Join your team
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {invitation?.hasInvitation && (
            <div className="p-3 bg-(--brand,#6c8cff)/10 border border-(--brand,#6c8cff)/20 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-(--brand,#6c8cff) mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold mb-1">You've been invited!</p>
                  <p className="text-sm text-(--muted,#93a1b3)">
                    You'll join <span className="font-semibold text-(--ink,#e6edf3)">{invitation.organizationName}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-300 bg-red-950/30 border border-red-900/50 rounded-md p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                required
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                placeholder="you@example.com"
              />
              {checkingInvitation && (
                <p className="text-xs text-(--muted,#93a1b3)">Checking for invitation...</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="displayName">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                placeholder="••••••••"
              />
              <p className="text-xs text-(--muted,#93a1b3)">At least 8 characters</p>
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || checkingInvitation}
              className="w-full rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 disabled:opacity-60 text-white"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <div className="p-6 border-t border-white/10 text-sm text-center text-(--muted,#93a1b3)">
          Already have an account?{' '}
          <a href="/auth/login" className="text-(--brand,#6c8cff) hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </main>
  );
}
