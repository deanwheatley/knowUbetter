'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'user' | 'orgAdmin' | null>(null);

  if (!accountType) {
    return (
      <main className="min-h-svh flex items-center justify-center bg-(--surface,#0b0f14) text-(--ink,#e6edf3) px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image 
                src="/logo.png" 
                alt="knowUbetter" 
                width={64} 
                height={64} 
                className="w-16 h-16 rounded-xl ring-2 ring-white/10"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Join knowUbetter</h1>
            <p className="text-xl text-(--muted,#93a1b3)">Choose how you'd like to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Standard User */}
            <button
              onClick={() => setAccountType('user')}
              className="bg-(--panel,#11161d) rounded-2xl border border-white/10 shadow-2xl p-8 hover:border-white/20 transition-all transform hover:-translate-y-1 text-left"
            >
              <div className="w-16 h-16 bg-(--brand,#6c8cff)/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-(--brand,#6c8cff)/30">
                <svg className="w-8 h-8 text-(--brand,#6c8cff)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">I'm a User</h2>
              <p className="text-(--muted,#93a1b3) mb-4">
                Join an existing organization and participate in quizzes with your team.
              </p>
              <ul className="space-y-2 text-sm text-(--muted,#93a1b3)">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Take quizzes and earn kudos
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compete on leaderboards
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Give props to teammates
                </li>
              </ul>
            </button>

            {/* Organization Admin */}
            <button
              onClick={() => setAccountType('orgAdmin')}
              className="bg-(--panel,#11161d) rounded-2xl border-2 border-(--brand,#6c8cff)/50 shadow-2xl p-8 hover:border-(--brand,#6c8cff) transition-all transform hover:-translate-y-1 text-left"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-purple-500/30">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">I'm Creating an Organization</h2>
              <p className="text-(--muted,#93a1b3) mb-4">
                Set up a new organization for your company or team.
              </p>
              <ul className="space-y-2 text-sm text-(--muted,#93a1b3)">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Manage teams and members
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Customize branding and settings
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Create custom questions
                </li>
              </ul>
              <div className="mt-4 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-xs text-purple-300 font-medium">✨ FREE unlimited licenses</p>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-(--muted,#93a1b3)">
              Already have an account?{' '}
              <a href="/auth/login" className="text-(--brand,#6c8cff) hover:underline font-semibold">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Redirect to appropriate signup flow
  if (accountType === 'user') {
    router.push('/auth/signup/user');
  } else {
    router.push('/auth/signup/org-admin');
  }

  return null;
}
