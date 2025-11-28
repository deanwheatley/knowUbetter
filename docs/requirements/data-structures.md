# Data Structures

## User Object
```json
{
  "id": "user-001",
  "username": "alice",
  "email": "alice@example.com",
  "password": "hashed_password",
  "role": "user",
  "teams": ["team-001", "team-003"],
  "primaryTeam": "team-001",
  "totalKudos": 450,
  "propKudos": 150,
  "quizKudos": 300,
  "correctnessRate": 85.5,
  "questionsAnsweredCorrectly": ["q-001", "q-002", "q-005"],
  "questionsAnsweredIncorrectly": ["q-003", "q-004"],
  "questionsFailed": {
    "q-003": "2024-01-15T10:00:00Z",
    "q-004": "2024-01-16T14:30:00Z"
  },
  "questionsPassed": ["q-010", "q-011"],
  "weeklyQuestionsUsed": 12,
  "weeklyPassesUsed": 2,
  "weeklyResetDate": "2024-01-22",
  "propsRemaining": {\n    \"prop\": 4,\n    \"madProp\": 2,\n    \"propHellYeah\": 1\n  },\n  \"badges\": [\n    {\n      \"id\": \"first-steps\",\n      \"earnedAt\": \"2024-01-10T10:00:00Z\"\n    },\n    {\n      \"id\": \"quiz-master\",\n      \"earnedAt\": \"2024-01-15T14:30:00Z\"\n    }\n  ],\n  \"streaks\": {\n    \"currentCorrectAnswers\": 5,\n    \"longestCorrectAnswers\": 15,\n    \"currentLoginDays\": 7,\n    \"longestLoginDays\": 20,\n    \"lastLoginDate\": \"2024-01-20\"\n  },\n  \"knowYouAnswers\": [\n    {\n      \"questionId\": \"ky-001\",\n      \"answer\": \"Blue\",\n      \"wrongOptions\": [\"Red\", \"Green\"],\n      \"answeredAt\": \"2024-01-10T10:00:00Z\",\n      \"generatedQuizQuestionId\": \"q-100\"\n    }\n  ],\n  \"consecutiveWrongCount\": 0,\n  \"rubberBandActive\": false,\n  \"createdAt\": \"2024-01-01T00:00:00Z\",\n  \"lastSeenAt\": \"2024-01-20T15:30:00Z\",\n  \"weeklyRecapShown\": \"2024-01-15\"\n}\n```

## Quiz Question Object
```json
{\n  \"id\": \"q-001\",\n  \"content\": \"What is the primary programming language used in this project?\",\n  \"category\": \"product\",\n  \"options\": [\"JavaScript\", \"Python\", \"TypeScript\"],\n  \"correctAnswer\": \"TypeScript\",\n  \"createdBy\": \"user-001\",\n  \"status\": \"approved\",\n  \"teamId\": null,\n  \"isTeamScoped\": false,\n  \"wordCount\": 10,\n  \"timeLimit\": 20,\n  \"timesAnswered\": 45,\n  \"timesCorrect\": 38,\n  \"timesIncorrect\": 7,\n  \"correctRate\": 84.4,\n  \"difficulty\": \"easy\",\n  \"createdAt\": \"2024-01-01T00:00:00Z\",\n  \"approvedAt\": \"2024-01-02T10:00:00Z\",\n  \"approvedBy\": \"admin-001\"\n}\n```

## \"Know You\" Question Object
```json
{\n  \"id\": \"ky-001\",\n  \"content\": \"What is your favorite color?\",\n  \"category\": \"personal-preferences\",\n  \"isDefault\": true,\n  \"teamId\": \"team-001\",\n  \"timesAnswered\": 15,\n  \"createdAt\": \"2024-01-01T00:00:00Z\"\n}\n```

## Generated Quiz Question from \"Know You\"
```json
{\n  \"id\": \"q-100\",\n  \"content\": \"What is Alice's favorite color?\",\n  \"category\": \"people\",\n  \"options\": [\"Blue\", \"Red\", \"Green\"],\n  \"correctAnswer\": \"Blue\",\n  \"createdBy\": \"system\",\n  \"status\": \"approved\",\n  \"teamId\": \"team-001\",\n  \"isTeamScoped\": true,\n  \"sourceUserId\": \"user-001\",\n  \"sourceKnowYouQuestionId\": \"ky-001\",\n  \"isKnowYouGenerated\": true,\n  \"wordCount\": 6,\n  \"timeLimit\": 12,\n  \"timesAnswered\": 8,\n  \"timesCorrect\": 6,\n  \"timesIncorrect\": 2,\n  \"correctRate\": 75.0,\n  \"difficulty\": \"easy\",\n  \"createdAt\": \"2024-01-10T10:00:00Z\",\n  \"approvedAt\": \"2024-01-10T10:00:00Z\"\n}\n```

## Team Object
```json
{\n  \"id\": \"team-001\",\n  \"name\": \"Engineering\",\n  \"color\": \"#3B82F6\",\n  \"icon\": \"⚙️\",\n  \"description\": \"Engineering team\",\n  \"createdBy\": \"admin-001\",\n  \"isAdminLocked\": false,\n  \"memberCount\": 15,\n  \"totalKudos\": 5420,\n  \"createdAt\": \"2024-01-01T00:00:00Z\"\n}\n```

