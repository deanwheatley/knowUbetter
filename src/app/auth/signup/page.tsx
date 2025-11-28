'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !username || !password) {
      return setError('All fields are required');
    }
    if (password.length < 8) {
      return setError('Password must be at least 8 characters');
    }
    if (password !== confirm) {
      return setError('Passwords do not match');
    }

    setBusy(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Sign up failed');
      }

      router.push('/auth/signin');
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
              <h2 className="text-2xl font-semibold leading-tight">Create your account</h2>
              <p className="text-xs text-(--muted,#93a1b3) -mt-0.5">Join the quiz game</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-md p-3">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm" htmlFor="confirm">
                Confirm password
              </label>
              <input
                id="confirm"
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 disabled:opacity-60 text-white"
            >
              {busy ? 'Creating…' : 'Create account'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 text-sm text-center text-(--muted,#93a1b3)">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-(--brand,#6c8cff) hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </main>
  );
}
