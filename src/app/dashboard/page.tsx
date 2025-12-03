'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService } from '@/lib/services/authService';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      if (!isAuth) {
        router.push('/auth/login');
        return;
      }
      setAuthenticated(true);
    } catch (error) {
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Mock data
  const user = {
    username: 'player1',
    totalKudos: 450,
    propKudos: 150,
    quizKudos: 300,
    rank: 5,
    weeklyQuestionsUsed: 12,
    weeklyQuestionLimit: 20,
    passesUsed: 2,
    passesLimit: 5,
    correctnessRate: 85.5,
    streaks: {
      currentCorrectAnswers: 5,
      currentLoginDays: 7,
    },
    propsRemaining: {
      prop: 4,
      madProp: 2,
      propHellYeah: 1,
    },
  };

  const leaderboard = [
    { rank: 1, username: 'alice', kudos: 2100, badge: '👑' },
    { rank: 2, username: 'bob', kudos: 1890, badge: '🥈' },
    { rank: 3, username: 'carol', kudos: 1750, badge: '🥉' },
    { rank: 4, username: 'dave', kudos: 520, badge: '' },
    { rank: 5, username: 'player1', kudos: 450, badge: '', isYou: true },
  ];

  const notifications = [
    { icon: '🏆', text: 'Alice is now #1 on the leaderboard!', time: '2m ago' },
    { icon: '🔥', text: 'Bob sent mad-prop to Carol: "Great presentation!"', time: '5m ago' },
    { icon: '🎯', text: 'Dave earned "Quiz Master" badge!', time: '12m ago' },
    { icon: '⭐', text: 'New question approved in Lore category', time: '15m ago' },
    { icon: '🚀', text: 'Eve is on a 10-day login streak!', time: '23m ago' },
  ];

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white/90 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6c8cff] to-[#9aaeff] flex items-center justify-center text-2xl font-bold">
              K
            </div>
            <div>
              <h1 className="text-3xl font-bold">knowUbetter</h1>
              <p className="text-sm text-white/60">Welcome back, {user.username}!</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm">
            Sign Out
          </button>
        </div>

        {/* Stats Card */}
        <div className="rounded-2xl border border-white/10 bg-[#11161d] p-6 shadow-2xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Your Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-[#F59E0B]">{user.totalKudos}</div>
              <div className="text-sm text-white/60">Total Kudos ⭐</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-[#8B5CF6]">{user.propKudos}</div>
              <div className="text-sm text-white/60">Prop Kudos 💎</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-[#6c8cff]">#{user.rank}</div>
              <div className="text-sm text-white/60">Rank 🏆</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-[#10B981]">{user.correctnessRate}%</div>
              <div className="text-sm text-white/60">Accuracy 🎯</div>
            </div>
          </div>

          {/* Progress bars */}
          <div className="mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Questions this week</span>
                <span className="text-white/60">{user.weeklyQuestionsUsed}/{user.weeklyQuestionLimit}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6c8cff] to-[#9aaeff]"
                  style={{ width: `${(user.weeklyQuestionsUsed / user.weeklyQuestionLimit) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Passes remaining</span>
                <span className="text-white/60">{user.passesLimit - user.passesUsed}/{user.passesLimit}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399]"
                  style={{ width: `${((user.passesLimit - user.passesUsed) / user.passesLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streaks */}
          <div className="mt-6 flex gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="text-lg font-bold">{user.streaks.currentCorrectAnswers}</div>
                <div className="text-xs text-white/60">Correct Streak</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-2xl">📅</span>
              <div>
                <div className="text-lg font-bold">{user.streaks.currentLoginDays}</div>
                <div className="text-xs text-white/60">Login Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <button className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#6c8cff]/20 to-[#9aaeff]/10 p-6 hover:from-[#6c8cff]/30 hover:to-[#9aaeff]/20 transition-all">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-xl font-semibold mb-1">Take Quiz</div>
            <div className="text-sm text-white/60">Answer questions & earn kudos</div>
          </button>
          
          <button className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-6 hover:from-[#8B5CF6]/30 hover:to-[#A78BFA]/20 transition-all">
            <div className="text-4xl mb-2">🎁</div>
            <div className="text-xl font-semibold mb-1">Send Props</div>
            <div className="text-sm text-white/60">
              {user.propsRemaining.prop} props, {user.propsRemaining.madProp} mad-props left
            </div>
          </button>
          
          <button className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 p-6 hover:from-[#10B981]/30 hover:to-[#34D399]/20 transition-all">
            <div className="text-4xl mb-2">✍️</div>
            <div className="text-xl font-semibold mb-1">Submit Question</div>
            <div className="text-sm text-white/60">Contribute to the quiz pool</div>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Leaderboard Preview */}
          <div className="rounded-2xl border border-white/10 bg-[#11161d] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Leaderboard
              </h2>
              <button className="text-sm text-[#6c8cff] hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    entry.isYou
                      ? 'bg-[#6c8cff]/20 border border-[#6c8cff]/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-white/60 w-6">#{entry.rank}</div>
                    <div>
                      <div className="font-medium">
                        {entry.username} {entry.isYou && <span className="text-xs text-[#6c8cff]">(You)</span>}
                      </div>
                      <div className="text-sm text-white/60">{entry.kudos} kudos</div>
                    </div>
                  </div>
                  {entry.badge && <span className="text-2xl">{entry.badge}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Notification Scroller */}
          <div className="rounded-2xl border border-white/10 bg-[#11161d] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">📢</span>
              Recent Activity
            </h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-2xl flex-shrink-0">{notif.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{notif.text}</div>
                    <div className="text-xs text-white/40 mt-1">{notif.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </main>
  );
}
