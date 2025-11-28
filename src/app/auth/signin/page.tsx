'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Sign in failed');
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-svh flex items-center justify-center bg-(--surface,#0b0f14) text-(--ink,#e6edf3)">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-(--panel,#11161d) shadow-2xl animate-slide-up">
        {/* Brand header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#6c8cff] to-[#9aaeff] flex items-center justify-center text-2xl font-bold text-white">
              K
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-tight">knowUbetter</h2>
              <p className="text-xs text-(--muted,#93a1b3) -mt-0.5">Welcome back</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="text-sm text-red-300 bg-red-950/30 border border-red-900/50 rounded-md p-3">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm" htmlFor="identifier">
                Email or username
              </label>
              <input
                id="identifier"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 disabled:opacity-60 text-white"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer */}
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
