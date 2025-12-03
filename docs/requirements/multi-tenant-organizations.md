# Multi-Tenant Organizations - Requirements

## Overview
Extension of knowUbetter to support multiple organizations with hierarchical administration, license management, organization branding, and data isolation.

## User Roles

### System Admin
Internal operations personnel who manage the platform.

**Responsibilities:**
- Create and manage organizations
- Assign licenses to organizations
- Configure system-wide settings and defaults
- Manage global question library
- View cross-organization analytics
- Access any organization's data

### Organization Admin
Super user who purchases licenses and manages their organization.

**Responsibilities:**
- Create and manage teams within organization
- Invite users and manage licenses
- Configure organization branding (logo, colors, SSO)
- Approve/configure questions and categories
- Configure quiz settings for organization
- Designate Team Admins
- View organization analytics and audit logs

### Team Admin
User designated to manage specific team(s).

**Responsibilities:**
- Invite users to their assigned teams
- Manage team members
- Configure team-specific settings
- View team statistics

### User
Standard member who participates in quizzes.

**Responsibilities:**
- Answer quiz questions
- Send props to organization members
- Submit questions for approval
- Request to join teams within organization

## Core Requirements

### 1. Organization Structure

**As an Organization Admin, I want to create my organization during signup so that I can start managing teams immediately.**

**Organization Creation:**
- Organizations are created automatically when a user signs up as Organization Admin
- During signup, Org Admin provides:
  - Organization name
  - First team name
  - Estimated organization size (1-5, 6-20, 21-50, 51+ users)
- New organizations get:
  - Default categories and settings
  - Access to global questions
  - FREE unlimited licenses (initial implementation)
  - Default branding (can customize immediately)

**System Admin Capabilities:**
- View all organizations and their metrics
- Access any organization's dashboard
- Deactivate/reactivate organizations
- Manage global question library
- View cross-organization analytics
- Override organization settings if needed

### 2. License Management

**As an Organization Admin, I want to manage licenses so that I can control user capacity.**

- Every user invitation consumes 1 license
- License dashboard shows: total, used, available, pending invitations
- Cannot invite users when licenses are exhausted
- Removing users releases licenses
- Expired invitations (7 days) release licenses
- **Initial implementation: licenses are FREE (unlimited)**
- Future: Org Admin can request additional licenses from System Admin

### 3. Organization Branding

**As an Organization Admin, I want to customize branding so that the platform reflects my organization's identity.**

**Branding Options:**
- Upload organization logo (displayed in header, optional)
- Define primary and secondary colors (applied to UI)
- Branding applies to all users in organization immediately
- Can be configured during org setup or updated later

**Authentication Configuration:**
- Configure allowed SSO authentication methods:
  - knowUbetter (email/password) - always enabled
  - Google SSO - optional
  - Facebook SSO - optional
  - SSO Sign-In (Okta, Azure AD, SAML 2.0) - **Future/Coming Soon**
- Disabled authentication methods show tooltip on login: "Disabled by Organizational Admin: [admin email addresses]"
- Users see only enabled methods during login and signup

### 4. User Invitation & Onboarding

**As an Organization Admin or Team Admin, I want to invite users so that I can grow participation.**

**Signup Flow:**
- Users choose account type: Standard User or Organization Admin
- Organization Admin signup creates new organization automatically
- Standard User signup checks email for existing invitations

**Invitation Processing:**
- When Org Admin or Team Admin invites users by email, system checks each email:
  - **New users** (no account): Send invitation email, reserve license
  - **Existing users in same org**: Immediately assign to selected teams, send in-app notification
  - **Existing users in different org**: Show error (users cannot belong to multiple orgs)
- Display results summary showing teams assigned, invitations sent, and errors

**Invitation Expiration (Configurable):**
- Organization-level setting for invitation expiration
- Options: 7 days, 14 days, 30 days (default), 60 days, 90 days, or Never expire
- When enabled, expired invitations release reserved licenses
- Expired invitations can be resent with one click
- Admins can manually cancel/rescind invitations at any time
- If set to "Never expire", invitations remain valid until manually cancelled

**With Invitation (New Users):**
- When user enters email during signup, system checks for pending invitations
- If invitation found, display organization and team(s) they will join
- Upon completion, account created, assigned to teams, license consumed
- Invitation marked as accepted

