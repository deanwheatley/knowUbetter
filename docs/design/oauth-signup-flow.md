# OAuth Signup Flow Design

## Overview
Flexible OAuth authentication flow supporting Google (and future Facebook) sign-in with three distinct user paths:
1. Invited users joining existing organizations
2. Non-invited users creating accounts
3. Organization admins creating new organizations

## User Flows

### Flow 1: Invited User via OAuth

```
User clicks "Continue with Google" on login page
    ↓
Google OAuth consent screen
    ↓
NextAuth callback receives OAuth data
    ↓
Check if user exists in database
    ↓
User NOT found → New OAuth user
    ↓
Store OAuth info in session storage:
  - oauthEmail
  - oauthName (from Google profile)
  - oauthProvider ('google')
    ↓
Redirect to /auth/signup/oauth-complete
    ↓
Check for pending invitation by email
    ↓
INVITATION FOUND
    ↓
Display invitation notification:
  "You've been invited to join [Organization Name]"
    ↓
Pre-fill display name from Google
User confirms or edits display name
    ↓
Submit form → POST /api/auth/oauth-signup
    ↓
Create user record:
  - email: from OAuth
  - displayName: from form
  - organizationId: from invitation
  - role: 'USER'
  - authProvider: 'GOOGLE'
    ↓
Accept invitation (assign to teams)
    ↓
Clear session storage
    ↓
Redirect to /auth/welcome
    ↓
Welcome screen shows teams joined
```

### Flow 2: Non-Invited User via OAuth

```
User clicks "Continue with Google" on login page
    ↓
Google OAuth consent screen
    ↓
NextAuth callback receives OAuth data
    ↓
Check if user exists in database
    ↓
User NOT found → New OAuth user
    ↓
Store OAuth info in session storage
    ↓
Redirect to /auth/signup/oauth-complete
    ↓
Check for pending invitation by email
    ↓
NO INVITATION FOUND
    ↓
Show account type selection:
  [ ] Standard User
  [ ] Organization Admin
    ↓
User selects "Standard User"
    ↓
Pre-fill display name from Google
User confirms or edits display name
    ↓
Submit form → POST /api/auth/oauth-signup
    ↓
Create user record WITHOUT organization:
  - email: from OAuth
  - displayName: from form
  - organizationId: null (or placeholder)
  - role: 'USER'
  - authProvider: 'GOOGLE'
    ↓
Clear session storage
    ↓
Redirect to /auth/welcome?noTeam=true
    ↓
Welcome screen shows:
  "Waiting for invitation"
  "You can request to join teams once invited"
```

### Flow 3: Organization Admin via OAuth

```
User clicks "Continue with Google" on login page
    ↓
Google OAuth consent screen
    ↓
NextAuth callback receives OAuth data
    ↓
Check if user exists in database
    ↓
User NOT found → New OAuth user
    ↓
Store OAuth info in session storage
    ↓
Redirect to /auth/signup/oauth-complete
    ↓
Check for pending invitation by email
    ↓
NO INVITATION FOUND (or user ignores invitation)
    ↓
Show account type selection:
  [ ] Standard User
  [ ] Organization Admin
    ↓
User selects "Organization Admin"
    ↓
Pre-fill display name from Google
User confirms or edits display name
    ↓
Store display name in session storage
    ↓
Redirect to /auth/signup/org-admin/quick-setup
    ↓
TurboTax-style 3-step wizard:
  Step 1: What kind of organization?
  Step 2: How is it structured?
  Step 3: What to do first?
    ↓
Store setup choices in session storage
    ↓
Create organization with smart defaults
    ↓
Create user record:
  - email: from OAuth
  - displayName: from session
  - organizationId: newly created
  - role: 'ORG_ADMIN'
  - authProvider: 'GOOGLE'
    ↓
Create first team based on structure choice
    ↓
Clear session storage
    ↓
Redirect based on first action:
  - invite → Team invitation page
  - questions → Question management
  - customize → Organization settings
  - start → Dashboard
```

## Technical Implementation

### Session Storage Keys
- `oauthEmail`: User's email from OAuth provider
- `oauthName`: User's name from OAuth provider
- `oauthProvider`: OAuth provider name ('google', 'facebook')
- `signupDisplayName`: Display name for org admin signup
- `quickSetup`: JSON object with quick setup choices

### API Endpoints

#### GET /api/auth/check-invitation
**Purpose:** Check if email has pending invitation

**Query Parameters:**
- `email`: User's email address

**Response:**
```json
{
  "hasInvitation": true,
  "organizationId": "org-123",
  "organizationName": "Acme Corp",
  "teamIds": ["team-1", "team-2"],
  "invitationId": "inv-456"
}
```

#### POST /api/auth/oauth-signup
**Purpose:** Create user account from OAuth signup

**Request Body:**
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "provider": "google",
  "invitationId": "inv-456" // optional
}
```

**Response:**
```json
{
  "success": true,
  "userId": "user-789"
}
```

### NextAuth Integration

#### JWT Callback
- For Google OAuth, checks if user exists in database
- If user exists, loads organization context into token
- If user doesn't exist, sets `needsInvitation: true` flag

#### Session Callback
- Adds organization context to session:
  - userId
  - organizationId
  - role
  - teamIds
  - teamAdminFor

#### Sign In Callback
- Allows all OAuth sign-ins (validation happens in app)
- Stores OAuth provider info for later processing

## UI Components

### OAuth Completion Page
**Location:** `/auth/signup/oauth-complete`

**Features:**
- Automatic invitation detection
- Invitation notification banner
- Display name input (pre-filled from OAuth)
- Account type selection (if no invitation)
- PlayShares dark theme styling

**States:**
- Loading: Checking for invitation
- With Invitation: Shows org name, hides account type selection
- Without Invitation: Shows account type selection
- Error: Shows error message

### Callback Page
**Location:** `/auth/callback`

**Features:**
- Loading spinner during OAuth processing
- Detects new vs existing users
- Stores OAuth data in session storage
- Redirects appropriately

## Security Considerations

1. **Session Storage:** OAuth data stored client-side temporarily
   - Cleared after account creation
   - Not sensitive (email/name already from OAuth)

2. **Server-Side Validation:** All account creation happens server-side
   - Validates invitation exists
   - Checks for duplicate users
   - Enforces organization constraints

3. **NextAuth Security:** OAuth flow handled by NextAuth.js
   - Secure token management
   - CSRF protection
   - Session encryption

## Future Enhancements

1. **Facebook OAuth:** Same flow, different provider
2. **Enterprise SSO:** Okta, Azure AD, SAML 2.0
3. **Email Verification:** Optional for OAuth users
4. **Profile Picture:** Auto-import from OAuth provider
5. **Account Linking:** Link OAuth to existing email/password account

## Testing Checklist

- [ ] Invited user can sign up with Google
- [ ] Non-invited user can create account with Google
- [ ] Org admin can create organization with Google
- [ ] Invitation detection works correctly
- [ ] Display name pre-fills from Google profile
- [ ] Session storage clears after signup
- [ ] Error handling for failed API calls
- [ ] Redirect logic works for all flows
- [ ] UI matches PlayShares dark theme
- [ ] Mobile responsive design