## Prop Transaction Object
```json
{\n  \"id\": \"prop-001\",\n  \"fromUserId\": \"user-001\",\n  \"toUserId\": \"user-002\",\n  \"bundleType\": \"madProp\",\n  \"kudosAmount\": 50,\n  \"message\": \"Great presentation on the new feature!\",\n  \"isPublic\": true,\n  \"timestamp\": \"2024-01-15T14:30:00Z\"\n}\n```

## Badge Definition Object
```json
{\n  \"id\": \"quiz-master\",\n  \"name\": \"Quiz Master\",\n  \"description\": \"Answered 10 questions correctly\",\n  \"icon\": \"🎓\",\n  \"rarity\": \"rare\",\n  \"isHidden\": false,\n  \"isDynamic\": false,\n  \"trigger\": {\n    \"type\": \"correctAnswers\",\n    \"threshold\": 10\n  },\n  \"color\": \"#3B82F6\"\n}\n```

## Leaderboard Entry Object
```json
{\n  \"userId\": \"user-001\",\n  \"username\": \"alice\",\n  \"rank\": 5,\n  \"score\": 450,\n  \"change\": 2,\n  \"badges\": [\"quiz-master\", \"streak-champion\"],\n  \"teamId\": \"team-001\",\n  \"teamName\": \"Engineering\"\n}\n```

## Notification Object
```json
{\n  \"id\": \"notif-001\",\n  \"type\": \"propGiven\",\n  \"content\": \"Alice sent mad-prop 🔥 to Bob: 'Great presentation!'\",\n  \"userId\": \"user-002\",\n  \"isGlobal\": true,\n  \"timestamp\": \"2024-01-15T14:30:00Z\",\n  \"read\": false\n}\n```

## Weekly Recap Object
```json
{\n  \"userId\": \"user-001\",\n  \"weekStart\": \"2024-01-15\",\n  \"weekEnd\": \"2024-01-21\",\n  \"questionsAnswered\": 18,\n  \"questionsCorrect\": 15,\n  \"correctnessRate\": 83.3,\n  \"rank\": 5,\n  \"rankChange\": 2,\n  \"quizKudosEarned\": 150,\n  \"propKudosReceived\": 60,\n  \"totalKudosEarned\": 210,\n  \"propsSent\": 4,\n  \"propsReceived\": 2,\n  \"badgesEarned\": [\"streak-champion\"],\n  \"categoryBreakdown\": {\n    \"product\": 5,\n    \"people\": 4,\n    \"lore\": 6,\n    \"industry\": 3\n  },\n  \"streaks\": {\n    \"correctAnswers\": 8,\n    \"loginDays\": 5\n  },\n  \"passesUsed\": 2\n}\n```

## Question Submission Object
```json
{\n  \"id\": \"sub-001\",\n  \"content\": \"What year was the company founded?\",\n  \"category\": \"lore\",\n  \"options\": [\"2018\", \"2019\", \"2020\"],\n  \"correctAnswer\": \"2019\",\n  \"submittedBy\": \"user-001\",\n  \"status\": \"pending\",\n  \"submittedAt\": \"2024-01-15T10:00:00Z\",\n  \"reviewedBy\": null,\n  \"reviewedAt\": null,\n  \"rejectionReason\": null,\n  \"isDuplicate\": false,\n  \"similarityScore\": 0\n}\n```

## User Answer History Object
```json
{\n  \"id\": \"ans-001\",\n  \"userId\": \"user-001\",\n  \"questionId\": \"q-001\",\n  \"selectedAnswer\": \"TypeScript\",\n  \"isCorrect\": true,\n  \"timeSpent\": 8,\n  \"kudosEarned\": 10,\n  \"timestamp\": \"2024-01-15T10:00:00Z\"\n}\n```

## Category Object
```json
{\n  \"id\": \"product\",\n  \"name\": \"Product\",\n  \"color\": \"#3B82F6\",\n  \"icon\": \"⚙️\",\n  \"isTeamScoped\": false,\n  \"questionCount\": 45,\n  \"isActive\": true,\n  \"createdBy\": \"admin-001\",\n  \"createdAt\": \"2024-01-01T00:00:00Z\"\n}\n```

## Streak Event Object
```json
{\n  \"id\": \"streak-001\",\n  \"userId\": \"user-001\",\n  \"type\": \"correctAnswer\",\n  \"count\": 10,\n  \"kudosAwarded\": 25,\n  \"timestamp\": \"2024-01-15T14:30:00Z\"\n}\n```

## Admin Audit Log Object
```json
{\n  \"id\": \"audit-001\",\n  \"adminId\": \"admin-001\",\n  \"action\": \"approveQuestion\",\n  \"targetType\": \"question\",\n  \"targetId\": \"q-001\",\n  \"details\": {\n    \"previousStatus\": \"pending\",\n    \"newStatus\": \"approved\"\n  },\n  \"timestamp\": \"2024-01-15T10:00:00Z\"\n}\n```