**Without Invitation:**
- User can still create account without invitation
- Account created but no team assignments
- User sees waiting message until invited by admin
- Can request to join teams within organization once invited

**Existing User Team Assignment:**
- Existing users in same org are immediately added to teams (no email needed)
- Users receive in-app notification about new team assignments
- If user already on selected teams, skip silently (no duplicate assignments)
- No license consumed (user already counted)

**SSO Requirements:**
- Google and Facebook SSO supported
- Display name required for all signups (pre-filled from SSO provider)
- SSO methods can be enabled/disabled by Organization Admin
- Disabled SSO methods show tooltip: "Disabled by Organizational Admin: [admin emails]"
- Future SSO (Okta, SAML) marked as "COMING SOON"

**General:**
- Users cannot belong to multiple organizations
- Invitation expiration is configurable per organization (7, 14, 30, 60, 90 days, or never)
- Expired invitations release reserved licenses (if expiration enabled)
- Admins can manually cancel/rescind invitations at any time
- Admins can resend expired or cancelled invitations

### 5. User Profile Requirements

**As a user, I want to manage my profile information so that others can identify me.**

**Required at Signup:**
- Email address (unique, used for login)
- Display name (how others see you, can be changed later)
- Password (if using knowUbetter auth, min 8 characters)

**Profile Fields:**
- Avatar (auto-generated initially, can be updated later)
- About information (optional, can be added/updated anytime)
- Role (System Admin, Organization Admin, Team Admin, User)
  - Standard users select User or Organization Admin at signup
  - Team Admin role assigned by Organization Admin
  - System Admin role assigned manually by system

**Role Hierarchy:**
- System Admin can do everything Organization Admin can do
- Organization Admin can do everything Team Admin can do
- Team Admin can do everything User can do
- Roles are additive and hierarchical

### 6. Team Management

**As an Organization Admin, I want to create and manage teams so that I can organize users.**

**Team Creation:**
- Create teams with name, color, description
- Upload custom team picture (optional, auto-generated icon by default)
- Team pictures recommended: 200x200px PNG/JPG
- Auto-generated icons used if no picture uploaded

**Team Administration:**
- Assign multiple users as Team Admins for a single team
- Team Admins can invite users and manage their assigned teams
- Users can be on multiple teams within organization
- Users can request to join teams (requires admin approval)
- Users can leave teams (unless admin-locked)
- Team Admins can update team picture after creation

### 7. Question & Category Management

**As an Organization Admin, I want to configure questions so that I can customize quiz content.**

- View global questions (available to all organizations)
- Enable/disable global questions for organization
- Create organization-specific questions
- Approve user-submitted questions
- Create custom categories for organization
- Assign questions to specific teams
- User submissions route to their Org Admin

**Global Questions:**
- Created by System Admin
- Available to all organizations
- Organizations can enable/disable individually

### 8. Quiz Configuration

**As an Organization Admin, I want to configure quiz settings so that I can tailor the experience.**

Organization-level settings:
- Kudos per question
- Weekly question limits
- Props allowances
- Streak rewards
- Question timing
- Rubber band mechanic
- All settings from admin-configuration.md

System Admin sets defaults; Org Admins can override.

### 9. Data Isolation

**As an Organization Admin, I want data isolation so that we maintain privacy.**

**Isolated per organization:**
- Leaderboards (only show organization members)
- Props (can only send within organization)
- Public profiles (can only view organization members)
- Notifications (only from organization)
- Teams (only see organization teams)

**Shared across organizations:**
- Global questions (if enabled)
- System-wide settings (as defaults)

### 10. Cross-Team Visibility

**As a user, I want to see activity across my organization so that I stay connected.**

