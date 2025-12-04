# knowUbetter - Requirements Summary

## Project Overview
A quiz-based social game where users answer questions, earn kudos, and give props to each other. Features team-based "Know You" questions for personal connection and engagement.

## Core Mechanics

### Quiz System
- Multiple choice questions (4 options: A, B, C, D)
- Timed answers (2 seconds per word default)
- Weekly limit: 20 questions
- Pass system: 5 passes/week (doesn't count toward limit)
- Difficulty display based on success rate
- 24-hour cooldown on failed questions
- Rubber band mechanic for struggling users (invisible)
- +10 kudos per correct answer

### "Know You" Questions (NEW)
- Freeform personal questions
- Users answer, system generates team quiz questions
- User selects 2 wrong answers (system suggests from other users)
- +1 kudos per answer
- Unlimited by default
- Auto-approved, no admin review
- Users can edit answers later
- 50 default questions per new team

### Teams (NEW)
- Users can be on multiple teams
- Created by users or admin
- Team-scoped People category questions
- Team leaderboards
- Team colors, icons, names

### Props System
- 3 bundle types: prop (10), mad-prop (50), prop-hell-yeah (100)
- Weekly allowance: 5/2/1 (configurable)
- Props roll over indefinitely
- Required reason text
- All props public (shown in notifications)
- Props history on public profile

### Kudos Economy
- Total kudos = quiz kudos + prop kudos + streak bonuses + question rewards
- Separate tracking for quiz vs prop kudos
- Correctness rate tracked per user
- Multiple leaderboards: overall, weekly, props, categories, teams

### Streaks
- **Correct Answer Streak**: Consecutive correct answers
  - Rewards: 5→+10, 10→+25, 20→+50, 50→+100 kudos
- **Login Streak**: Consecutive workdays logged in
  - Rewards: 5→+20, 10→+50, 20→+100, 30→+200 kudos
- Longest streak shown on profile with 🔥 badge

### Badges
- 4 rarities: Common, Rare, Epic, Legendary
- No kudos rewards for badges
- Some hidden/discoverable
- Dynamic badges (e.g., "Most Propped Up")
- Visible on dashboard and public profile
- Celebration animations when earned

### Question Submission
- Any user can submit
- Admin approval required (or auto-approve)
- Auto-reject duplicates (80% similarity)
- Admin can edit during approval
- Rewards: +20 kudos base, bonuses for popularity

### Leaderboards
- Weekly (resets Monday)
- All-time
- Hall of Fame
- Props leaderboard
- Category leaderboards
- Team leaderboards
- Paginated by 10 users
- User's rank always visible

### Weekly Reset
- Every Monday at midnight PST (configurable)
- Resets: question limit, pass limit, props allowance
- End-of-week reminders
- Weekly recap cutscene on next login (skippable)

### Notification Scroller
- Static feed on dashboard
- Shows: winners, props, badges, milestones, streaks, team updates
- 20 recent notifications

### Public Profile Page
- Total kudos breakdown
- Current rank
- Correctness rate
- Badges earned
- Streaks (current and longest)
- Questions by category
- Props history with reasons
- Recent activity
- Member since date

### Admin Panel
- Question approval queue (approve/reject/edit)
- User management
- Configuration panel (all settings)
- Analytics dashboard
- Category management
- Team management
- Bulk operations
- Audit log

## Categories
1. **Product** - Blue ⚙️ (global)
2. **People** - Purple 👥 (team-scoped)
3. **Lore** - Orange 📚 (global)
4. **Industry** - Green 🌐 (global)

Admin can add/remove/rename categories.

## Key Features

### Rubber Band Mechanic
- Triggers after 10 consecutive wrong answers
- Gradually serves easier questions over next 15 questions
- Invisible to users
- Configurable in admin

### Question Timing
- Based on word count (2 seconds per word)
- Countdown timer displayed
- Min 5 seconds, max 60 seconds

### Difficulty Display
- Easy: 70%+ correct rate (Green 🟢)
- Medium: 40-69% (Yellow 🟡)
- Hard: <40% (Red 🔴)
- Requires 10+ answers before calculated

### Pass System
- 5 passes per week default
- Doesn't count toward question limit
- Question returns to pool
- No penalty or cooldown

### Props Rollover
- Unused props never expire
- Accumulate indefinitely
- No maximum cap

### Weekly Recap
- 5 screens: Overview, Kudos, Social, Achievements, Leaderboard
- Shows: questions answered, correctness, rank change, kudos earned, props sent/received, badges, streaks, passes left
- Skippable
- Shown on first login after week ends

## Future Features
- 🔮 Slack integration

## Technical Notes
- All settings configurable in admin panel
- Static notification refresh (on page load)
- Timezone: PST default, configurable
- Pagination: 10 items per page
- Cache duration: 5 minutes
- Question pool size: 100 questions

## Data Tracking
- User answer history (correct/incorrect, time spent)
- Props transactions (sender, receiver, amount, message)
- Streak events (type, count, kudos awarded)
- Badge awards (badge ID, earned date)
- Weekly recaps (archived per user per week)
- Admin audit log (all admin actions)

## User Roles
- **User**: Standard access (quiz, props, question submission)
- **Admin**: Full access (approval queue, config, user management, analytics)

## Authentication
- Required for all users
- Email/password based
- Session management
- Profile settings (edit teams, view Know You answers)

## Design Aesthetic
- Video game inspired (8-bit retro + modern polish)
- Bright, energetic colors
- Celebration animations (Peggle 2 style)
- Progress bars with XP-style animations
- Badge rarity colors (gray, blue, purple, gold)
- Particle effects for achievements

## Navigation
- Tab-based: Home, Quiz, Question Builder, Props, Leaderboards, Admin (admin only)
- Dashboard: Stats card, quick actions, notification scroller, leaderboard preview
- Responsive design (mobile/desktop)

## Success Metrics
- User engagement (questions answered per week)
- Props activity (props sent/received)
- Question contribution (submissions, approvals)
- Streak maintenance (login streaks, correct answer streaks)
- Team participation (team questions answered)
- Badge collection (badges earned per user)
