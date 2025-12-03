# Phase 5: Organization Admin Dashboard & Settings - Implementation Plan

## Overview
Implement Organization Admin dashboard, organization settings, branding configuration, and user management.

**Requirements:** Multi-tenant organizations requirements (docs/requirements/multi-tenant-organizations.md)
**Design:** Org admin mockups (docs/design/org-admin-dashboard-mockup.md)

## Tasks

### 1. Organization Admin Dashboard
- [ ] 1.1 Create org admin dashboard overview
  - License usage, teams, active users, quick actions
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** Org admin dashboard (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 1.2 Implement recent activity feed
  - Show org-wide activity, invitations, team updates
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** Org admin dashboard (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 1.3 Implement organization stats display
  - Questions answered, props exchanged, badges, engagement
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** Org admin dashboard (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 1.4 Add Org tab to navigation for org admins
  - Show tab only for org admins, hide for regular users
  - **Requirements:** 3. Organization Admin Role
  - **Design:** Role hierarchy (docs/design/architecture-diagrams.md)

### 2. Organization Settings - General
- [ ] 2.1 Create organization settings page with tabs
  - General, Branding, Authentication, Quiz Settings, Invitations
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** Organization settings (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 2.2 Implement general settings tab
  - Org name, description, org admins management
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** Organization settings general (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 2.3 Implement multiple org admin management
  - Add/remove organization admins
  - **Requirements:** 3. Organization Admin Role
  - **Design:** Organization data model (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 2.4 Implement license information display
  - Show license type, usage, FREE status
  - **Requirements:** 2. License Management
  - **Mockup:** Organization settings general (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 2.5 Implement danger zone actions
  - Export organization data, delete organization
  - **Requirements:** 11. Audit & Compliance
  - **Mockup:** Organization settings general (docs/design/org-admin-dashboard-mockup.md)

### 3. Organization Settings - Branding
- [ ] 3.1 Create branding settings tab
  - Logo upload, color pickers
  - **Requirements:** 3. Organization Branding
  - **Mockup:** Branding settings (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 3.2 Implement logo upload to S3
  - Upload logo, display in header for all org users
  - **Requirements:** 3. Organization Branding (Upload logo)
  - **Design:** Organization branding (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 3.3 Implement color scheme configuration
  - Primary and secondary color pickers, apply to UI
  - **Requirements:** 3. Organization Branding (Define color scheme)
  - **Design:** Organization branding (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 3.4 Implement real-time branding application
  - Apply changes immediately to all active sessions
  - **Requirements:** 3. Organization Branding (Branding applies immediately)
  - **Design:** Caching strategy (docs/design/architecture-diagrams.md)

### 4. Organization Settings - Authentication
- [ ] 4.1 Create authentication settings tab
  - Toggle SSO methods, configure providers
  - **Requirements:** 3. Organization Branding (Authentication Configuration)
  - **Mockup:** Authentication settings (docs/design/org-admin-dashboard-mockup.md)
  
- [ ] 4.2 Implement SSO method toggles
  - Enable/disable Google, Facebook, Enterprise SSO
  - **Requirements:** 3. Organization Branding (Configure SSO)
  - **Design:** SSO configuration (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 4.3 Update login page to respect org SSO settings
  - Show only enabled methods, display disabled tooltips
  - **Requirements:** 3. Organization Branding (Disabled methods show tooltip)
  - **Mockup:** Login with disabled SSO (docs/design/auth-login-signup-mockup.md)
  
- [ ] 4.4 Add "Coming Soon" indicator for Enterprise SSO
  - Show Enterprise SSO option as disabled with tooltip
  - **Requirements:** 3. Organization Branding (Future SSO)
  - **Mockup:** Authentication settings (docs/design/org-admin-dashboard-mockup.md)

### 5. Organization Settings - Quiz & Invitations
- [ ] 5.1 Create quiz settings tab
  - Configure kudos, limits, props, streaks
  - **Requirements:** 9. Quiz Configuration Scope
  - **Design:** Organization settings (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 5.2 Implement quiz settings management
  - Get/update quiz settings, apply to all org users
  - **Requirements:** 9. Quiz Configuration Scope
  - **Design:** Quiz configuration (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 5.3 Create invitation settings tab (already done in Phase 3)
  - Expiration configuration, default message
  - **Requirements:** 4. User Invitation & Onboarding (Invitation Expiration)
  - **Mockup:** Invitation settings (docs/design/org-admin-dashboard-mockup.md)

### 6. User Management
- [ ] 6.1 Create users list page
  - Search, filter, pagination, view all org users
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** User management (docs/design/admin-panel-mockup.md)
  
- [ ] 6.2 Create user detail view
  - View user stats, activity, admin actions
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** User detail view (docs/design/admin-panel-mockup.md)
  
- [ ] 6.3 Implement user management actions
  - Reset limits, change role, remove from org
  - **Requirements:** 3. Organization Admin Role
  - **Design:** User service (docs/design/architecture-diagrams.md)
  
- [ ] 6.4 Implement user search and filtering
  - Search by name/email, filter by team/role
  - **Requirements:** 3. Organization Admin Role
  - **Mockup:** User management (docs/design/admin-panel-mockup.md)

### 7. Testing & Validation
- [ ] 7.1 Write unit tests for org admin dashboard
  - Test stats calculation, activity feed, quick actions
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.2 Write unit tests for organization settings
  - Test all settings tabs, save/update operations
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.3 Write integration tests for branding
  - Test logo upload, color changes, real-time application
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.4 Write integration tests for user management
  - Test user list, search, detail view, admin actions
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.5 Run `npx next build` to ensure no errors
  - Validate all changes build successfully
  - **Felix Guidelines:** Always validate builds

## Completion Criteria
- [ ] Org admin dashboard complete and functional
- [ ] All organization settings tabs implemented
- [ ] Branding configuration working with real-time updates
- [ ] Authentication settings controlling SSO methods
- [ ] Quiz settings configurable per organization
- [ ] User management complete
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Build completes without errors

## Dependencies
- Phase 1: Multi-Tenant Foundation
- Phase 1A: Additional Data Models
- Phase 2: Authentication & Quick Setup
- Phase 3: Direct Messaging System
- Phase 4: Invitation & Team Management

## Next Phase
Phase 6: System Admin & User Dashboards
