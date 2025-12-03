# Multi-Tenant Organizations - Design Document

## Overview
Design for extending knowUbetter from single-tenant to multi-tenant architecture with hierarchical administration, organization branding, and data isolation.

## Architecture Decisions

### 1. Organization Creation Flow

**Decision:** Organizations are created during user signup, not by System Admin.

**Rationale:**
- Self-service model allows faster onboarding
- Reduces System Admin workload
- Users can start immediately without waiting for admin approval
- More scalable for growth

**Implementation:**
- User selects "I'm creating an organization" during signup
- Three-step process:
  1. Create account (email, display name, password)
  2. Set up organization (name, first team, size estimate)
  3. Configure branding (logo, colors, SSO - optional)
- Organization created with default settings and 20 evaluation licenses

### 2. Role Hierarchy

**Decision:** Roles are hierarchical and additive.

**Role Structure:**
```
System Admin (highest)
    ↓ (can do everything Org Admin can do)
Organization Admin
    ↓ (can do everything User can do + org management)
User (base role)
    + Team Admin Privileges (for specific teams)
```

**Assignment:**
- Users select User or Organization Admin at signup
- Team Admin privileges assigned by Organization Admin to specific teams
- System Admin role assigned manually (internal only)
- Users maintain User role but gain additional privileges for assigned teams

### 3. Invitation System

**Decision:** Smart invitation processing with immediate team assignment for existing users.

**Rationale:**
- Faster for existing users (no email needed)
- Reduces unnecessary emails
- Clear feedback on what happened
- Handles mixed scenarios elegantly

**Flow:**
1. Admin enters emails and selects teams
2. System processes each email:
   - **New user**: Send invitation email, reserve license
   - **Existing user (same org)**: Immediately assign to teams, send in-app notification
   - **Existing user (different org)**: Show error
3. Display results summary with three sections:
   - Teams Assigned (existing users)
   - Invitations Sent (new users)
   - Errors (users in other orgs)

**New User Signup:**
1. User goes to signup page
2. System checks email for pending invitations
3. If found: Shows organization and teams they'll join
4. If not found: User can still create account, waits for invitation

**Invitation Expiration:**
- Configurable per organization (org-level setting)
- Options: 7, 14, 30 (default), 60, 90 days, or "Never expire"
- When enabled, expired invitations automatically release reserved licenses
- Expired invitations can be resent with one click
- Admins can manually cancel/rescind at any time regardless of expiration setting
- **Never expire**: `expiresAt: null` - invitation never expires automatically
- Expiration checking cron job skips invitations where `expiresAt` is null

**Edge Cases:**
- If existing user already on selected teams: Skip silently (no duplicate)
- Existing users get in-app notification about new team assignments
- No license consumed for existing users (already counted)
- If expiration set to "Never" (`expiresAt: null`), invitations remain valid until manually cancelled

### 4. Authentication & SSO

**Decision:** Use NextAuth.js for authentication with organization-level SSO configuration.

**Supported Methods:**
- Email/password (credentials provider) - always enabled
- Google SSO - optional
- Facebook SSO - optional
- Enterprise SSO (Okta, SAML) - future enhancement

**Implementation:**
- NextAuth.js handles OAuth flows and session management
- Organization settings control which providers are enabled
- Custom signin page shows only enabled methods per organization
- Session includes organization context for data isolation

**Disabled Method Behavior:**
- Grayed out on login/signup screens
- Tooltip shows: "Disabled by Organizational Admin: [admin emails]"
- Users must use enabled methods

**SSO Requirements:**
- Display name required for all signups
- Pre-filled from SSO provider (Google, Facebook)
- User can edit before completing signup

### 5. User Profile Structure

**Required Fields:**
- Email address (unique, used for login)
- Display name (visible to others, editable)
- Password (if using knowUbetter auth, min 8 characters)

**Optional Fields:**
- Avatar (auto-generated, can update later)
- About information (can add/edit anytime)

