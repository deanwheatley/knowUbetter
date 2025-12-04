'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { organizationTemplateService } from '@/lib/services/organizationTemplateService';
import type { OrganizationType, TeamStructure, FirstAction } from '@/types';

export default function QuickSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [organizationType, setOrganizationType] = useState<OrganizationType | null>(null);
  const [teamStructure, setTeamStructure] = useState<TeamStructure | null>(null);
  const [firstAction, setFirstAction] = useState<FirstAction | null>(null);

  // Get data from URL params or session storage (for OAuth flow)
  const email = searchParams.get('email') || 
                sessionStorage.getItem('oauthEmail') || '';
  const displayName = searchParams.get('displayName') || 
                      sessionStorage.getItem('signupDisplayName') || 
                      sessionStorage.getItem('oauthName') || '';
  const orgName = searchParams.get('orgName') || '';

  const handleNext = () => {
    if (step === 1 && organizationType) {
      setStep(2);
    } else if (step === 2 && teamStructure) {
      setStep(3);
    } else if (step === 3 && firstAction) {
      // Complete setup
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!organizationType || !teamStructure || !firstAction) return;

    // Store setup choices in session storage for the signup completion
    sessionStorage.setItem('quickSetup', JSON.stringify({
      organizationType,
      teamStructure,
      firstAction,
      orgName,
      email,
      displayName,
    }));

    // Redirect based on first action
    switch (firstAction) {
      case 'invite':
        router.push(`/auth/signup/org-admin/complete?action=invite`);
        break;
      case 'questions':
        router.push(`/auth/signup/org-admin/complete?action=questions`);
        break;
      case 'customize':
        router.push(`/auth/signup/org-admin/complete?action=customize`);
        break;
      case 'start':
        router.push(`/auth/signup/org-admin/complete?action=start`);
        break;
    }
  };

  const orgTypes = organizationTemplateService.getOrganizationTypes();
  const teamStructures = organizationTemplateService.getTeamStructures();
  const firstActions = organizationTemplateService.getFirstActions();

  return (
    <div className="min-h-screen bg-(--surface,#0b0f14) flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-(--muted,#93a4b8)">
              Step {step} of 3
            </span>
            <span className="text-sm text-(--muted,#93a4b8)">
              About 2 minutes remaining
            </span>
          </div>
          <div className="h-2 bg-(--panel,#11161d) rounded-full overflow-hidden">
            <div
              className="h-full bg-(--brand,#6c8cff) transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-(--panel,#11161d) rounded-2xl p-8 shadow-2xl border border-white/10">
          {/* Step 1: Organization Type */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-semibold text-(--ink,#e6edf3) mb-2">
                What kind of organization are you?
              </h1>
              <p className="text-(--muted,#93a4b8) mb-8">
                We'll customize your experience based on your organization type
              </p>

              <div className="space-y-3">
                {orgTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setOrganizationType(type.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      organizationType === type.value
                        ? 'border-(--brand,#6c8cff) bg-(--brand,#6c8cff)/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{type.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-(--ink,#e6edf3)">
                          {type.label}
                        </div>
                        <div className="text-sm text-(--muted,#93a4b8)">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Team Structure */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl font-semibold text-(--ink,#e6edf3) mb-2">
                How is your organization structured?
              </h1>
              <p className="text-(--muted,#93a4b8) mb-8">
                We'll create teams that match your structure
              </p>

              <div className="space-y-3">
                {teamStructures.map((structure) => (
                  <button
                    key={structure.value}
                    onClick={() => setTeamStructure(structure.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      teamStructure === structure.value
                        ? 'border-(--brand,#6c8cff) bg-(--brand,#6c8cff)/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{structure.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-(--ink,#e6edf3)">
                          {structure.label}
                        </div>
                        <div className="text-sm text-(--muted,#93a4b8)">
                          {structure.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: First Action */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl font-semibold text-(--ink,#e6edf3) mb-2">
                What would you like to do first?
              </h1>
              <p className="text-(--muted,#93a4b8) mb-8">
                Don't worry, you can do all of these later
              </p>

              <div className="space-y-3">
                {firstActions.map((action) => (
                  <button
                    key={action.value}
                    onClick={() => setFirstAction(action.value as FirstAction)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      firstAction === action.value
                        ? 'border-(--brand,#6c8cff) bg-(--brand,#6c8cff)/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{action.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-(--ink,#e6edf3)">
                          {action.label}
                        </div>
                        <div className="text-sm text-(--muted,#93a4b8)">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-lg border border-white/10 hover:border-white/20 text-(--ink,#e6edf3) transition-all"
              >
                Back
              </button>
            )}
            
            <div className="flex-1" />

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !organizationType) ||
                (step === 2 && !teamStructure) ||
                (step === 3 && !firstAction)
              }
              className="px-8 py-2 rounded-lg bg-(--brand,#6c8cff) hover:bg-(--brand-2,#9aaeff) text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? 'Complete Setup' : 'Continue'}
            </button>
          </div>

          {/* Advanced Setup Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/auth/signup/org-admin/advanced')}
              className="text-sm text-(--muted,#93a4b8) hover:text-(--ink,#e6edf3) transition-colors"
            >
              Need more control? Use advanced setup →
            </button>
          </div>

          {/* Reassurance Message */}
          <div className="mt-6 p-4 bg-(--brand,#6c8cff)/10 rounded-lg border border-(--brand,#6c8cff)/20">
            <p className="text-sm text-(--ink,#e6edf3) text-center">
              💡 You can change these settings anytime in your organization settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
