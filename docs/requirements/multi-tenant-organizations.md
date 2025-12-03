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
User with elevated privileges to manage specific team(s). This is not a separate role, but additional permissions granted to regular users for specific teams.

**Responsibilities:**
- Invite users to their assigned teams
- Manage team members for teams they admin
- Configure team-specific settings for their teams
- View team statistics for their teams
- Approve/manage questions for their teams

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
- **TurboTax-Style Quick Setup**: Simple questions instead of complex configuration
  - Question 1: "What kind of organization are you?" (Ad Tech, Software Engineering, Advertising)
  - Question 2: "How is your organization structured?" (Departments, Project Teams, One Big Team, Custom)
  - Question 3: "What would you like to do first?" (Invite team, Add questions, Customize, Start now)
- **Smart Defaults**: Auto-configuration based on organization type
- **Progressive Disclosure**: Advanced configuration available but not required
- New organizations get:
  - Smart defaults based on organization type
  - Pre-configured teams based on structure choice
  - Industry-appropriate branding and settings
  - 20 evaluation licenses with configurable period
  - "You can change these settings anytime" messaging

**System Admin Capabilities:**
- View all organizations and their metrics
- Access any organization's dashboard
- Deactivate/reactivate organizations
- Manage global question library
- View cross-organization analytics
- Override organization settings if needed

### 2. License Management

**As an Organization Admin, I want to manage licenses so that I can control user capacity during and after my evaluation period.**

**Evaluation Period Model:**
- New organizations get 20 free licenses for configurable evaluation period
- Default evaluation period set by System Admin (e.g., 30 days)
- System Admin can set different evaluation periods per organization
- System Admin can extend evaluation periods and grant additional licenses
- Every user invitation consumes 1 license
- License dashboard shows: total, used, available, pending invitations, days remaining
- Cannot invite users when licenses are exhausted or evaluation expired
- Removing users releases licenses
- Expired invitations release licenses

**System Admin Controls:**
- Configure default evaluation period for new organizations
- Set custom evaluation period per organization
- Grant additional licenses to any organization
- Extend evaluation periods
- Convert organizations to paid plans (future)

**Real-time Notifications:**
- Organization Admin receives dialog notification when:
  - Evaluation period is extended
  - Additional licenses are granted
  - Evaluation period is modified
- If Org Admin is online: immediate dialog notification
- If Org Admin is offline: dialog shown on next login

### 3. Organization Branding

**As an Organization Admin, I want to customize branding so that the platform reflects my organization's identity.**

**Branding Options:**
- Upload organization logo (displayed in header, optional)
- Define primary and secondary colors (applied to UI)
- Branding applies to all users in organization immediately
- Can be configured during org setup or updated later

**Authentication Configuration:**
- Configure allowed authentication methods using NextAuth.js:
  - Email/password (credentials provider) - always enabled
  - Google SSO - optional
  - Facebook SSO - optional
  - Enterprise SSO (Okta, Azure AD, SAML 2.0) - **Future/Coming Soon**
- Disabled authentication methods show tooltip on login: "Disabled by Organizational Admin: [admin email addresses]"
- Users see only enabled methods during login and signup
- NextAuth.js handles OAuth flows and session management

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
- **Never expire implementation**: `expiresAt: null` - no expiration date set
- Cron job skips invitations with `null` expiration dates
- Never-expiring invitations remain valid until manually cancelled

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
- Google and Facebook SSO supported via NextAuth.js providers
- Display name required for all signups (pre-filled from SSO provider)
- SSO methods can be enabled/disabled by Organization Admin
- Disabled SSO methods show tooltip: "Disabled by Organizational Admin: [admin emails]"
- Future SSO (Okta, SAML) marked as "COMING SOON"
- NextAuth.js handles secure OAuth flows and token management

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

**Question Scoping (Hybrid Approach):**
- **People category**: Defaults to team-scoped (users see questions about their teammates)
- **Other categories** (Product, Lore, Industry): Default to global/organization-scoped
- **Admin override**: Any question can be manually assigned to specific teams regardless of category
- **Multi-team users**: See People questions from ALL their teams (with team context shown)

**Question Management:**
- View global questions (available to all organizations)
- Enable/disable global questions for organization
- Create organization-specific questions
- Approve user-submitted questions
- Create custom categories for organization
- Override default scoping and assign questions to specific teams
- User submissions route to their Org Admin

**Global Questions:**
- Created by System Admin
- Available to all organizations
- Organizations can enable/disable individually
- Can be overridden to team-specific if needed

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

### 11. Direct Messaging

**As a user, I want to message my teammates so that I can build relationships around quiz activities.**

**Team-Scoped Messaging:**
- Users can only message teammates (users on same teams)
- Async messaging system (no real-time requirements)
- Messages enhance core quiz activities without overwhelming them

**Message Integration with Core Activities:**
- **Question creation**: "I submitted a question about you - hope that's okay!"
- **Know You responses**: "I updated my answer about weekend plans"
- **Quiz results**: "I learned something new about you today!"
- **Props system**: "Thanks for the mad-prop! That made my day"

**Message Features:**
- Quick message templates for common scenarios
- Custom free-form messages
- Message history and read status
- Integration with user profiles and quiz activities
- Notification system for new messages

### 12. Audit & Compliance

**As an Organization Admin, I want audit logs so that I can monitor usage.**

- View all admin actions within organization
- Export user data and activity reports
- View engagement metrics per user and team
- System Admin can view cross-organization audit logs
- All admin actions logged with timestamp, user, action type, affected resources

### 13. Quick Setup & Progressive Configuration

**As an Organization Admin, I want quick setup so that I can start using the platform immediately.**

**TurboTax-Style Setup Flow:**
- Replace complex configuration screens with 3 simple questions
- Auto-configure organization based on responses
- Complete setup in under 2 minutes
- Always show "You can change these settings anytime" messaging

**Organization Type Templates:**
- **Ad Tech**: Modern branding, Google auth, project-based teams, 30-day eval
- **Software Engineering**: Professional branding, all auth options, department teams, 30-day eval  
- **Advertising**: Creative branding, Google/Facebook auth, campaign teams, 30-day eval

**Progressive Configuration:**
- Quick setup gets users started immediately
- Advanced configuration available in settings
- Migration path from quick setup to advanced setup
- Templates can be modified after initial setup

**Success Metrics:**
- Setup completion rate: Target 90%+ (vs current ~60%)
- Time to first value: Target <5 minutes
- Configuration accuracy: Fewer support tickets about setup

### 14. Migration of Existing Data

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