**System Fields:**
- Role (User, Team Admin, Org Admin, System Admin)
- Organization ID
- Team IDs (array, users can be on multiple teams)
- Created date
- Last active date

### 6. License Management

**Decision:** Evaluation period model with System Admin controls.

**Rationale:**
- Provides clear trial period for organizations to evaluate
- System Admin maintains control over resource allocation
- Creates natural pathway to paid plans
- Allows flexible extension and customization per organization

**Implementation:**
- New organizations: 20 licenses + configurable evaluation period
- System Admin dashboard for managing all organization licenses
- Real-time notifications when licenses/periods change
- License enforcement prevents over-invitation
- Expired evaluation blocks new invitations but preserves existing users

**Future Implementation:**
- Automatic billing integration after evaluation
- Self-service license purchasing
- Usage analytics and recommendations
- Enterprise license tiers

### 7. Data Isolation

**Isolated per Organization:**
- Users (cannot belong to multiple orgs)
- Teams
- Leaderboards
- Props (can only send within org)
- Public profiles (can only view org members)
- Notifications
- Organization-specific questions

**Shared Across Organizations:**
- Global questions (System Admin managed)
- System-wide settings (as defaults)
- Platform features and updates

**Cross-Team Visibility (within org):**
- Users can view all teams in their org
- Can see org-wide leaderboards
- Can see props given to users on other teams
- Can only participate in quizzes for assigned teams

### 8. Direct Messaging System

**Decision:** Team-scoped async messaging to enhance quiz activities.

**Implementation:**
- Messages only between users who share at least one team
- Async message delivery with read status tracking
- Integration points in quiz results, props system, profile updates
- Message templates for common scenarios
- Custom message composition for deeper conversations

**Message Scoping:**
- Users can message any teammate (shared team membership)
- Message history preserved per conversation
- Notifications for unread messages
- No real-time delivery requirements (async is sufficient)

**Activity Integration:**
- Quick message buttons in quiz result screens
- Props acknowledgment messaging
- Profile update notifications to teammates
- Question submission courtesy messages

### 9. TurboTax-Style Quick Setup

**Decision:** Replace complex configuration with simple questions and smart defaults.

**Rationale:**
- Reduces setup time from 15-20 minutes to <2 minutes
- Increases completion rate from ~60% to target 90%+
- Eliminates configuration paralysis and abandonment
- Provides immediate value while allowing later customization

**Question Flow:**
1. **Organization Type**: Ad Tech, Software Engineering, Advertising
2. **Structure**: Departments, Project Teams, One Big Team, Custom
3. **First Action**: Invite team, Add questions, Customize, Start now

**Smart Defaults by Industry:**
- **Ad Tech**: Modern branding, Google auth, project teams, 30-day eval
- **Software Engineering**: Professional branding, all auth, department teams, 30-day eval
- **Advertising**: Creative branding, social auth, campaign teams, 30-day eval

**Progressive Disclosure:**
- Quick setup completes with smart defaults
- "You can change these settings anytime" messaging
- Advanced configuration available in settings
- Migration path from templates to custom configuration

### 10. Organization & Team Branding

**Organization Branding:**
- Logo upload (displayed in header)
- Primary color (main UI elements)
- Secondary color (accents)
- Authentication methods (SSO configuration)
- Branding applies immediately to all org users
- Can be configured during setup or updated later
- Optional during initial setup (can skip)

**Team Branding:**
- Custom team picture upload (200x200px PNG/JPG recommended)
- Auto-generated icon (emoji) used by default if no picture uploaded
- Team color selection
- Multiple Team Admins can be assigned per team
- Team Admins can update team picture after creation
- Team pictures displayed in team lists, leaderboards, and team pages

## Data Models

