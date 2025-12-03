# AWS Setup Guide for knowUbetter

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Node.js 18+ installed
4. Amplify CLI installed globally: `npm install -g @aws-amplify/cli`

## Step 1: Configure Amplify CLI

```bash
amplify configure
```

This will:
- Open AWS Console to create IAM user
- Create user with `AdministratorAccess-Amplify` policy
- Download access keys
- Configure local AWS profile

## Step 2: Initialize Amplify Project

```bash
cd knowUbetter
amplify init
```

Configuration:
- Project name: `knowubetter`
- Environment: `dev`
- Default editor: Your preferred editor
- App type: `javascript`
- Framework: `react`
- Source directory: `src`
- Distribution directory: `out` (for Next.js static export)
- Build command: `npm run build`
- Start command: `npm run dev`

## Step 3: Add Authentication (Cognito)

```bash
amplify add auth
```

Configuration:
- Default configuration with username
- Enable MFA: No (for simplicity)
- Email verification: Yes
- Attributes: email, name, preferred_username

## Step 4: Add GraphQL API with DynamoDB

```bash
amplify add api
```

Configuration:
- GraphQL
- API name: `knowubetter`
- Authorization: Amazon Cognito User Pool
- Additional auth types: API Key (for public access)
- Conflict resolution: Auto Merge
- Schema template: Single object with fields

## Step 5: Define GraphQL Schema

Replace the generated schema with:

```graphql
type User @model @auth(rules: [
  { allow: owner }
  { allow: private, operations: [read] }
]) {
  id: ID!
  username: String! @index(name: "byUsername")
  email: String!
  displayName: String
  totalKudos: Int! @default(value: "0")
  propKudos: Int! @default(value: "0")
  weeklyPropAllowance: Int! @default(value: "100")
  usedPropAllowance: Int! @default(value: "0")
  lastAllowanceReset: AWSDateTime
  teams: [TeamMember] @hasMany(indexName: "byUser", fields: ["id"])
  badges: [UserBadge] @hasMany(indexName: "byUser", fields: ["id"])
  sentProps: [Prop] @hasMany(indexName: "bySender", fields: ["id"])
  receivedProps: [Prop] @hasMany(indexName: "byReceiver", fields: ["id"])
  answers: [Answer] @hasMany(indexName: "byUser", fields: ["id"])
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Team @model @auth(rules: [
  { allow: private, operations: [read] }
  { allow: groups, groups: ["Admins"] }
]) {
  id: ID!
  name: String! @index(name: "byName")
  description: String
  color: String
  totalKudos: Int! @default(value: "0")
  members: [TeamMember] @hasMany(indexName: "byTeam", fields: ["id"])
  questions: [Question] @hasMany(indexName: "byTeam", fields: ["id"])
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type TeamMember @model @auth(rules: [
  { allow: owner }
  { allow: private, operations: [read] }
]) {
  id: ID!
  userId: ID! @index(name: "byUser")
  teamId: ID! @index(name: "byTeam")
  user: User @belongsTo(fields: ["userId"])
  team: Team @belongsTo(fields: ["teamId"])
  role: TeamRole! @default(value: "MEMBER")
  joinedAt: AWSDateTime!
}

type Question @model @auth(rules: [
  { allow: private, operations: [read] }
  { allow: groups, groups: ["Admins"] }
]) {
  id: ID!
  text: String!
  category: QuestionCategory!
  difficulty: Difficulty! @default(value: "MEDIUM")
  options: [String!]!
  correctAnswer: String!
  explanation: String
  teamId: ID @index(name: "byTeam")
  team: Team @belongsTo(fields: ["teamId"])
  answers: [Answer] @hasMany(indexName: "byQuestion", fields: ["id"])
  isActive: Boolean! @default(value: "true")
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Answer @model @auth(rules: [
  { allow: owner }
  { allow: private, operations: [read] }
]) {
  id: ID!
  userId: ID! @index(name: "byUser")
  questionId: ID! @index(name: "byQuestion")
  user: User @belongsTo(fields: ["userId"])
  question: Question @belongsTo(fields: ["questionId"])
  selectedAnswer: String!
  isCorrect: Boolean!
  kudosEarned: Int! @default(value: "0")
  answeredAt: AWSDateTime!
}

type Prop @model @auth(rules: [
  { allow: owner }
  { allow: private, operations: [read] }
]) {
  id: ID!
  senderId: ID! @index(name: "bySender")
  receiverId: ID! @index(name: "byReceiver")
  sender: User @belongsTo(fields: ["senderId"])
  receiver: User @belongsTo(fields: ["receiverId"])
  type: PropType!
  kudosAmount: Int!
  message: String
  sentAt: AWSDateTime!
}

type Badge @model @auth(rules: [
  { allow: private, operations: [read] }
  { allow: groups, groups: ["Admins"] }
]) {
  id: ID!
  name: String!
  description: String!
  icon: String!
  rarity: BadgeRarity!
  criteria: String!
  userBadges: [UserBadge] @hasMany(indexName: "byBadge", fields: ["id"])
}

type UserBadge @model @auth(rules: [
  { allow: owner }
  { allow: private, operations: [read] }
]) {
  id: ID!
  userId: ID! @index(name: "byUser")
  badgeId: ID! @index(name: "byBadge")
  user: User @belongsTo(fields: ["userId"])
  badge: Badge @belongsTo(fields: ["badgeId"])
  earnedAt: AWSDateTime!
}

enum TeamRole {
  MEMBER
  ADMIN
  OWNER
}

enum QuestionCategory {
  PERSONAL
  COMPANY
  TRIVIA
  CUSTOM
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

enum PropType {
  PROP
  MAD_PROP
  PROP_HELL_YEAH
}

enum BadgeRarity {
  COMMON
  RARE
  EPIC
  LEGENDARY
}
```

