# User Flow Diagrams

## Overview
Mermaid diagrams showing key user flows for the multi-tenant organization system.

## Flow 1: New Organization Admin Signup

```mermaid
flowchart TD
    Start([User visits site]) --> Login[Login Page]
    Login --> CreateAccount[Click 'Create New Account']
    CreateAccount --> AccountType[Select Account Type]
    AccountType --> OrgAdmin[Select 'Organization Admin']
    
    OrgAdmin --> Step1[Step 1: Account Creation]
    Step1 --> EnterDetails[Enter email, display name, password]
    EnterDetails --> Step2[Step 2: Organization Setup]
    
    Step2 --> OrgDetails[Enter org name, first team, size]
    OrgDetails --> Step3[Step 3: Branding Setup]
    
    Step3 --> BrandingChoice{Configure branding?}
    BrandingChoice -->|Yes| UploadBranding[Upload logo, set colors, enable SSO]
    BrandingChoice -->|Skip| Welcome
    UploadBranding --> Welcome[Welcome Screen]
    
    Welcome --> Dashboard[Organization Admin Dashboard]
    Dashboard --> NextSteps{What next?}
    NextSteps --> InviteUsers[Invite team members]
    NextSteps --> ConfigQuestions[Configure questions]
    NextSteps --> Settings[Adjust settings]
```

## Flow 2: Standard User Signup (With Invitation)

```mermaid
flowchart TD
    Start([User receives invitation email]) --> ClickLink[Click invitation link]
    ClickLink --> SignupPage[Signup Page]
    
    SignupPage --> CheckEmail[System checks email]
    CheckEmail --> InviteFound{Invitation found?}
    
    InviteFound -->|Yes| ShowInvite[Display org & teams]
    InviteFound -->|No| NoInvite[Show 'no invitation' message]
    
    ShowInvite --> EnterDetails[Enter display name, password]
    NoInvite --> EnterDetails
    
    EnterDetails --> CreateAccount[Create Account]
    CreateAccount --> HasTeams{Has teams?}
    
    HasTeams -->|Yes| WelcomeTeams[Welcome screen with teams]
    HasTeams -->|No| WelcomeNoTeams[Welcome screen - waiting]
    
    WelcomeTeams --> Dashboard[User Dashboard]
    WelcomeNoTeams --> Profile[Complete profile]
    Profile --> WaitForInvite[Wait for team assignment]
```

## Flow 3: Organization Admin Invites Users

```mermaid
flowchart TD
    Start([Org Admin clicks 'Invite Users']) --> InvitePage[Invitation Page]
    InvitePage --> EnterEmails[Enter email addresses]
    EnterEmails --> SelectTeams[Select teams]
    SelectTeams --> AddMessage[Add optional message]
    AddMessage --> Submit[Click 'Send Invitations']
    
    Submit --> Process[System processes each email]
    Process --> CheckUser{User exists?}
    
    CheckUser -->|New user| SendEmail[Send invitation email]
    CheckUser -->|Existing in same org| AssignTeams[Immediately assign to teams]
    CheckUser -->|Existing in different org| ShowError[Show error]
    
    SendEmail --> ReserveLicense[Reserve license]
    AssignTeams --> SendNotification[Send in-app notification]
    
    ReserveLicense --> Summary[Results Summary]
    SendNotification --> Summary
    ShowError --> Summary
    
    Summary --> ShowResults[Display: Teams Assigned, Invitations Sent, Errors]
    ShowResults --> Done([Done])
```

## Flow 4: User Requests to Join Team

```mermaid
flowchart TD
    Start([User browses teams]) --> TeamList[View available teams]
    TeamList --> SelectTeam[Click 'Request to Join']
    SelectTeam --> Modal[Request modal opens]
    
    Modal --> AddMessage[Add optional message]
    AddMessage --> Submit[Click 'Send Request']
    
    Submit --> NotifyAdmins[Notify Org Admin & Team Admins]
    NotifyAdmins --> PendingState[Request shows as 'Pending']
    
    PendingState --> AdminReview{Admin reviews}
    AdminReview -->|Approve| AddToTeam[Add user to team]
    AdminReview -->|Deny| NotifyDenied[Notify user with reason]
    
    AddToTeam --> NotifyApproved[Notify user - approved]
    NotifyApproved --> UserDashboard[User sees new team]
    NotifyDenied --> UserCanRetry[User can request again]
```

## Flow 5: Team Admin Manages Team