### Organization
```typescript
interface Organization {
  id: string
  name: string
  createdAt: Date
  createdBy: string // User ID of Org Admin
  status: 'active' | 'trial' | 'inactive'
  
  // Licensing
  totalLicenses: number
  usedLicenses: number
  availableLicenses: number
  
  // Evaluation Period
  evaluationStartDate: Date
  evaluationEndDate: Date
  evaluationExtended: boolean
  isEvaluationActive: boolean
  
  // Branding
  branding: {
    logoUrl?: string
    primaryColor: string // hex
    secondaryColor: string // hex
  }
  
  // Authentication
  ssoConfig: {
    credentials: boolean // always true (email/password)
    google: boolean
    facebook: boolean
    enterpriseSSO?: {
      enabled: boolean
      provider: 'okta' | 'azure' | 'saml'
      config: object
    }
  }
  
  // Settings (inherits from system defaults)
  settings: {
    kudosPerQuestion: number
    weeklyQuestionLimit: number
    invitationExpirationDays: number | null // null = never expire, default: 30
    // ... all quiz settings
  }
  
  // Metrics
  teamCount: number
  userCount: number
  activeUserCount: number
}
```

### User (Updated)
```typescript
interface User {
  id: string
  email: string
  displayName: string
  password?: string // null if SSO only
  
  // Organization & Teams
  organizationId: string
  teamIds: string[]
  primaryTeamId?: string
  
  // Role (only actual roles, not team admin privileges)
  role: 'user' | 'orgAdmin' | 'systemAdmin'
  teamAdminFor: string[] // Team IDs where user has admin privileges (can be multiple)
  
  // Profile
  avatar: string // URL or auto-generated
  about?: string
  
  // Existing fields
  totalKudos: number
  propKudos: number
  badges: Badge[]
  streaks: Streaks
  // ... all existing user fields
  
  // Metadata
  createdAt: Date
  lastActiveAt: Date
  authProvider: 'credentials' | 'google' | 'facebook' | 'sso'
}
```

### Invitation
```typescript
interface Invitation {
  id: string
  organizationId: string
  teamIds: string[]
  email: string
  invitedBy: string // User ID
  status: 'pending' | 'accepted' | 'expired'
  expiresAt: Date
  createdAt: Date
  acceptedAt?: Date
}
```

### Team (Updated)
```typescript
interface Team {
  id: string
  organizationId: string // NEW
  name: string
  color: string
  
  // Team Picture/Icon
  pictureUrl?: string // Custom uploaded picture
  icon: string // Auto-generated icon (emoji) used if no picture
  
  description?: string
  
  // Team Admins (multiple allowed)
  teamAdminIds: string[] // Array of user IDs who are team admins
  
  // Existing fields
  createdBy: string
  isAdminLocked: boolean
  memberCount: number
  totalKudos: number
  createdAt: Date
}
```

### Question (Updated)
```typescript
interface Question {
  id: string
  content: string
  category: string
  options: string[]
  correctAnswer: string
  
  // Scope (Hybrid System)
  defaultScope: 'global' | 'organization' | 'team' // Based on category defaults
  actualScope: 'global' | 'organization' | 'team' // After admin override
  organizationId?: string // if org or team scoped
  teamId?: string // if team scoped
  isManuallyAssigned: boolean // true if admin overrode default scoping
  
  // Existing fields
  createdBy: string
  status: 'pending' | 'approved' | 'rejected'
  difficulty: 'easy' | 'medium' | 'hard'
  timesAnswered: number
  correctRate: number
  // ... all existing question fields
}
```

### Message
```typescript
interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: 'quick' | 'custom' | 'system'
  
  // Activity Integration
  relatedActivity?: {
    type: 'question' | 'quiz' | 'prop' | 'know-you'
    id: string
    context?: string // Additional context about the activity
  }
  
  // Message Status
  isRead: boolean
  readAt?: Date
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}
```

### OrganizationTemplate
```typescript
interface OrganizationTemplate {
  id: string
  name: string
  type: 'adtech' | 'software' | 'advertising'
  
  // Smart Defaults
  branding: {
    primaryColor: string
    secondaryColor: string
    theme: 'modern' | 'professional' | 'creative'
  }
  
  authConfig: {
    credentials: boolean
    google: boolean
    facebook: boolean
  }
  
  defaultTeams: {
    name: string
    color: string
    icon: string
  }[]
  
  evaluationPeriod: number // days
  defaultLicenses: number
}
```

