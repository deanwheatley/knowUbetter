# Phase 5: System Admin & User Dashboards - Implementation Plan

## Overview
Implement System Admin dashboard for managing all organizations, user dashboards with organization context, and user profile management.

**Requirements:** Multi-tenant organizations requirements (docs/requirements/multi-tenant-organizations.md)
**Design:** System admin mockups (docs/design/system-admin-dashboard-mockup.md), User mockups (docs/design/user-dashboard-mockup.md)

## Tasks

### 1. System Admin Dashboard
- [ ] 1.1 Create system admin dashboard
  - View all organizations, system overview stats
  - **Requirements:** 1. System Admin Role
  - **Mockup:** System admin dashboard (docs/design/system-admin-dashboard-mockup.md)
  
- [ ] 1.2 Implement organization list with metrics
  - Show all orgs with license usage, teams, users, status
  - **Requirements:** 1. System Admin Role
  - **Mockup:** Organizations list (docs/design/system-admin-dashboard-mockup.md)
  
- [ ] 1.3 Create organization creation modal
  - Name, licenses, org admin email, status
  - **Requirements:** 1. System Admin Role
  - **Mockup:** Create organization modal (docs/design/system-admin-dashboard-mockup.md)
  
- [ ] 1.4 Create organization detail view
  - View/edit org, license management, activity metrics
  - **Requirements:** 1. System Admin Role
  - **Mockup:** Organization detail view (docs/design/system-admin-dashboard-mockup.md)
  
- [ ] 1.5 Implement system-wide analytics
  - Cross-organization metrics, global stats
  - **Requirements:** 1. System Admin Role (View cross-organization analytics)
  - **Design:** System admin capabilities (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 1.6 Implement "Access Org Dashboard" feature
  - Allow system admin to view any org's dashboard
  - **Requirements:** 1. System Admin Role (Access any organization's data)
  - **Design:** Role hierarchy (docs/design/architecture-diagrams.md)

### 2. Global Question Management
- [ ] 2.1 Create global questions library page
  - View, create, edit, delete global questions
  - **Requirements:** 1. System Admin Role (Manage global question library)
  - **Design:** Question management (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 2.2 Implement global question CRUD operations
  - Create/update/delete questions with scope=global
  - **Requirements:** 7. Question & Category Management (Global Questions)
  - **Design:** Question data model (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 2.3 Implement global question distribution
  - Make global questions available to all organizations
  - **Requirements:** 7. Question & Category Management (Global Questions)
  - **Design:** Question scoping (docs/design/multi-tenant-organizations-design.md)

### 3. User Dashboard (With Teams)
- [ ] 3.1 Create user dashboard with organization context
  - Show stats, teams, quick quiz, activity
  - **Requirements:** Standard user dashboard
  - **Mockup:** User dashboard with teams (docs/design/user-dashboard-mockup.md)
  
- [ ] 3.2 Display organization name in header
  - Show which org user belongs to
  - **Requirements:** 9. Data Isolation
  - **Mockup:** User dashboard (docs/design/user-dashboard-mockup.md)
  
- [ ] 3.3 Implement team list display
  - Show user's teams with icons/pictures
  - **Requirements:** 10. Cross-Team Visibility
  - **Mockup:** User dashboard (docs/design/user-dashboard-mockup.md)
  
- [ ] 3.4 Implement organization-scoped leaderboard preview
  - Show only users from same organization
  - **Requirements:** 9. Data Isolation (Leaderboards)
  - **Mockup:** User dashboard (docs/design/user-dashboard-mockup.md)

### 4. User Dashboard (No Teams - Waiting State)
- [ ] 4.1 Create waiting state dashboard
  - Helpful message, profile completion suggestions
  - **Requirements:** 4. User Invitation & Onboarding (Without Invitation)
  - **Mockup:** User dashboard no teams (docs/design/user-dashboard-mockup.md)
  
- [ ] 4.2 Implement conditional dashboard rendering
  - Show different dashboard based on team membership
  - **Requirements:** 4. User Invitation & Onboarding
  - **Design:** User dashboard logic (docs/design/user-flow-diagrams.md)
  
- [ ] 4.3 Add notification system for team assignments
  - Notify user when added to teams
  - **Requirements:** 4. User Invitation & Onboarding (Existing User Team Assignment)
  - **Design:** Notification service (docs/design/architecture-diagrams.md)

### 5. User Profile & Settings
- [ ] 5.1 Create public user profile page
  - Avatar, teams, stats, badges, activity
  - **Requirements:** 5. User Profile Requirements
  - **Mockup:** User profile public view (docs/design/user-profile-mockup.md)
  
- [ ] 5.2 Create user settings page with tabs
  - Profile, Account, Teams, Notifications, Privacy
  - **Requirements:** 5. User Profile Requirements
  - **Mockup:** User settings (docs/design/user-profile-mockup.md)
  
- [ ] 5.3 Implement profile editing
  - Edit display name, avatar, about section
  - **Requirements:** 5. User Profile Requirements (Profile Fields)
  - **Mockup:** User settings profile tab (docs/design/user-profile-mockup.md)
  
- [ ] 5.4 Implement avatar upload to S3
  - Upload avatar, auto-generate fallback
  - **Requirements:** 5. User Profile Requirements (Avatar)
  - **Design:** User profile structure (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 5.5 Create teams settings tab (already done in Phase 3)
  - View teams, pending requests, leave teams
  - **Requirements:** 10. Cross-Team Visibility
  - **Mockup:** Teams settings tab (docs/design/team-join-request-mockup.md)

### 6. Organization-Scoped Data Filtering
- [ ] 6.1 Implement leaderboard filtering by organization
  - Show only org members in all leaderboards
  - **Requirements:** 9. Data Isolation (Leaderboards)
  - **Design:** Data isolation (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 6.2 Implement props filtering by organization
  - Users can only send props within org
  - **Requirements:** 9. Data Isolation (Props)
  - **Design:** Data isolation (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 6.3 Implement profile viewing restrictions
  - Users can only view profiles within org
  - **Requirements:** 9. Data Isolation (Public profiles)
  - **Design:** Data isolation (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 6.4 Implement notification filtering
  - Show only notifications from org
  - **Requirements:** 9. Data Isolation (Notifications)
  - **Design:** Data isolation (docs/design/multi-tenant-organizations-design.md)

### 7. Testing & Validation
- [ ] 7.1 Write unit tests for system admin dashboard
  - Test org list, creation, detail view, analytics
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.2 Write unit tests for global question management
  - Test CRUD operations, distribution to orgs
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.3 Write unit tests for user dashboards
  - Test with teams, without teams, conditional rendering
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.4 Write integration tests for data isolation
  - Test all org-scoped filtering (leaderboards, props, profiles)
  - **Requirements:** 9. Data Isolation
  - **Design:** Data isolation validation (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.5 Run `npx next build` to ensure no errors
  - Validate all changes build successfully
  - **Felix Guidelines:** Always validate builds

## Completion Criteria
- [ ] System admin dashboard complete
- [ ] Global question management working
- [ ] User dashboard complete (with/without teams)
- [ ] User profile and settings complete
- [ ] All data isolation filters working correctly
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Build completes without errors

## Dependencies
- Phase 1: Multi-Tenant Foundation
- Phase 2: Authentication & Onboarding
- Phase 3: Invitation & Team Management
- Phase 4: Org Admin Dashboard & Settings

## Next Phase
Phase 6: Migration & Final Integration
