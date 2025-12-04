export interface Organization {
  id: string
  name: string
  createdAt: Date
  createdBy: string // User ID of Org Admin
  status: 'active' | 'trial' | 'inactive'
  
  // Licensing
  totalLicenses: number | 'unlimited'
  usedLicenses: number
  availableLicenses: number
  
  // Branding
  branding: {
    logoUrl?: string
    primaryColor: string // hex
    secondaryColor: string // hex
  }
  
  // Authentication
  ssoConfig: {
    knowUbetter: boolean // always true
    google: boolean
    facebook: boolean
    enterpriseSSO?: {
      enabled: boolean
      provider: 'okta' | 'azure' | 'saml'
      config: Record<string, unknown>
    }
  }
  
  // Settings (inherits from system defaults)
  settings: {
    kudosPerQuestion: number
    weeklyQuestionLimit: number
    invitationExpirationDays: number | null // null = never expire
    // ... all quiz settings
  }
  
  // Metrics
  teamCount: number
  userCount: number
  activeUserCount: number
}

export interface User {
  id: string
  email: string
  displayName: string
  password?: string // null if SSO only
  
  // Organization & Teams
  organizationId: string
  teamIds: string[]
  primaryTeamId?: string
  
  // Role
  role: 'user' | 'teamAdmin' | 'orgAdmin' | 'systemAdmin'
  teamAdminFor: string[] // Team IDs where user is team admin
  
  // Profile
  avatar: string // URL or auto-generated
  about?: string
  
  // Legacy fields (keeping for backward compatibility)
  username: string // deprecated - use displayName
  totalKudos: number
  propKudos: number
  badges: Badge[]
  propsRemaining: {
    prop: number
    madProp: number
    propHellYeah: number
  }
  
  // Metadata
  createdAt: Date
  lastActiveAt: Date
  authProvider: 'knowubetter' | 'google' | 'facebook' | 'sso'
}

export interface Question {
  id: string
  content: string
  category: QuestionCategory
  difficulty: 'easy' | 'medium' | 'hard'
  options?: string[]
  correctAnswer: string
  createdBy: string
  kudosReward: number
  
  // Scope
  scope: 'global' | 'organization' | 'team'
  organizationId?: string // if org or team scoped
  teamId?: string // if team scoped
}

export interface QuestionCategory {
  id: string
  name: string
  description: string
  color: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface PropBundle {
  type: 'prop' | 'madProp' | 'propHellYeah'
  kudosAmount: number
  cost: number
}

export interface Team {
  id: string
  organizationId: string
  name: string
  color: string
  
  // Team Picture/Icon
  pictureUrl?: string // Custom uploaded picture
  icon: string // Auto-generated icon (emoji) used if no picture
  
  description?: string
  
  // Team Admins (multiple allowed)
  teamAdminIds: string[] // Array of user IDs who are team admins
  
  // Metadata
  createdBy: string
  isAdminLocked: boolean
  memberCount: number
  totalKudos: number
  createdAt: Date
}

export interface Invitation {
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

export interface JoinRequest {
  id: string
  userId: string
  teamId: string
  message?: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

export interface PropTransaction {
  id: string
  fromUserId: string
  toUserId: string
  bundleType: PropBundle['type']
  kudosAmount: number
  message?: string
  timestamp: Date
}

export interface LeaderboardEntry {
  userId: string
  username: string
  score: number
  rank: number
  badges: Badge[]
}

// Organization Templates for Quick Setup
export type OrganizationType = 'company' | 'startup' | 'school' | 'nonprofit' | 'team'
export type TeamStructure = 'departments' | 'projects' | 'classes' | 'single' | 'custom'
export type FirstAction = 'invite' | 'questions' | 'customize' | 'start'

export interface OrganizationTemplate {
  type: OrganizationType
  branding: {
    primaryColor: string
    secondaryColor: string
    theme: string
  }
  authConfig: {
    google: boolean
    facebook: boolean
    credentials: boolean
  }
  evaluation: {
    period: number // days
    licenses: number
  }
  defaultTeams?: Array<{
    name: string
    color: string
    icon: string
  }>
}

export interface QuickSetupAnswers {
  organizationType: OrganizationType
  teamStructure: TeamStructure
  firstAction: FirstAction
  organizationName: string
  userEmail: string
  userDisplayName: string
}