# Phase 2: Authentication & Quick Setup - Implementation Plan

## Overview
Implement authentication system with SSO support, complete user onboarding flows, and TurboTax-style quick setup for organization admins to improve completion rates.

**Requirements:** Multi-tenant organizations requirements (docs/requirements/multi-tenant-organizations.md)
**Design:** Authentication flow (docs/design/architecture-diagrams.md), Auth mockups (docs/design/auth-login-signup-mockup.md), Quick setup (docs/design/multi-tenant-organizations-design.md)

## Tasks

### 1. Authentication Infrastructure
- [x] 1.1 Set up NextAuth.js with multiple providers
  - Configure NextAuth.js, Google and Facebook providers
  - **Requirements:** 3. Organization Branding (Authentication Configuration)
  - **Design:** Authentication architecture (docs/design/architecture-diagrams.md)
  
- [x] 1.2 Implement Google OAuth integration
  - Configure Google OAuth provider in NextAuth.js
  - **Requirements:** 3. Organization Branding (Google SSO)
  - **Design:** Authentication flow (docs/design/architecture-diagrams.md)
  
- [ ] 1.3 Implement Facebook OAuth integration
  - Configure Facebook OAuth provider in NextAuth.js
  - **Requirements:** 3. Organization Branding (Facebook SSO)
  - **Design:** Authentication flow (docs/design/architecture-diagrams.md)
  
- [ ] 1.4 Implement credentials provider for email/password
  - Add credentials provider for email/password authentication
  - **Requirements:** 3. Organization Branding (Email/Password Auth)
  - **Design:** Authentication flow (docs/design/architecture-diagrams.md)
  
