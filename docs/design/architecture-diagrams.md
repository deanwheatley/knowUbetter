# Architecture Diagrams

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Browser]
        Mobile[Mobile App - Future]
    end
    
    subgraph "Application Layer"
        NextJS[Next.js 14 App]
        API[API Routes]
        Auth[Authentication Service]
    end
    
    subgraph "Business Logic Layer"
        OrgService[Organization Service]
        UserService[User Service]
        TeamService[Team Service]
        InviteService[Invitation Service]
        QuizService[Quiz Service]
        PropsService[Props Service]
    end
    
    subgraph "Data Layer"
        DynamoDB[(DynamoDB)]
        S3[S3 Storage<br/>Logos & Avatars]
        Cache[Redis Cache<br/>Sessions & Branding]
    end
    
    subgraph "External Services"
        NextAuth[NextAuth.js<br/>Session Management]
        GoogleSSO[Google OAuth]
        FacebookSSO[Facebook OAuth]
        Email[Email Service<br/>SES]
    end
    
    Web --> NextJS
    Mobile -.-> NextJS
    NextJS --> API
    API --> NextAuth
    
    NextAuth --> GoogleSSO
    NextAuth --> FacebookSSO
    NextAuth --> DynamoDB
    
    API --> OrgService
    API --> UserService
    API --> TeamService
    API --> InviteService
    API --> QuizService
    API --> PropsService
    
    OrgService --> DynamoDB
    UserService --> DynamoDB
    TeamService --> DynamoDB
    InviteService --> DynamoDB
    QuizService --> DynamoDB
    PropsService --> DynamoDB
    
    OrgService --> S3
    UserService --> S3
    TeamService --> S3
    
    OrgService --> Cache
    UserService --> Cache
    
    InviteService --> Email
```

## Multi-Tenant Data Isolation

```mermaid
graph LR
    subgraph "Organization A"
        OrgA[Org: Acme Corp]
        TeamA1[Team: Engineering]
        TeamA2[Team: Sales]
        UserA1[User: Alice]
        UserA2[User: Bob]
        
        OrgA --> TeamA1
        OrgA --> TeamA2
        TeamA1 --> UserA1
        TeamA1 --> UserA2
        TeamA2 --> UserA2
    end
    
    subgraph "Organization B"
        OrgB[Org: TechStart]
        TeamB1[Team: Product]
        TeamB2[Team: Design]
        UserB1[User: Carol]
        UserB2[User: Dave]
        
        OrgB --> TeamB1
        OrgB --> TeamB2
        TeamB1 --> UserB1
        TeamB2 --> UserB2
    end
    
    subgraph "Global Resources"
        GlobalQ[Global Questions]
        SysAdmin[System Admin]
    end
    
    GlobalQ -.-> OrgA
    GlobalQ -.-> OrgB
    SysAdmin -.-> OrgA
    SysAdmin -.-> OrgB
    
    style OrgA fill:#e3f2fd
    style OrgB fill:#fff3e0
    style GlobalQ fill:#f3e5f5
```

## Role Hierarchy & Permissions

```mermaid
graph TD
    SysAdmin[System Admin<br/>Internal Operations]
    OrgAdmin[Organization Admin<br/>Manages Organization]
    TeamAdmin[Team Admin<br/>Manages Teams]
    User[User<br/>Participates in Quizzes]
    
    SysAdmin -->|Can do everything| OrgAdmin
    OrgAdmin -->|Can do everything| TeamAdmin
    TeamAdmin -->|Can do everything| User
    
    SysAdmin -.->|Permissions| SysPerms[• Create organizations<br/>• Manage all orgs<br/>• Global questions<br/>• System settings<br/>• Cross-org analytics]
    
    OrgAdmin -.->|Permissions| OrgPerms[• Create teams<br/>• Invite users<br/>• Manage licenses<br/>• Configure branding<br/>• Org settings<br/>• Approve questions]
    
    TeamAdmin -.->|Permissions| TeamPerms[• Invite to assigned teams<br/>• Manage team members<br/>• Update team picture<br/>• Review join requests]
    
    User -.->|Permissions| UserPerms[• Answer quizzes<br/>• Send props<br/>• Submit questions<br/>• Request to join teams<br/>• View profiles]
    
    style SysAdmin fill:#f44336,color:#fff
    style OrgAdmin fill:#ff9800,color:#fff
    style TeamAdmin fill:#2196f3,color:#fff
    style User fill:#4caf50,color:#fff