**Within organization, users can:**
- View organization-wide leaderboards
- View all team leaderboards (even teams they're not on)
- See props given to users on other teams
- View all teams in organization

**Users can only:**
- Participate in quizzes for their assigned teams
- Answer team-scoped questions from their teams
- Earn kudos that contributes to team and organization leaderboards

### 11. Audit & Compliance

**As an Organization Admin, I want audit logs so that I can monitor usage.**

- View all admin actions within organization
- Export user data and activity reports
- View engagement metrics per user and team
- System Admin can view cross-organization audit logs
- All admin actions logged with timestamp, user, action type, affected resources

### 12. Migration of Existing Data

**As a System Admin, I want to migrate existing data so that current users continue without disruption.**

- Create "knowUbetter Default" organization
- Migrate all existing users to default organization
- Preserve all user data (kudos, badges, streaks, history)
- Migrate existing teams to default organization
- Current admin becomes System Admin + Org Admin for default org
- Existing questions become global questions

## User Flows

### Organization Creation (System Admin)
1. System Admin logs into system dashboard
2. Clicks "Create Organization"
3. Enters organization name, license count, Org Admin email
4. System creates organization with defaults
5. Invitation email sent to Org Admin
6. Org Admin receives email, clicks link, completes setup
7. Org Admin configures branding and settings

### User Invitation (Org Admin / Team Admin)
1. Admin navigates to team management
2. Clicks "Invite User"
3. Enters email, selects team(s)
4. System checks license availability
5. If available: sends invitation, reserves license
6. User receives email with signup link
7. User clicks link, completes signup
8. Account created, assigned to team, license consumed
9. User can immediately start participating

### Team Join Request (User)
1. User views available teams in organization
2. Clicks "Request to Join" on desired team
3. System notifies Org Admin and Team Admin
4. Admin reviews request
5. Admin approves or denies with optional reason
6. User receives notification
7. If approved: user added to team, gains access to team content

### Question Configuration (Org Admin)
1. Org Admin navigates to question library
2. Views global questions and org-specific questions
3. Enables/disables global questions for organization
4. Creates custom questions for organization
5. Assigns questions to specific teams
6. Reviews and approves user-submitted questions
7. Questions become available in quiz pool

## Data Structures

### Organization Object
```json
{
  "id": "org-001",
  "name": "Acme Corp",
  "totalLicenses": 100,
  "usedLicenses": 45,
  "availableLicenses": 55,
  "branding": {
    "logoUrl": "https://...",
    "primaryColor": "#3B82F6",
    "secondaryColor": "#8B5CF6"
  },
  "ssoConfig": {
    "knowUbetter": true,
    "google": true,
    "facebook": false
  },
  "settings": {
    "kudosPerQuestion": 10,
    "weeklyQuestionLimit": 20
    // ... all quiz settings
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "createdBy": "system-admin-001"
}
```

### Updated User Object
```json
{
  "id": "user-001",
  "organizationId": "org-001",
  "role": "user | teamAdmin | orgAdmin | systemAdmin",
  "teamAdminFor": ["team-001", "team-003"],
  // ... existing user fields
}
```

### Updated Team Object
```json
{
  "id": "team-001",
  "organizationId": "org-001",
  "name": "Engineering",
  // ... existing team fields
}
```

### Invitation Object
```json
{
  "id": "invite-001",
  "organizationId": "org-001",
  "teamIds": ["team-001"],
  "email": "user@example.com",
  "invitedBy": "orgadmin-001",
  "status": "pending | accepted | expired",
  "expiresAt": "2024-01-08T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Question Scope
```json
{
  "id": "q-001",
  "scope": "global | organization | team",
  "organizationId": "org-001",  // if org or team scoped
  "teamId": "team-001",          // if team scoped
  // ... existing question fields
}
```

## Technical Considerations

### Authentication
- AWS Cognito user pools per organization
- SSO integration via OAuth 2.0
- Session management with organization context

### Database
- DynamoDB with organization partitioning
- GSI for cross-organization queries (System Admin)
- Efficient filtering by organizationId

### API
- All API calls include organization context
- Middleware validates user belongs to organization
- System Admin can access any organization

### UI
- Organization branding loaded on login
- Dynamic theming based on org colors
- Organization logo in header

## Success Metrics

- Number of organizations created
- License utilization per organization
- User engagement per organization
- Question submissions per organization
- Props activity per organization
- Team participation rates

## Future Enhancements

- Additional SSO providers (Okta, Azure AD, SAML)
- Automatic billing and license management
- Advanced analytics and custom dashboards
- Organization-specific badges
- White-label options with custom domains
- REST API for integrations
- Organization-specific Slack integration