- [ ] 1.5 Implement SSO configuration per organization
  - Enable/disable SSO methods, validate org settings
  - **Requirements:** 3. Organization Branding (SSO Configuration)
  - **Design:** Organization SSO config (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 1.6 Implement session management with organization context
  - Store org context in NextAuth session, validate on each request
  - **Requirements:** 9. Data Isolation
  - **Design:** Session management (docs/design/architecture-diagrams.md)

### 2. Login & Signup UI
- [x] 2.1 Create login page with SSO options
  - Email/password, Google, Facebook buttons
  - **Requirements:** 3. Organization Branding (Authentication Methods)
  - **Mockup:** Login screen (docs/design/auth-login-signup-mockup.md)
  
- [ ] 2.2 Implement disabled SSO method tooltips
  - Show "Disabled by Org Admin" with admin emails
  - **Requirements:** 3. Organization Branding (Disabled methods tooltip)
  - **Mockup:** Login with disabled SSO (docs/design/auth-login-signup-mockup.md)
  
- [x] 2.3 Create account type selection page
  - Choose between User or Organization Admin
  - **Requirements:** 4. User Invitation & Onboarding (Signup Flow)
  - **Mockup:** Account type selection (docs/design/auth-login-signup-mockup.md)
  
- [x] 2.4 Create standard user signup form
  - Email, display name, password fields
  - **Requirements:** 5. User Profile Requirements
  - **Mockup:** Standard user signup (docs/design/auth-login-signup-mockup.md)
  
- [ ] 2.5 Create organization admin signup with quick setup
  - Step 1: Account creation, Step 2: TurboTax-style questions, Step 3: Welcome
  - **Requirements:** 1. Organization Structure, 13. Quick Setup & Progressive Configuration
  - **Mockup:** Org admin signup steps (docs/design/auth-login-signup-mockup.md)
  - **Design:** TurboTax-style quick setup (docs/ideas/turbotax-admin-setup.md)

### 3. Invitation System
- [x] 3.1 Implement email-based invitation detection
  - Check for pending invitations on signup by email
  - **Requirements:** 4. User Invitation & Onboarding (With Invitation)
  - **Design:** Invitation system (docs/design/multi-tenant-organizations-design.md)
  
- [x] 3.2 Display invitation info during signup
  - Show organization and teams user will join
  - **Requirements:** 4. User Invitation & Onboarding (With Invitation)
  - **Mockup:** Signup with invitation (docs/design/auth-login-signup-mockup.md)
  
- [x] 3.3 Implement invitation acceptance flow
  - Create account, assign teams, consume license, mark accepted
  - **Requirements:** 4. User Invitation & Onboarding (With Invitation)
  - **Design:** Invitation processing (docs/design/architecture-diagrams.md)
  
- [x] 3.4 Implement SSO signup with display name requirement
  - Pre-fill from SSO provider, allow editing
  - **Requirements:** 4. User Invitation & Onboarding (SSO Requirements)
  - **Mockup:** SSO signup (docs/design/auth-login-signup-mockup.md)

### 4. TurboTax-Style Quick Setup
- [ ] 4.1 Implement organization type question
  - Question 1: "What kind of organization are you?" (Ad Tech, Software Engineering, Advertising)
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Question flow (docs/ideas/turbotax-admin-setup.md)
  
- [ ] 4.2 Implement organization structure question
  - Question 2: "How is your organization structured?" (Departments, Project Teams, One Big Team, Custom)
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Question flow (docs/ideas/turbotax-admin-setup.md)
  
- [ ] 4.3 Implement first action question
  - Question 3: "What would you like to do first?" (Invite team, Add questions, Customize, Start now)
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Question flow (docs/ideas/turbotax-admin-setup.md)
  
- [ ] 4.4 Apply smart defaults based on answers
  - Use OrganizationTemplate to apply branding, auth config, default teams
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Smart defaults implementation (docs/ideas/turbotax-admin-setup.md)
  
- [ ] 4.5 Add "Advanced Setup" option
  - "Need more control?" link to bypass quick setup
  - Should redirect to `/auth/signup/org-admin/advanced` (full organization configuration form)
  - Advanced page should allow manual configuration of all organization settings
  - **Requirements:** 13. Quick Setup & Progressive Configuration (Progressive Configuration)
  - **Note:** Currently shows 404 - needs implementation
  - **Design:** Advanced configuration access (docs/ideas/turbotax-admin-setup.md)

### 5. Welcome Screens
- [x] 5.1 Create welcome screen for users with teams
  - Show teams, quick actions, start quiz button
  - **Requirements:** 4. User Invitation & Onboarding
  - **Mockup:** Welcome with teams (docs/design/auth-login-signup-mockup.md)
  
- [x] 5.2 Create welcome screen for users without teams
  - Helpful message, suggestions, profile completion
  - **Requirements:** 4. User Invitation & Onboarding (Without Invitation)
  - **Mockup:** Welcome no teams (docs/design/auth-login-signup-mockup.md)
  
- [ ] 5.3 Create welcome screen for new org admins
  - Show what was configured automatically, next steps based on "first action" choice
  - **Requirements:** 1. Organization Structure, 13. Quick Setup & Progressive Configuration
  - **Mockup:** Welcome org admin (docs/design/auth-login-signup-mockup.md)
  - **Design:** Welcome screen updates (docs/ideas/turbotax-admin-setup.md)

### 6. Testing & Validation
- [x] 6.1 Write unit tests for authentication service
  - Test email/password, Google SSO
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [x] 6.2 Write unit tests for organization service
  - Test CRUD operations, license management
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [x] 6.3 Existing tests for user and team services
  - Tests already exist from Phase 1
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [x] 6.4 Test authentication flows
  - Auth redirects working, login/signup flows functional
  - **Design:** Authentication flow (docs/design/architecture-diagrams.md)
  
- [x] 6.5 Run `npx next build` to ensure no errors
  - Validate all changes build successfully
  - **Felix Guidelines:** Always validate builds

## Completion Criteria
- [x] NextAuth.js configured with Google OAuth
- [ ] Facebook OAuth provider added to NextAuth.js
- [ ] Credentials provider for email/password authentication
- [ ] Organization-aware authentication (SSO method filtering)
- [ ] Login page complete with SSO options
- [ ] Standard user signup flow complete
- [ ] Organization admin signup with TurboTax-style quick setup complete
- [ ] Smart defaults applied based on organization type and structure
- [ ] Advanced setup option available for power users
- [ ] Invitation detection and acceptance working
- [ ] Welcome screens implemented for all scenarios
- [ ] Setup completion rate improves to 90%+ target
- [ ] Time to first value reduced to <5 minutes
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Build completes without errors

## Dependencies
- Phase 1: Multi-Tenant Foundation (must be complete)
- Phase 1A: Additional Data Models (OrganizationTemplate models required)

## Next Phase
Phase 3: Direct Messaging System