```

## Database Schema (Entity Relationship)

```mermaid
erDiagram
    ORGANIZATION ||--o{ TEAM : contains
    ORGANIZATION ||--o{ USER : has
    ORGANIZATION ||--o{ INVITATION : sends
    ORGANIZATION ||--o{ QUESTION : owns
    
    TEAM ||--o{ USER : has_members
    TEAM ||--o{ TEAM_ADMIN : has_admins
    TEAM ||--o{ JOIN_REQUEST : receives
    
    USER ||--o{ INVITATION : receives
    USER ||--o{ JOIN_REQUEST : makes
    USER ||--o{ ANSWER : submits
    USER ||--o{ PROP_TRANSACTION : sends
    USER ||--o{ PROP_TRANSACTION : receives
    USER ||--o{ BADGE : earns
    
    QUESTION ||--o{ ANSWER : has
    
    ORGANIZATION {
        string id PK
        string name
        int totalLicenses
        int usedLicenses
        json branding
        json ssoConfig
        json settings
        timestamp createdAt
    }
    
    TEAM {
        string id PK
        string organizationId FK
        string name
        string color
        string pictureUrl
        string icon
        array teamAdminIds
        int memberCount
        timestamp createdAt
    }
    
    USER {
        string id PK
        string organizationId FK
        string email
        string displayName
        string avatar
        string role
        array teamIds
        array teamAdminFor
        int totalKudos
        timestamp createdAt
    }
    
    INVITATION {
        string id PK
        string organizationId FK
        array teamIds
        string email
        string invitedBy FK
        string status
        timestamp expiresAt
        timestamp createdAt
    }
    
    QUESTION {
        string id PK
        string scope
        string organizationId FK
        string teamId FK
        string content
        array options
        string correctAnswer
        timestamp createdAt
    }
    
    JOIN_REQUEST {
        string id PK
        string userId FK
        string teamId FK
        string message
        string status
        timestamp createdAt
    }
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant NA as NextAuth.js
    participant SSO as SSO Provider
    participant DB as Database
    
    U->>C: Click Login
    C->>U: Show login options
    
    alt Email/Password
        U->>C: Enter credentials
        C->>NA: Authenticate
        NA->>DB: Verify credentials
        DB-->>NA: User data
        NA-->>C: Session cookie
    else Google SSO
        U->>C: Click Google
        C->>NA: Initiate Google OAuth
        NA->>SSO: Redirect to Google
        SSO->>U: Google login
        U->>SSO: Authenticate
        SSO-->>NA: OAuth token
        NA->>DB: Find/create user
        DB-->>NA: User data
        NA-->>C: Session cookie
    else Facebook SSO
        U->>C: Click Facebook
        C->>NA: Initiate Facebook OAuth
        NA->>SSO: Redirect to Facebook
        SSO->>U: Facebook login
        U->>SSO: Authenticate
        SSO-->>NA: OAuth token
        NA->>DB: Find/create user
        DB-->>NA: User data
        NA-->>C: Session cookie
    end
    
    C->>U: Redirect to dashboard
```

## Invitation Processing Flow

```mermaid
sequenceDiagram
    participant OA as Org Admin
    participant API as API
    participant IS as Invitation Service
    participant US as User Service
    participant ES as Email Service
    participant DB as Database
    
    OA->>API: Submit invitation list
    API->>IS: Process invitations
    
    loop For each email
        IS->>US: Check if user exists
        US->>DB: Query user by email
        DB-->>US: User data or null
        
        alt User exists in same org
            US-->>IS: Existing user
            IS->>DB: Add user to teams
            IS->>US: Send in-app notification
            IS->>IS: Add to "Teams Assigned" list
        else User is new
            US-->>IS: No user found
            IS->>DB: Create invitation
            IS->>DB: Reserve license
            IS->>ES: Send invitation email
            IS->>IS: Add to "Invitations Sent" list
        else User in different org
            US-->>IS: User in other org
            IS->>IS: Add to "Errors" list
        end
    end
    
    IS-->>API: Results summary
    API-->>OA: Display results
```

## Team Join Request Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant API as API
    participant TS as Team Service
    participant NS as Notification Service
    participant DB as Database
    
    U->>C: Browse teams
    C->>API: Get available teams
    API->>TS: Get teams for org
    TS->>DB: Query teams
    DB-->>TS: Team list
    TS-->>API: Teams (excluding user's teams)
    API-->>C: Available teams
    C->>U: Display teams
    
    U->>C: Click "Request to Join"
    C->>U: Show request modal
    U->>C: Enter message, submit
    C->>API: Create join request
    API->>TS: Process request
    TS->>DB: Create join request
    TS->>NS: Notify org admins
    TS->>NS: Notify team admins
    NS->>DB: Create notifications
    TS-->>API: Request created
    API-->>C: Success
    C->>U: Show "Request Pending"
    
    Note over U,DB: Admin reviews request
    
    alt Request Approved
        TS->>DB: Add user to team
        TS->>NS: Notify user (approved)
        TS->>DB: Update request status
    else Request Denied
        TS->>NS: Notify user (denied with reason)
        TS->>DB: Update request status
    end
```

## Caching Strategy

```mermaid
graph TB
    Request[API Request] --> CheckCache{Check Cache}
    
    CheckCache -->|Hit| ReturnCached[Return Cached Data]
    CheckCache -->|Miss| QueryDB[Query Database]
    
    QueryDB --> ProcessData[Process Data]
    ProcessData --> UpdateCache[Update Cache]
    UpdateCache --> ReturnData[Return Data]
    
    subgraph "Cached Data"
        OrgBranding[Organization Branding<br/>TTL: 1 hour]
        UserSessions[User Sessions<br/>TTL: 24 hours]
        TeamData[Team Data<br/>TTL: 15 minutes]
        GlobalQuestions[Global Questions<br/>TTL: 1 hour]
    end
    
    subgraph "Cache Invalidation"
        OrgUpdate[Org Settings Updated] --> InvalidateOrg[Invalidate Org Cache]
        TeamUpdate[Team Updated] --> InvalidateTeam[Invalidate Team Cache]
        UserUpdate[User Updated] --> InvalidateUser[Invalidate User Cache]
    end
    
    UpdateCache -.-> OrgBranding
    UpdateCache -.-> UserSessions
    UpdateCache -.-> TeamData
    UpdateCache -.-> GlobalQuestions
```
