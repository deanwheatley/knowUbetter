import { getServerSession } from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authService } from './services/authService'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Use authService to authenticate with AWS Cognito
          const session = await authService.signInWithEmail(
            credentials.email,
            credentials.password
          )

          if (session) {
            return {
              id: session.userId,
              email: session.email,
              name: session.email, // Will be updated from database
              organizationId: session.organizationId,
              role: session.role,
              teamIds: session.teamIds,
              teamAdminFor: session.teamAdminFor,
            }
          }

          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token
        token.userId = user.id
        token.organizationId = user.organizationId
        token.role = user.role
        token.teamIds = user.teamIds
        token.teamAdminFor = user.teamAdminFor
      }

      // For Google OAuth, we need to handle user creation/lookup
      if (account?.provider === 'google' && profile?.email) {
        try {
          // Import userService directly to avoid Amplify calls
          const { userService } = await import('./services/userService')
          const existingUser = await userService.getByEmail(profile.email)
          
          if (existingUser) {
            const userData = existingUser as any
            token.userId = userData.id
            token.organizationId = userData.organizationId
            token.role = userData.role
            token.teamIds = userData.teams?.map((t: any) => t.teamId) || []
            token.teamAdminFor = userData.teamAdminFor || []
          } else {
            // User doesn't exist - they need to be invited first
            token.needsInvitation = true
          }
        } catch (error) {
          console.error('Error looking up user:', error)
        }
      }

      return token
    },
    async session({ session, token }: any) {
      // Add custom fields to session
      if (token) {
        session.user.id = token.userId
        session.user.organizationId = token.organizationId
        session.user.role = token.role
        session.user.teamIds = token.teamIds
        session.user.teamAdminFor = token.teamAdminFor
      }

      return session
    },
    async signIn({ user, account, profile }: any) {
      // For OAuth providers (Google), allow sign in
      // User creation/invitation checking will happen in the app after sign in
      if (account?.provider === 'google') {
        // Store OAuth info in user object for later processing
        user.isOAuth = true
        user.provider = 'google'
        return true
      }

      // For credentials provider, sign in is already validated
      return true
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
}

export const getSession = () => getServerSession(authOptions)