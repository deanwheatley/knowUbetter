import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      username: a.string().required(),
      email: a.string().required(),
      displayName: a.string(),
      totalKudos: a.integer().default(0),
      propKudos: a.integer().default(0),
      weeklyPropAllowance: a.integer().default(100),
      usedPropAllowance: a.integer().default(0),
      lastAllowanceReset: a.datetime(),
      teams: a.hasMany('TeamMember', 'userId'),
      badges: a.hasMany('UserBadge', 'userId'),
      sentProps: a.hasMany('Prop', 'senderId'),
      receivedProps: a.hasMany('Prop', 'receiverId'),
      answers: a.hasMany('Answer', 'userId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ])
    .secondaryIndexes((index) => [
      index('username'),
    ]),

  Team: a
    .model({
      name: a.string().required(),
      description: a.string(),
      color: a.string(),
      totalKudos: a.integer().default(0),
      members: a.hasMany('TeamMember', 'teamId'),
      questions: a.hasMany('Question', 'teamId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('name'),
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
      teamId: a.id(),
      team: a.belongsTo('Team', 'teamId'),
      answers: a.hasMany('Answer', 'questionId'),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('Admins'),
    ])
    .secondaryIndexes((index) => [
      index('teamId'),
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