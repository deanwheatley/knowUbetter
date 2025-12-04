# Phase 2 Remaining Tasks

## High Priority

### Advanced Setup Page
- [ ] Create `/auth/signup/org-admin/advanced` page
  - Full organization configuration form (not quick setup)
  - Manual entry for all settings:
    - Organization name
    - Organization type
    - Logo upload
    - Primary/secondary colors
    - Team creation (add multiple teams)
    - SSO configuration
    - Evaluation period settings
  - Should create organization and redirect to dashboard
  - **Current Status:** Link exists in quick setup but shows 404
  - **Location:** `src/app/auth/signup/org-admin/advanced/page.tsx`
  - **Related:** Phase 2, Task 4.5

### Facebook OAuth Integration
- [ ] Implement Facebook OAuth provider
  - Configure Facebook app credentials
  - Add Facebook provider to NextAuth config
  - Test Facebook sign-in flow
  - **Related:** Phase 2, Task 1.3

### SSO Configuration
- [ ] Implement organization-level SSO settings
  - Enable/disable Google OAuth per organization
  - Enable/disable Facebook OAuth per organization
  - Store disabled-by admin info
  - **Related:** Phase 2, Task 1.5

### Disabled SSO Tooltips
- [ ] Show tooltips for disabled SSO methods
  - Display "Disabled by Organizational Admin: [emails]"
  - Only show enabled methods on login page
  - **Related:** Phase 2, Task 2.2

## Medium Priority

### Session Management
- [ ] Implement organization context in session
  - Store organizationId, role, teamIds in session
  - Validate on each request
  - **Related:** Phase 2, Task 1.6

### Welcome Screen Enhancement
- [ ] Create org admin welcome screen
  - Show organization created successfully
  - Display first steps
  - Link to dashboard
  - **Related:** Phase 2, Task 5.3

## Low Priority

### Email Verification
- [ ] Add email verification for new accounts
  - Send verification email
  - Verify email before full access
  - Resend verification option

### Profile Picture Upload
- [ ] Implement avatar upload during signup
  - Allow image upload
  - Crop/resize functionality
  - Auto-generate fallback avatars

## Completed ✅

- [x] Google OAuth integration
- [x] Credentials provider (email/password)
- [x] Login page with SSO options
- [x] Account type selection
- [x] Standard user signup
- [x] Invitation detection and acceptance
- [x] SSO signup with display name
- [x] TurboTax-style quick setup (3 steps)
- [x] Organization creation with smart defaults
- [x] Team creation based on structure
- [x] OAuth completion flow
- [x] Quick setup completion page

## Notes

- Phase 2 is approximately 85% complete
- Advanced setup is the main missing piece for org admin flow
- SSO configuration and tooltips are nice-to-have features
- Focus on advanced setup first, then SSO features
