# knowUbetter

A quiz-based social game where users answer questions, earn kudos, and give props to each other.

## Features

- **Quiz System**: Answer questions across different categories (personal, company, trivia)
- **Kudos Economy**: Earn kudos from correct answers and receiving props
- **Props System**: Send kudos bundles (prop, mad-prop, prop-hell-yeah) to other users
- **Leaderboards**: Multiple leaderboards for total kudos, prop kudos, and categories
- **Badges**: Achievement system with different rarities
- **Social Features**: Weekly prop allowances, gifting system

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: AWS Amplify with AppSync (GraphQL)
- **Database**: DynamoDB
- **Authentication**: AWS Cognito
- **Hosting**: AWS Amplify

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your AWS Amplify configuration
```

3. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
├── lib/                # Utility functions and configurations
└── types/              # TypeScript type definitions

amplify/                # AWS Amplify backend configuration
```

## Core Concepts

### Kudos Economy
- **Total Kudos**: Earned from quiz answers + prop kudos received
- **Prop Kudos**: Kudos received from other users via props
- Separate leaderboards for each type

### Props System
- **prop**: 10 kudos bundle
- **mad-prop**: 50 kudos bundle  
- **prop-hell-yeah**: 100 kudos bundle
- Weekly allowance refreshes every Monday

### Question Categories
- Personal questions about users
- Company/team knowledge
- General trivia
- Custom categories

## Development

To add new features:

1. Define types in `src/types/index.ts`
2. Create components in `src/components/`
3. Add pages in `src/app/`
4. Update Amplify schema for backend changes