## Step 6: Add Hosting

```bash
amplify add hosting
```

Configuration:
- Hosting with Amplify Console
- Manual deployment

## Step 7: Deploy Backend

```bash
amplify push
```

This will:
- Create CloudFormation stack
- Deploy DynamoDB tables
- Set up AppSync GraphQL API
- Configure Cognito User Pool
- Generate AWS configuration files

## Step 8: Configure Frontend

Install Amplify libraries:

```bash
npm install aws-amplify @aws-amplify/ui-react
```

Create `src/lib/amplify.ts`:

```typescript
import { Amplify } from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);
```

## Step 9: Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID=your_client_id
NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT=your_graphql_endpoint
NEXT_PUBLIC_AWS_APPSYNC_REGION=us-east-1
NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE=AMAZON_COGNITO_USER_POOLS
```

## Step 10: Deploy Frontend

```bash
amplify publish
```

## Additional Configuration

### DynamoDB Indexes
The schema automatically creates these indexes:
- `byUsername` on User table
- `byUser` for user relationships
- `byTeam` for team relationships
- `byQuestion` for question relationships

### Cognito Groups
Create admin group:

```bash
aws cognito-idp create-group \
  --group-name Admins \
  --user-pool-id YOUR_USER_POOL_ID \
  --description "Organization administrators"
```

### API Keys
For public access (leaderboards, etc.):
- API key is auto-generated
- Valid for 365 days by default
- Regenerate before expiry

## Monitoring & Costs

### Free Tier Limits
- DynamoDB: 25GB storage, 25 RCU/WCU
- Cognito: 50,000 MAUs
- AppSync: 250,000 requests/month
- Amplify Hosting: 1000 build minutes, 15GB served

### Cost Optimization
- Use DynamoDB on-demand billing for variable workloads
- Enable CloudWatch monitoring for usage tracking
- Set up billing alerts

## Troubleshooting

### Common Issues
1. **Schema conflicts**: Run `amplify codegen` after schema changes
2. **Auth errors**: Check Cognito user pool configuration
3. **CORS issues**: Configure API Gateway properly
4. **Build failures**: Check Node.js version compatibility

### Useful Commands
```bash
amplify status          # Check current status
amplify console         # Open AWS console
amplify delete          # Delete entire backend
amplify env list        # List environments
amplify env checkout    # Switch environments
```

## Next Steps

1. Set up CI/CD pipeline
2. Configure custom domain
3. Add monitoring and logging
4. Set up backup strategies
5. Implement security best practices