## UI/UX Design Principles

### 1. Progressive Disclosure
- Simple signup flow with optional advanced settings
- Branding configuration can be skipped initially
- Users see only what's relevant to their role

### 2. Clear Visual Hierarchy
- Organization branding visible in header
- Role badges/indicators for admins
- Disabled features clearly marked with tooltips

### 3. Contextual Help
- Tooltips explain why features are disabled
- Welcome screens guide users based on their situation
- Empty states provide clear next steps

### 4. Consistent Patterns
- All admin panels follow same layout structure
- Modal patterns consistent across features
- Color coding for status (active, trial, inactive)

## Security Considerations

### 1. Data Isolation
- All queries filtered by organizationId
- Middleware validates user belongs to organization
- System Admin can override for support purposes

### 2. Role-Based Access Control (RBAC)
- Permissions checked at API level
- UI hides features user cannot access
- Hierarchical roles simplify permission logic

### 3. SSO Security
- NextAuth.js handles OAuth 2.0 flows securely
- JWT tokens with organization context
- Secure session storage (database or encrypted cookies)
- CSRF protection built into NextAuth.js

### 4. Invitation Security
- Unique tokens with expiration
- Email verification required
- One-time use tokens

## Migration Strategy

### Phase 1: Create Default Organization
1. Create "knowUbetter Default" organization
2. Set as FREE unlimited licenses
3. Migrate all existing users to default org
4. Preserve all user data (kudos, badges, streaks)

### Phase 2: Migrate Teams
1. Assign all existing teams to default org
2. Maintain team memberships
3. Preserve team data and leaderboards

### Phase 3: Migrate Questions
1. Mark all existing questions as "global"
2. Enable all global questions for default org
3. Maintain question statistics

### Phase 4: Assign Roles
1. Current admin → System Admin + Org Admin for default org
2. All other users → User role
3. Notify users of new multi-tenant features

## Testing Strategy

### Unit Tests
- Organization CRUD operations
- User role permission checks
- Invitation creation and validation
- SSO authentication flows
- Data isolation queries

### Integration Tests
- Complete signup flows (user and org admin)
- Invitation acceptance flow
- Organization branding application
- Cross-organization data isolation
- Role hierarchy permission inheritance

### E2E Tests
- New user signup without invitation
- New user signup with invitation
- Org admin creates organization
- Org admin invites users
- Team admin manages team
- SSO login flows

## Performance Considerations

### Database Indexing
- Index on organizationId for all multi-tenant tables
- Composite index on (organizationId, teamId) for team queries
- Index on email for invitation lookups

### Caching Strategy
- Cache organization branding per org
- Cache user roles and permissions
- Cache global questions (shared across orgs)
- Invalidate on updates

### Query Optimization
- Always include organizationId in WHERE clauses
- Use connection pooling per organization
- Lazy load team data when needed

## Open Questions / Future Decisions

1. **Billing Integration**: Which payment provider? Stripe?
2. **License Tiers**: What features are in free vs paid tiers?
3. **Organization Transfer**: Can users transfer between orgs?
4. **Data Export**: What format? CSV, JSON, API?
5. **White-Label**: Custom domains per org? Separate deployments?
6. **Analytics**: What metrics are most valuable to org admins?

## Success Metrics

### Adoption Metrics
- Number of organizations created per week
- Percentage of org admins who complete branding setup
- Average time from signup to first user invitation

### Engagement Metrics
- License utilization per organization
- Active users per organization
- Team participation rates
- Cross-team visibility usage

### Technical Metrics
- Query performance with organizationId filtering
- SSO authentication success rate
- Invitation acceptance rate
- Data isolation validation (zero cross-org leaks)
