export interface User {
  id: string
  username: string
  email: string
  totalKudos: number
  propKudos: number
  badges: Badge[]
  propsRemaining: {
    prop: number
    madProp: number
    propHellYeah: number
  }
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