# Teams System

## Overview
Users belong to teams for team-scoped questions and leaderboards. Enables personal connection through "Know You" questions.

## Team Features

### Team Creation
- **Admin-created teams**: Pre-defined by admin with name, color, icon
- **User-created teams**: Any user can create a team
- Teams have:
  - Name (required, unique)
  - Color (hex code)
  - Icon/emoji
  - Description (optional)
  - Created date
  - Creator (user or admin)

### Team Membership
- Users select team(s) during signup
- Users can be on **multiple teams**
- Users can change teams in profile settings
- Users can join/leave teams (unless admin-locked)
- Team membership visible on public profile

### Team-Scoped Content

#### People Category Questions
- **Only visible to team members**
- "What is Alice's favorite color?" only shown to Alice's teammates
- If user is on multiple teams, sees People questions from all their teams
- "Know You" questions automatically scoped to user's team(s)

#### Other Categories (Global)
- Product, Lore, Industry questions are **global** (all users see them)
- Admin can optionally make categories team-scoped in future

### Team Leaderboards
- Each team has its own leaderboard
- Shows only team members' rankings
- Same structure as global leaderboards:
  - Weekly team leaderboard
  - All-time team leaderboard
  - Team prop kudos leaderboard
  - Team category leaderboards
- Accessible from main Leaderboards tab (filter by team)

### New Team Initialization
When a new team is created:
1. Team gets 50 default "Know You" questions (see know-you-questions.md)
2. Team members can immediately start answering
3. As members answer, team-specific quiz questions are generated
4. Team leaderboards start empty

## Team Management (Admin)

### Admin Panel Features
- View all teams
- Create/edit/delete teams
- Set team colors and icons
- Lock teams (prevent users from leaving)
- Merge teams
- View team statistics:
  - Member count
  - Questions answered
  - Props exchanged within team
  - Engagement metrics

### Team Analytics
- Most active teams
- Team growth over time
- Team engagement comparison
- Team question contribution

## User Experience

### Signup Flow
1. User creates account
2. User selects team(s) from dropdown (or creates new team)
3. User sees welcome message with team info
4. User can immediately start answering "Know You" questions

### Profile Settings
- "My Teams" section
- Add/remove teams
- Set primary team (for display purposes)
- Create new team button

### Quiz Flow
- Questions randomly selected from:
  - Global categories (Product, Lore, Industry)
  - Team-scoped People questions (from all user's teams)
  - "Know You" questions (from all user's teams)
- Question card shows team badge if team-scoped

### Notification Scroller
- Team-specific notifications:
  - "Bob joined your team!"
  - "Your team is #1 this week!"
  - "New 'Know You' question answered by Alice"

## Data Structure

### Team Object
```json
{
  "id": "team-001",
  "name": "Engineering",
  "color": "#3B82F6",
  "icon": "⚙️",
  "description": "Engineering team",
  "createdBy": "admin-001",
  "createdAt": "2024-01-01T00:00:00Z",
  "isAdminLocked": false,
  "memberCount": 15
}
```

### User Team Membership
```json
{
  "userId": "user-001",
  "teams": ["team-001", "team-003"],
  "primaryTeam": "team-001"
}
```

### Team-Scoped Question
```json
{
  "id": "q-123",
  "content": "What is Alice's favorite color?",
  "category": "People",
  "teamId": "team-001",
  "isTeamScoped": true,
  "options": ["Blue", "Red", "Green"],
  "correctAnswer": "Blue",
  "createdBy": "system",
  "sourceKnowYouQuestionId": "ky-456"
}
```

## Future Enhancements
- Team challenges (compete against other teams)
- Team-specific badges
- Team chat/messaging
- Team events and milestones
- Cross-team competitions
