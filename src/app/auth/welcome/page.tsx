'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/services/authService';

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const welcomeType = searchParams.get('type'); // 'user', 'orgAdmin', 'noTeams'

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const sessionData = await authService.getSession();
      setSession(sessionData);
    } catch (error) {
      console.error('Error loading session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Welcome for Organization Admin
  if (welcomeType === 'orgAdmin' || session?.role === 'ORG_ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Welcome to knowUbetter!</h1>
            <p className="text-xl text-gray-600">Your organization is all set up</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">✨ What's Next?</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span><strong>Invite team members</strong> - Add your colleagues to start building your teams</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span><strong>Create custom questions</strong> - Add organization-specific quiz questions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span><strong>Configure settings</strong> - Customize kudos, limits, and SSO options</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span><strong>Set up branding</strong> - Upload your logo and customize colors (if you skipped this)</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">FREE</div>
                <div className="text-sm text-blue-700">Unlimited Licenses</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-green-700">Team Created</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Welcome for User with Teams
  if (session?.teamIds && session.teamIds.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Team!</h1>
            <p className="text-xl text-gray-600">You're all set to start quizzing</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🚀 Quick Start</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Take a quiz</strong> - Start earning kudos and climbing the leaderboard</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Give props</strong> - Recognize your teammates' achievements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Complete your profile</strong> - Add an avatar and about section</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90">Your Teams</div>
                  <div className="text-2xl font-bold">{session?.teamIds?.length || 0}</div>
                </div>
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Your First Quiz
          </button>
        </div>
      </div>
    );
  }

  // Welcome for User without Teams
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to knowUbetter!</h1>
          <p className="text-xl text-gray-600">You're almost ready to start</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">📋 Next Steps</h3>
            <p className="text-sm text-yellow-700 mb-3">
              You're not assigned to any teams yet. Here's what you can do:
            </p>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span><strong>Wait for an invitation</strong> - Your admin will add you to a team</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span><strong>Request to join</strong> - Browse teams and request to join</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span><strong>Complete your profile</strong> - Add your avatar and about section</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              💡 <strong>Tip:</strong> Contact your organization admin to be added to a team, or explore available teams from your dashboard.
            </p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