```mermaid
flowchart TD
    Start([Team Admin logs in]) --> Dashboard[Team Admin Dashboard]
    Dashboard --> ViewTeams[View teams they admin]
    ViewTeams --> SelectTeam[Select team from dropdown]
    
    SelectTeam --> TeamManagement[Team Management Page]
    TeamManagement --> Actions{What action?}
    
    Actions --> InviteMembers[Invite Members]
    Actions --> ReviewRequests[Review Join Requests]
    Actions --> ManageMembers[Manage Members]
    Actions --> UpdateSettings[Update Team Settings]
    
    InviteMembers --> InviteFlow[Follow invitation flow]
    ReviewRequests --> ApproveOrDeny[Approve/Deny requests]
    ManageMembers --> RemoveOrPromote[Remove or promote members]
    UpdateSettings --> UploadPicture[Upload team picture, change color]
    
    InviteFlow --> Done([Done])
    ApproveOrDeny --> Done
    RemoveOrPromote --> Done
    UploadPicture --> Done
```

## Flow 6: System Admin Creates Organization

```mermaid
flowchart TD
    Start([System Admin logs in]) --> SysDashboard[System Admin Dashboard]
    SysDashboard --> ViewOrgs[View all organizations]
    ViewOrgs --> CreateOrg[Click 'Create Organization']
    
    CreateOrg --> Modal[Create Org Modal]
    Modal --> EnterDetails[Enter org name, licenses, admin email]
    EnterDetails --> SetStatus[Set status: Active/Trial]
    SetStatus --> Submit[Click 'Create Organization']
    
    Submit --> CreateInDB[Create organization in database]
    CreateInDB --> InitDefaults[Initialize with defaults]
    InitDefaults --> SendInvite[Send invitation to Org Admin]
    
    SendInvite --> OrgCreated[Organization created]
    OrgCreated --> AdminReceives[Org Admin receives email]
    AdminReceives --> AdminSignup[Org Admin completes signup]
    AdminSignup --> OrgReady[Organization ready to use]
```

## Flow 7: User Login with SSO

```mermaid
flowchart TD
    Start([User visits login page]) --> LoginPage[Login Page]
    LoginPage --> ChooseSSO{Choose auth method}
    
    ChooseSSO -->|Email/Password| EmailLogin[Enter credentials]
    ChooseSSO -->|Google| GoogleSSO[Click 'Continue with Google']
    ChooseSSO -->|Facebook| FacebookSSO[Click 'Continue with Facebook']
    
    GoogleSSO --> CheckEnabled{SSO enabled for org?}
    FacebookSSO --> CheckEnabled
    
    CheckEnabled -->|Yes| SSOAuth[Authenticate with provider]
    CheckEnabled -->|No| ShowDisabled[Show 'Disabled by Org Admin' tooltip]
    
    SSOAuth --> CheckAccount{Account exists?}
    CheckAccount -->|Yes| Login[Log in]
    CheckAccount -->|No| RequireDisplayName[Require display name]
    
    RequireDisplayName --> PreFill[Pre-fill from SSO provider]
    PreFill --> CreateAccount[Create account]
    CreateAccount --> CheckInvite{Has invitation?}
    
    CheckInvite -->|Yes| AssignTeams[Assign to teams]
    CheckInvite -->|No| NoTeams[No teams assigned]
    
    EmailLogin --> Login
    Login --> Dashboard[User Dashboard]
    AssignTeams --> Dashboard
    NoTeams --> WaitingScreen[Waiting for teams screen]
```

## Flow 8: Organization Admin Configures Settings

```mermaid
flowchart TD
    Start([Org Admin clicks Settings]) --> SettingsPage[Organization Settings]
    SettingsPage --> Tabs{Which tab?}
    
    Tabs --> General[General Settings]
    Tabs --> Branding[Branding]
    Tabs --> Auth[Authentication]
    Tabs --> Quiz[Quiz Settings]
    Tabs --> Invitations[Invitation Settings]
    
    General --> EditOrgInfo[Edit org name, description]
    General --> ManageAdmins[Add/remove org admins]
    
    Branding --> UploadLogo[Upload logo]
    Branding --> SetColors[Set primary/secondary colors]
    
    Auth --> ToggleSSO[Enable/disable SSO methods]
    Auth --> ConfigureProviders[Configure SSO providers]
    
    Quiz --> SetKudos[Set kudos values]
    Quiz --> SetLimits[Set weekly limits]
    Quiz --> ConfigureProps[Configure props allowances]
    
    Invitations --> SetExpiration[Set invitation expiration]
    Invitations --> DefaultMessage[Set default invitation message]
    
    EditOrgInfo --> Save[Save Changes]
    ManageAdmins --> Save
    UploadLogo --> Save
    SetColors --> Save
    ToggleSSO --> Save
    ConfigureProviders --> Save
    SetKudos --> Save
    SetLimits --> Save
    ConfigureProps --> Save
    SetExpiration --> Save
    DefaultMessage --> Save
    
    Save --> ApplyChanges[Changes applied immediately]
    ApplyChanges --> Done([Done])
```
