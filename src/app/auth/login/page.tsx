'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { authService } from '@/lib/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signInWithEmail(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/auth/callback',
        redirect: true 
      });
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'Google sign in failed');
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
              <h2 className="text-2xl font-semibold leading-tight">knowUbetter</h2>
              <p className="text-xs text-(--muted,#93a1b3) -mt-0.5">
                Welcome back
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
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
                name="email"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60 caret-current"
                type="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60 caret-current"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 disabled:opacity-60 text-white"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-2 my-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-(--muted,#93a1b3)">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full rounded-lg px-4 py-2.5 font-medium bg-black/40 border border-white/10 hover:bg-black/50 flex items-center justify-center gap-2 text-white"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.39a4.61 4.61 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.97-4.33 2.97-7.33Z" />
              <path fill="currentColor" d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.24-2.5c-.9.6-2.06.95-3.37.95-2.6 0-4.8-1.76-5.59-4.13H3.02v2.59A10 10 0 0 0 12 22Z" opacity=".7" />
              <path fill="currentColor" d="M6.41 13.88A5.99 5.99 0 0 1 6.08 12c0-.65.11-1.28.32-1.88V7.53H3.02A10 10 0 0 0 2 12c0 1.6.38 3.12 1.02 4.47l3.39-2.59Z" opacity=".5" />
              <path fill="currentColor" d="M12 6.04c1.46 0 2.78.5 3.8 1.48l2.85-2.85A9.97 9.97 0 0 0 12 2 10 10 0 0 0 3.02 7.53l3.39 2.59C7.2 7.76 9.4 6.04 12 6.04Z" opacity=".35" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="p-6 border-t border-white/10 text-sm text-center text-(--muted,#93a1b3)">
          New to knowUbetter?{' '}
          <a href="/auth/signup" className="text-(--brand,#6c8cff) hover:underline">
            Create an account
          </a>
        </div>
      </div>
    </main>
  );
}
