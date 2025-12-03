# Phase 3: Invitation & Team Management - Implementation Plan

## Overview
Implement smart invitation processing, team management for Org Admins and Team Admins, and team join request functionality.

**Requirements:** Multi-tenant organizations requirements (docs/requirements/multi-tenant-organizations.md)
**Design:** Invitation processing flow (docs/design/architecture-diagrams.md)

## Tasks

### 1. Smart Invitation Processing
- [x] 1.1 Implement invitation service with email checking
  - Check if user exists, determine action (invite/assign/error)
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Processing)
  - **Design:** Invitation processing flow (docs/design/architecture-diagrams.md)
  
- [x] 1.2 Implement immediate team assignment for existing users
  - Add existing users to teams, send in-app notification
  - **Requirements:** 4. User Invitation & Onboarding (Existing User Team Assignment)
  - **Design:** Smart invitation processing (docs/design/multi-tenant-organizations-design.md)
  
- [x] 1.3 Implement invitation email sending for new users
  - Send email with unique link, reserve license
  - **Requirements:** 4. User Invitation & Onboarding (With Invitation)
  - **Design:** Invitation processing flow (docs/design/architecture-diagrams.md)
  
- [x] 1.4 Implement cross-organization validation
  - Detect users in different orgs, return error
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Processing)
  - **Design:** Data isolation (docs/design/multi-tenant-organizations-design.md)
  
- [x] 1.5 Create invitation results summary
  - Categorize results: teams assigned, invitations sent, errors
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Processing)
  - **Mockup:** Invitation results summary (docs/design/org-admin-dashboard-mockup.md)

### 2. Invitation Management UI
- [ ] 2.1 Create invite users page
  - Bulk email input, team selection, optional message
  - **Requirements:** 4. User Invitation & Onboarding
  - **Mockup:** Invite users (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 2.2 Create invitation results summary page
  - Display three sections with results
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Processing)
  - **Mockup:** Invitation results summary (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 2.3 Create invitations management page
  - Show pending, accepted, expired invitations
  - **Requirements:** 4. User Invitation & Onboarding
  - **Mockup:** Invitations management (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 2.4 Implement invitation actions
  - Resend, cancel/rescind invitations
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Expiration)
  - **Mockup:** Invitations management (docs/design/org-admin-dashboard-mockup.md)

### 3. Invitation Expiration
- [x] 3.1 Implement configurable expiration settings
  - Org-level setting: 7, 14, 30, 60, 90 days, or never
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Expiration)
  - **Design:** Invitation expiration (docs/design/multi-tenant-organizations-design.md)
  
- [x] 3.2 Implement expiration checking and license release
  - Cron job to check expired invitations, release licenses
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Expiration)
  - **Design:** Invitation expiration (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 3.3 Create invitation settings UI
  - Configure expiration, default message
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Expiration)
  - **Mockup:** Invitation settings (docs/design/org-admin-dashboard-mockup.md)

### 4. Team Management (Org Admin)
- [ ] 4.1 Create teams management page
  - List all teams with stats, search, create team
  - **Requirements:** 6. Team Management
  - **Mockup:** Teams management (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 4.2 Create team creation modal
  - Name, picture upload, color, description, assign admins
  - **Requirements:** 6. Team Management (Team Creation)
  - **Mockup:** Create team modal (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 4.3 Create team detail/management page
  - View/edit team, manage admins, manage members
  - **Requirements:** 6. Team Management
  - **Mockup:** Team detail (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 4.4 Implement team picture upload to S3
  - Upload picture, generate auto-icon fallback
  - **Requirements:** 6. Team Management (Team Branding)
  - **Design:** Team branding (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 4.5 Implement multiple team admin assignment
  - Add/remove team admins (multiple per team)
  - **Requirements:** 6. Team Management (Multiple Team Admins)
  - **Design:** Team admin management (docs/design/multi-tenant-organizations-design.md)

### 5. Team Management (Team Admin)
- [ ] 5.1 Create team admin dashboard
  - Show teams they admin, quick actions, overview
  - **Requirements:** 6. Team Management (Team Admin)
  - **Mockup:** Team admin dashboard (docs/design/user-dashboard-mockup.md)
  
- [ ] 5.2 Create team management page with team switcher
  - Dropdown to switch between assigned teams
  - **Requirements:** 6. Team Management (Team Admin)
  - **Mockup:** Team admin manage team (docs/design/user-dashboard-mockup.md)
  
- [ ] 5.3 Implement team admin invitation permissions
  - Allow inviting to assigned teams only
  - **Requirements:** 6. Team Management (Team Admin)
  - **Design:** Role hierarchy (docs/design/architecture-diagrams.md)
  
- [ ] 5.4 Implement team admin member management
  - View members, handle join requests for assigned teams
  - **Requirements:** 6. Team Management (Team Admin)
  - **Mockup:** Team admin manage team (docs/design/user-dashboard-mockup.md)

### 6. Team Join Requests
- [ ] 6.1 Create browse teams page
  - Show all org teams, user's teams, request to join
  - **Requirements:** 10. Cross-Team Visibility (Users can request to join teams)
  - **Mockup:** Browse teams (docs/design/team-join-request-mockup.md)
  
- [ ] 6.2 Create join request modal
  - Optional message, send to admins
  - **Requirements:** 10. Cross-Team Visibility
  - **Mockup:** Request to join modal (docs/design/team-join-request-mockup.md)
  
- [ ] 6.3 Implement join request notifications
  - Notify org admins and team admins
  - **Requirements:** 10. Cross-Team Visibility
  - **Design:** Team join request flow (docs/design/architecture-diagrams.md)
  
- [ ] 6.4 Implement join request approval/denial
  - Approve: add to team, Deny: notify with reason
  - **Requirements:** 10. Cross-Team Visibility
  - **Design:** Team join request flow (docs/design/architecture-diagrams.md)
  
- [ ] 6.5 Create teams settings tab for users
  - View teams, pending requests, leave teams
  - **Requirements:** 10. Cross-Team Visibility
  - **Mockup:** User settings teams tab (docs/design/team-join-request-mockup.md)

### 7. Testing & Validation
- [ ] 7.1 Write unit tests for invitation service
  - Test smart processing, email checking, license management
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.2 Write integration tests for invitation flows
  - Test complete invitation process, results summary
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.3 Write unit tests for team management
  - Test team CRUD, admin assignment, picture upload
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.4 Write integration tests for join requests
  - Test request creation, approval, denial flows
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.5 Run `npx next build` to ensure no errors
  - Validate all changes build successfully
  - **Felix Guidelines:** Always validate builds

## Completion Criteria
- [ ] Smart invitation processing working correctly
- [ ] Invitation management UI complete
- [ ] Invitation expiration configurable and working
- [ ] Team management complete for Org Admins
- [ ] Team management complete for Team Admins
- [ ] Team join requests working end-to-end
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Build completes without errors

## Dependencies
- Phase 1: Multi-Tenant Foundation
- Phase 2: Authentication & Onboarding

## Next Phase
Phase 4: Organization Admin Dashboard & Settings
