# knowUbetter - Core Requirements

## Overview
A quiz-based social game where users answer questions, earn kudos, and give props to each other. Features team-based "Know You" questions for personal connection.

## Core Features

### 1. Quiz System
- Users answer questions across categories (Product, People, Lore, Industry)
- All questions are multiple choice with exactly 3 options
- Questions are randomly selected from approved pool
- Users cannot receive same question twice if answered correctly
- Failed questions have 24-hour cooldown before re-appearing
- All correct answers earn same kudos amount (default: 10 kudos, admin configurable)
- Weekly question limit per user (default: 20 questions, admin configurable)
- **Timed answers**: Based on word count (default: 2 seconds per word, admin configurable)
- **Pass system**: Users can skip questions without penalty (default: 5 passes/week, admin configurable)
- **Difficulty display**: Questions show difficulty based on success rate (Easy 70%+, Medium 40-69%, Hard <40%)
- **Rubber band mechanic**: After 10 consecutive wrong answers, gradually serve easier questions (configurable in admin)

### 2. "Know You" Questions - NEW
- Freeform questions about user preferences and personality
- Users answer with text, system auto-generates quiz questions for their team
- User selects 2 wrong answers (system suggests from other users' answers)
- Answering gives +1 kudos immediately
- Auto-approved, no admin review needed
- Unlimited by default (configurable in admin)
- Users can edit their answers later (updates quiz question)
- Mixed into quiz flow based on category distribution settings
- New teams get 50 default "Know You" questions

### 3. Teams
- Users select team(s) on signup (can change in profile)
- Users can be on multiple teams
- Teams can be created by users or admin
- Teams have names, colors, icons
- **Hybrid question scoping**:
  - People category: Defaults to team-scoped (see questions about teammates)
  - Other categories: Default to global, but can be team-assigned by admins
  - Multi-team users see People questions from all their teams
  - Questions show team context when relevant
- Team-specific leaderboards

### 4. Kudos Economy
- **Total Kudos**: Quiz earnings + prop kudos received + streak bonuses + question approval bonuses
- **Prop Kudos**: Kudos received from other users (separate tracking)
- Currency for leaderboard rankings
- **Correctness metric**: Tracked per user, visible on dashboard and public profile

### 5. Props System
- **prop**: 10 kudos bundle (5/week default)
- **mad-prop**: 50 kudos bundle (2/week default)
- **prop-hell-yeah**: 100 kudos bundle (1/week default)
- Weekly allowance configurable in admin
- **Props roll over indefinitely** (no expiration)
- **Required reason text** when giving props
- **All props are public** (shown in notification scroller and props history)
- Props history stored and viewable on public profile (Props Tab)
- End-of-week reminders to use props

### 6. Leaderboards
- **Weekly leaderboard** (resets every Monday, PST timezone configurable)
- **All-time leaderboard**
- **Hall of Fame** for all-time records
- Prop kudos leaderboard
- Category-specific leaderboards
- Team-specific leaderboards
- Paginated by 10 users per page
- User's own rank always visible (highlighted)

### 7. Badge System
- Achievement rewards for various accomplishments
- Rarity levels: Common, Rare, Epic, Legendary
- **No kudos rewards** for earning badges
- Visible on user dashboard and public profile
- Some badges are hidden/discoverable
- Negative badges allowed (must be fun, not humiliating)
- **Dynamic badges**: "Most Propped Up" for current prop leader
- Visual celebrations when earned

### 8. Streaks
- **Correct Answer Streak**: Consecutive correctly answered questions
- **Login Streak**: Consecutive workdays logged in
- Longest streak shown on profile with fire badge 🔥 + number
- **Streak kudos rewards** (configurable in admin):
  - Correct Answer: 5→+10, 10→+25, 20→+50, 50→+100 kudos
  - Login: 5→+20, 10→+50, 20→+100, 30→+200 kudos
- No streak freeze mechanic

### 9. Notification Scroller
- Static feed on dashboard (refreshes on page load)
- Shows: Weekly/category winners, props given, badge awards, milestones, new questions approved, streaks
- Example: "Alice sent mad-prop 🔥 to Bob: 'Great presentation!'"

### 10. Public Profile Page
- Total kudos (quiz/prop breakdown)
- Current rank on leaderboards
- Questions answered by category
- Current streaks (both types)
- Member since date
- Recent activity
- Badges (including hidden ones earned)
- Correctness metric
- Props history with reasons (Props Tab)

### 11. Weekly Recap Cutscene
- Shown on next login after week ends (skippable)
- Screen 1: Overview (questions answered, correctness, rank, passes left)
- Screen 2: Kudos breakdown
- Screen 3: Social (props sent/received)
- Screen 4: Achievements (badges, categories, streaks)
- Screen 5: Leaderboard position

### 12. Question Submission & Approval
- Any user can submit questions
- Admin approval required (or auto-approve configurable)
- Users cannot edit after submission
- Admin can edit during approval
- **Auto-reject duplicates** (system checks similarity)
- Rejection requires reason/feedback
- Notifications via notification scroller
- **Kudos rewards for approved questions**:
  - Standard approval: +20 kudos
  - 10+ answers: +5 bonus
  - 50+ answers: +10 bonus
  - 100% correct rate: +15 bonus

### 13. Direct Messaging
- **Team-scoped messaging**: Users can message teammates only
- **Async messaging**: No real-time requirements, message history preserved
- **Activity integration**: Quick message buttons in quiz results, props, profile updates
- **Message templates**: Pre-written messages for common scenarios
- **Custom messages**: Free-form text for deeper conversations
- **Notification system**: Unread message indicators and notifications
- **Message center**: Accessible from main navigation
- **Enhances core activities**: Messaging tied to quiz activities, not general chat

### 14. Admin Panel
- Question approval queue (approve/reject/edit, bulk operations)
- User management (view stats, ban, reset)
- Configuration panel (all settings)
- Analytics dashboard (engagement, difficulty, category balance)
- Category management (add/remove/rename, set icons/colors)
- Team management
- Audit log
- **Quick Setup Templates**: TurboTax-style organization setup with smart defaults

## Future Features
- 🔮 Slack integration
- 🔮 Real-time messaging (currently async)
- 🔮 Cross-organization messaging (currently team-scoped)
- 🔮 Message reactions and threading

## Resolved Requirements
1. ✅ Question creation: Any user can submit, admin approval required
2. ✅ Props per week: 5 props, 2 mad-props, 1 prop-hell-yeah (roll over indefinitely)
3. ✅ Categories: Product, People, Lore, Industry (admin can add/remove)
4. ✅ Authentication: Required for all users
5. ✅ Question format: Multiple choice with exactly 3 options
6. ✅ Question selection: Random, no repeats for correctly answered questions
7. ✅ Weekly limits: 20 questions, 5 passes (admin configurable)
8. ✅ Kudos value: 10 kudos per question (admin configurable)
9. ✅ Teams: Multi-team support, team-scoped People questions
10. ✅ "Know You" questions: Freeform personal questions that generate team quiz questions
11. ✅ Timed answers: 2 seconds per word default
12. ✅ Rubber band mechanic: Helps struggling users
13. ✅ Streaks: Two types with kudos rewards
14. ✅ Weekly recap: Animated cutscene on login