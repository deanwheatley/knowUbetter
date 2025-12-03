import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Organization: a
    .model({
      name: a.string().required(),
      createdBy: a.id().required(),
      status: a.enum(['ACTIVE', 'TRIAL', 'INACTIVE']),
      
      // Licensing
      totalLicenses: a.string().default('unlimited'), // 'unlimited' or number as string
      usedLicenses: a.integer().default(0),
      
      // Branding
      logoUrl: a.string(),
      primaryColor: a.string().default('#3B82F6'),
      secondaryColor: a.string().default('#8B5CF6'),
      
      // SSO Config
      ssoKnowUbetter: a.boolean().default(true),
      ssoGoogle: a.boolean().default(true),
      ssoFacebook: a.boolean().default(true),
      ssoEnterpriseEnabled: a.boolean().default(false),
      ssoEnterpriseProvider: a.string(),
      ssoEnterpriseConfig: a.json(),
      
      // Settings
      kudosPerQuestion: a.integer().default(10),
      weeklyQuestionLimit: a.integer().default(50),
      invitationExpirationDays: a.integer().default(30), // 0 = never expire
      
      // Metrics
      teamCount: a.integer().default(0),
      userCount: a.integer().default(0),
      activeUserCount: a.integer().default(0),
      
      // Relationships
      users: a.hasMany('User', 'organizationId'),
      teams: a.hasMany('Team', 'organizationId'),
      invitations: a.hasMany('Invitation', 'organizationId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('name'),
    ]),

  User: a
    .model({
      username: a.string().required(),
      email: a.string().required(),
      displayName: a.string(),
      
      // Organization & Teams
      organizationId: a.id().required(),
      organization: a.belongsTo('Organization', 'organizationId'),
      primaryTeamId: a.id(),
      
      // Role
      role: a.enum(['USER', 'TEAM_ADMIN', 'ORG_ADMIN', 'SYSTEM_ADMIN']),
      teamAdminFor: a.string().array(), // Array of team IDs
      
      // Profile
      avatar: a.string(),
      about: a.string(),
      authProvider: a.enum(['KNOWUBETTER', 'GOOGLE', 'FACEBOOK', 'SSO']),
      
      // Legacy fields
      totalKudos: a.integer().default(0),
      propKudos: a.integer().default(0),
      weeklyPropAllowance: a.integer().default(100),
      usedPropAllowance: a.integer().default(0),
      lastAllowanceReset: a.datetime(),
      
      // Relationships
      teams: a.hasMany('TeamMember', 'userId'),
      badges: a.hasMany('UserBadge', 'userId'),
      sentProps: a.hasMany('Prop', 'senderId'),
      receivedProps: a.hasMany('Prop', 'receiverId'),
      answers: a.hasMany('Answer', 'userId'),
      joinRequests: a.hasMany('JoinRequest', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ])
    .secondaryIndexes((index) => [
      index('username'),
      index('organizationId'),
      index('email'),
    ]),

  Team: a
    .model({
      organizationId: a.id().required(),
      organization: a.belongsTo('Organization', 'organizationId'),
      name: a.string().required(),
      description: a.string(),
      color: a.string().default('#3B82F6'),
      
      // Team Picture/Icon
      pictureUrl: a.string(),
      icon: a.string().default('👥'), // Auto-generated emoji
      
      // Team Admins
      teamAdminIds: a.string().array(), // Array of user IDs
      
      // Metadata
      createdBy: a.id().required(),
      isAdminLocked: a.boolean().default(false),
      memberCount: a.integer().default(0),
      totalKudos: a.integer().default(0),
      
      // Relationships
      members: a.hasMany('TeamMember', 'teamId'),
      questions: a.hasMany('Question', 'teamId'),
      joinRequests: a.hasMany('JoinRequest', 'teamId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('name'),
      index('organizationId'),
    ]),

  TeamMember: a
    .model({
      userId: a.id().required(),
      teamId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
      team: a.belongsTo('Team', 'teamId'),
      role: a.enum(['MEMBER', 'ADMIN', 'OWNER']),
      joinedAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ])
    .secondaryIndexes((index) => [
      index('userId'),
      index('teamId'),
    ]),

  Question: a
    .model({
      text: a.string().required(),
      category: a.enum(['PERSONAL', 'COMPANY', 'TRIVIA', 'CUSTOM']),
      difficulty: a.enum(['EASY', 'MEDIUM', 'HARD']),
      options: a.string().array().required(),
      correctAnswer: a.string().required(),
      explanation: a.string(),
      
      // Scope
      scope: a.enum(['GLOBAL', 'ORGANIZATION', 'TEAM']),
      organizationId: a.id(),
      teamId: a.id(),
      team: a.belongsTo('Team', 'teamId'),
      
      // Metadata
      createdBy: a.id().required(),
      answers: a.hasMany('Answer', 'questionId'),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('teamId'),
      index('organizationId'),
      index('scope'),
    ]),

  Invitation: a
    .model({
      organizationId: a.id().required(),
      organization: a.belongsTo('Organization', 'organizationId'),
      teamIds: a.string().array().required(),
      email: a.string().required(),
      invitedBy: a.id().required(),
      status: a.enum(['PENDING', 'ACCEPTED', 'EXPIRED']),
      expiresAt: a.datetime().required(),
      acceptedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('organizationId'),
      index('email'),
      index('status'),
    ]),

  JoinRequest: a
    .model({
      userId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
      teamId: a.id().required(),
      team: a.belongsTo('Team', 'teamId'),
      message: a.string(),
      status: a.enum(['PENDING', 'APPROVED', 'REJECTED']),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('userId'),
      index('teamId'),
      index('status'),
    ]),

  Answer: a
    .model({
      userId: a.id().required(),
      questionId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
      question: a.belongsTo('Question', 'questionId'),
      selectedAnswer: a.string().required(),
      isCorrect: a.boolean().required(),
      kudosEarned: a.integer().default(0),
      answeredAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ])
    .secondaryIndexes((index) => [
      index('userId'),
      index('questionId'),
    ]),

  Prop: a
    .model({
      senderId: a.id().required(),
      receiverId: a.id().required(),
      sender: a.belongsTo('User', 'senderId'),
      receiver: a.belongsTo('User', 'receiverId'),
      type: a.enum(['PROP', 'MAD_PROP', 'PROP_HELL_YEAH']),
      kudosAmount: a.integer().required(),
      message: a.string(),
      sentAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ])
    .secondaryIndexes((index) => [
      index('senderId'),
      index('receiverId'),
    ]),

  Badge: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      icon: a.string().required(),
      rarity: a.enum(['COMMON', 'RARE', 'EPIC', 'LEGENDARY']),
      criteria: a.string().required(),
      userBadges: a.hasMany('UserBadge', 'badgeId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ]),

  UserBadge: a
    .model({
      userId: a.id().required(),
      badgeId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
      badge: a.belongsTo('Badge', 'badgeId'),
      earnedAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ])
    .secondaryIndexes((index) => [
      index('userId'),
      index('badgeId'),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});