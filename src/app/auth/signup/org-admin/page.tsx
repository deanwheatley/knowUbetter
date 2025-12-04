'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authService } from '@/lib/services/authService';

type Step = 1 | 2 | 3;

export default function OrgAdminSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Account Creation
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Organization Setup
  const [organizationName, setOrganizationName] = useState('');
  const [firstTeamName, setFirstTeamName] = useState('');
  const [organizationSize, setOrganizationSize] = useState('');

  // Step 3: Branding (Optional)
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6c8cff');
  const [secondaryColor, setSecondaryColor] = useState('#9aaeff');

  const handleStep1Submit = (e: React.FormEvent) => {
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

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!organizationName.trim()) {
      setError('Organization name is required');
      return;
    }

    if (!firstTeamName.trim()) {
      setError('First team name is required');
      return;
    }

    setStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signUpOrgAdmin({
        email,
        password,
        displayName,
        organizationName,
        firstTeamName,
        branding: {
          logoUrl: logoUrl || undefined,
          primaryColor,
          secondaryColor,
        },
      });

      router.push('/auth/welcome?type=orgAdmin');
    } catch (err: any) {
      setError(err.message || 'Failed to create organization');
      setLoading(false);
    }
  };

  const handleSkipBranding = () => {
    handleStep3Submit(new Event('submit') as any);
  };

  return (
    <main className="min-h-svh flex items-center justify-center bg-(--surface,#0b0f14) text-(--ink,#e6edf3) px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s === step
                      ? 'bg-(--brand,#6c8cff) text-white'
                      : s < step
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-(--muted,#93a1b3)'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      s < step ? 'bg-green-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-4">
            <span className="text-sm font-medium text-(--muted,#93a1b3)">Account</span>
            <span className="text-sm font-medium text-(--muted,#93a1b3)">Organization</span>
            <span className="text-sm font-medium text-(--muted,#93a1b3)">Branding</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-(--panel,#11161d) shadow-2xl">
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
                <h2 className="text-2xl font-semibold leading-tight">
                  {step === 1 && 'Create Your Account'}
                  {step === 2 && 'Set Up Organization'}
                  {step === 3 && 'Customize Branding'}
                </h2>
                <p className="text-xs text-(--muted,#93a1b3) -mt-0.5">
                  {step === 1 && 'Personal information'}
                  {step === 2 && 'Organization details'}
                  {step === 3 && 'Optional customization'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 text-sm text-red-300 bg-red-950/30 border border-red-900/50 rounded-md p-3">
                {error}
              </div>
            )}

            {/* Step 1: Account Creation */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                    placeholder="you@company.com"
                  />
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
                  className="w-full rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 text-white"
                >
                  Continue
                </button>
              </form>
            )}

            {/* Step 2: Organization Setup */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm" htmlFor="organizationName">
                    Organization Name
                  </label>
                  <input
                    id="organizationName"
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                    placeholder="Acme Corporation"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm" htmlFor="firstTeamName">
                    First Team Name
                  </label>
                  <input
                    id="firstTeamName"
                    type="text"
                    value={firstTeamName}
                    onChange={(e) => setFirstTeamName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                    placeholder="Engineering"
                  />
                  <p className="text-xs text-(--muted,#93a1b3)">You can add more teams later</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm" htmlFor="organizationSize">
                    Organization Size (Optional)
                  </label>
                  <select
                    id="organizationSize"
                    value={organizationSize}
                    onChange={(e) => setOrganizationSize(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white"
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-lg px-4 py-2.5 font-medium bg-white/10 hover:bg-white/20 text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 text-white"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Branding (Optional) */}
            {step === 3 && (
              <form onSubmit={handleStep3Submit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm" htmlFor="logoUrl">
                    Logo URL (Optional)
                  </label>
                  <input
                    id="logoUrl"
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white placeholder:text-white/60"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm" htmlFor="primaryColor">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-10 border border-white/10 rounded-lg cursor-pointer bg-black/30"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm" htmlFor="secondaryColor">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="secondaryColor"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-16 h-10 border border-white/10 rounded-lg cursor-pointer bg-black/30"
                      />
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-(--brand,#6c8cff) text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-sm text-purple-300">
                    💡 <strong>Tip:</strong> You can configure SSO and other settings from your admin dashboard after signup.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={loading}
                    className="flex-1 rounded-lg px-4 py-2.5 font-medium bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipBranding}
                    disabled={loading}
                    className="flex-1 rounded-lg px-4 py-2.5 font-medium bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg px-4 py-2.5 font-medium bg-(--brand,#6c8cff) hover:opacity-90 disabled:opacity-60 text-white"
                  >
                    {loading ? 'Creating...' : 'Complete'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-(--muted,#93a1b3)">
            Already have an account?{' '}
            <a href="/auth/login" className="text-(--brand,#6c8cff) hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
