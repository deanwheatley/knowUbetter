# Multi-Tenant Organizations - Mockups Summary

## Overview
Complete set of ASCII art mockups for the multi-tenant organization feature.

## Authentication & Onboarding (8 screens)

### File: `auth-login-signup-mockup.md`
1. **Login Screen** - Standard login with SSO options
2. **Account Type Selection** - Choose between User or Organization Admin
3. **Standard User Signup - No Invitation** - Create account, shows no invitation found
4. **Standard User Signup - With Invitation** - Shows organization and teams they'll join
5. **SSO Signup** - Display name required after SSO authentication
6. **Organization Admin Signup - Step 1** - Account creation
7. **Organization Admin Signup - Step 2** - Organization setup (name, first team, size)
8. **Organization Admin Signup - Step 3** - Branding setup (logo, colors, SSO)
9. **Welcome Screen - No Teams** - User waiting for team assignment
10. **Welcome Screen - With Teams** - User ready to start
11. **Welcome Screen - Org Admin** - Next steps for new organization
12. **Login with Disabled SSO** - Shows disabled methods with admin contact

## System Admin (3 screens)

### File: `system-admin-dashboard-mockup.md`
1. **Organizations List** - View all organizations with metrics
2. **Create Organization Modal** - Create new organization
3. **Organization Detail View** - Manage specific organization

## Organization Admin (10 screens)

### File: `org-admin-dashboard-mockup.md`
1. **Dashboard Overview** - License usage, teams, quick actions, activity
2. **Teams Management** - List all teams with stats
3. **Create Team Modal** - Create new team with picture upload
4. **Team Detail** - Manage team admins, members, settings
5. **Invite Users** - Bulk email invitation with team selection
6. **Invitation Results Summary** - Shows teams assigned, invitations sent, errors
7. **Invitations Management** - Pending, accepted, expired invitations
8. **Organization Settings - General** - Name, description, org admins, licenses
9. **Organization Settings - Branding & Authentication** - Logo, colors, SSO config
10. **Organization Settings - Invitations** - Expiration settings, default message

## Standard Users & Team Admins (4 screens)

### File: `user-dashboard-mockup.md`
1. **User Dashboard - With Teams** - Stats, teams, activity, leaderboard
2. **User Dashboard - No Teams** - Waiting state with helpful guidance
3. **Team Admin Dashboard** - Shows admin teams, quick actions, team overview
4. **Team Admin - Manage Team** - Team switcher dropdown, invitations, join requests

## Key Features Documented

### Authentication
- Email/password (knowUbetter)
- Google SSO
- Facebook SSO
- Enterprise SSO (coming soon)
- Disabled methods show admin contact info

### Organization Creation
- Self-service during signup
- Three-step process (account, organization, branding)
- Branding optional during setup

### User Invitation
- Smart processing (existing vs new users)
- Immediate team assignment for existing users
- Results summary with three sections
- Configurable expiration (7, 14, 30, 60, 90 days, never)

### Team Management
- Multiple Team Admins per team
- Custom team pictures (auto-generated icons as fallback)
- Team switcher dropdown for admins
- Join requests and invitations

### Role Hierarchy
- System Admin (internal operations)
- Organization Admin (manages organization)
- Team Admin (manages assigned teams)
- User (standard member)
- Roles are hierarchical and additive

### Data Isolation
- Users belong to one organization
- Can be on multiple teams within organization
- Cross-team visibility within organization
- Complete isolation between organizations

## Design Patterns Used

### Navigation
- Tab-based navigation for main sections
- Sub-tabs for detailed views
- Breadcrumbs for deep navigation
- Dropdown selectors for context switching

### Feedback
- Success/error messages
- Loading states
- Empty states with helpful guidance
- Tooltips for disabled features

### Actions
- Primary actions prominent (buttons)
- Secondary actions subtle (links)
- Destructive actions in "Danger Zone"
- Bulk operations where appropriate

### Information Hierarchy
- Cards for grouped information
- Stats in compact boxes
- Lists with pagination
- Expandable sections for details

## Responsive Considerations

All mockups designed for desktop but should adapt to mobile:
- Stack cards vertically on mobile
- Collapse navigation to hamburger menu
- Full-width forms on mobile
- Touch-friendly button sizes

## Accessibility Considerations

- Clear visual hierarchy
- Descriptive labels
- Error messages with context
- Keyboard navigation support
- Screen reader friendly structure

## Next Steps

1. Create user flow diagrams
2. Design component library
3. Create interactive prototypes
4. User testing with mockups
5. Refine based on feedback
