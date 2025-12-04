import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // ===== ORGANIZATION MODELS =====
  Organization: a
    .model({
      name: a.string().required(),
      totalLicenses: a.integer().required().default(20),
      usedLicenses: a.integer().required().default(0),
      evaluationPeriodDays: a.integer().default(30),
      evaluationStartDate: a.datetime(),
      branding: a.customType({
        logoUrl: a.string(),
        primaryColor: a.string(),
        secondaryColor: a.string(),
      }),
      ssoConfig: a.customType({
        knowUbetter: a.boolean().default(true),
        google: a.boolean().default(false),
        facebook: a.boolean().default(false),
      }),
      settings: a.json(),
      createdAt: a.datetime(),
      createdBy: a.string(),
      
      // Relationships
      users: a.hasMany('User', 'organizationId'),
      teams: a.hasMany('Team', 'organizationId'),
      invitations: a.hasMany('Invitation', 'organizationId'),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.groups(['SystemAdmins', 'OrgAdmins']),
    ]),

  Invitation: a
    .model({
      organizationId: a.id().required(),
      teamIds: a.string().array(),
      email: a.string().required(),
      invitedBy: a.id().required(),
      status: a.enum(['pending', 'accepted', 'expired', 'cancelled']),
      expiresAt: a.datetime(),
      createdAt: a.datetime(),
      
      // Relationships
      organization: a.belongsTo('Organization', 'organizationId'),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.groups(['OrgAdmins', 'TeamAdmins']),
    ]),

  JoinRequest: a
    .model({
      userId: a.id().required(),
      teamId: a.id().required(),
      message: a.string(),
      status: a.enum(['pending', 'approved', 'denied']),
      createdAt: a.datetime(),
      
      // Relationships
      user: a.belongsTo('User', 'userId'),
      team: a.belongsTo('Team', 'teamId'),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.owner(),
    ]),

  // ===== USER MODELS =====
  User: a
    .model({
      username: a.string().required(),
      email: a.string().required(),
      displayName: a.string(),
      organizationId: a.id(),
      role: a.enum(['user', 'teamAdmin', 'orgAdmin', 'systemAdmin']),
      teamAdminFor: a.string().array(),
      totalKudos: a.integer().default(0),
      propKudos: a.integer().default(0),
      weeklyPropAllowance: a.integer().default(100),
      usedPropAllowance: a.integer().default(0),
      lastAllowanceReset: a.datetime(),
      
      // Relationships
      organization: a.belongsTo('Organization', 'organizationId'),
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
    ]),

  // ===== TEAM MODELS =====
  Team: a
    .model({
      name: a.string().required(),
      description: a.string(),
      color: a.string(),
      organizationId: a.id(),
      pictureUrl: a.string(),
      teamAdminIds: a.string().array(),
      totalKudos: a.integer().default(0),
      
      // Relationships
      organization: a.belongsTo('Organization', 'organizationId'),
      members: a.hasMany('TeamMember', 'teamId'),
      questions: a.hasMany('Question', 'teamId'),
      joinRequests: a.hasMany('JoinRequest', 'teamId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.groups(['Admins', 'OrgAdmins']),
    ]),

  TeamMember: a
    .model({
      userId: a.id().required(),
      teamId: a.id().required(),
      role: a.enum(['MEMBER', 'ADMIN', 'OWNER']),
      joinedAt: a.datetime().required(),
      
      // Relationships
      user: a.belongsTo('User', 'userId'),
      team: a.belongsTo('Team', 'teamId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  // ===== QUESTION MODELS =====
  Question: a
    .model({
      text: a.string().required(),
      category: a.enum(['PERSONAL', 'COMPANY', 'TRIVIA', 'CUSTOM']),
      difficulty: a.enum(['EASY', 'MEDIUM', 'HARD']),
      options: a.string().array().required(),
      correctAnswer: a.string().required(),
      explanation: a.string(),
      scope: a.enum(['global', 'organization', 'team']),
      organizationId: a.id(),
      teamId: a.id(),
      isActive: a.boolean().default(true),
      
      // Relationships
      team: a.belongsTo('Team', 'teamId'),
      answers: a.hasMany('Answer', 'questionId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.groups(['Admins', 'OrgAdmins']),
    ]),

  Answer: a
    .model({
      userId: a.id().required(),
      questionId: a.id().required(),
      selectedAnswer: a.string().required(),
      isCorrect: a.boolean().required(),
      kudosEarned: a.integer().default(0),
      answeredAt: a.datetime().required(),
      
      // Relationships
      user: a.belongsTo('User', 'userId'),
      question: a.belongsTo('Question', 'questionId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  // ===== PROP MODELS =====
  Prop: a
    .model({
      senderId: a.id().required(),
      receiverId: a.id().required(),
      type: a.enum(['PROP', 'MAD_PROP', 'PROP_HELL_YEAH']),
      kudosAmount: a.integer().required(),
      message: a.string(),
      sentAt: a.datetime().required(),
      
      // Relationships
      sender: a.belongsTo('User', 'senderId'),
      receiver: a.belongsTo('User', 'receiverId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  // ===== BADGE MODELS =====
  Badge: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      icon: a.string().required(),
      rarity: a.enum(['COMMON', 'RARE', 'EPIC', 'LEGENDARY']),
      criteria: a.string().required(),
      
      // Relationships
      userBadges: a.hasMany('UserBadge', 'badgeId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.groups(['Admins']),
    ]),

  UserBadge: a
    .model({
      userId: a.id().required(),
      badgeId: a.id().required(),
      earnedAt: a.datetime().required(),
      
      // Relationships
      user: a.belongsTo('User', 'userId'),
      badge: a.belongsTo('Badge', 'badgeId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
