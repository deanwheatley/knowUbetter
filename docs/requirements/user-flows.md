# User Flows

## 1. New User Signup & Onboarding

### Flow
1. User visits site, clicks "Sign Up"
2. User enters: username, email, password
3. User selects or creates team(s)
4. User sees welcome message with team info
5. User redirected to Dashboard
6. Dashboard shows:
   - Empty stats (0 kudos, no rank yet)
   - Quick action buttons
   - Empty notification scroller
   - "Get Started" prompt to take first quiz

### First Quiz Experience
1. User clicks "Take Quiz"
2. System presents first question (could be "Know You" or regular quiz)
3. User answers correctly
4. Celebration animation: "🎉 Correct! +10 kudos"
5. Badge earned popup: "First Steps" badge
6. User sees updated stats: 10 kudos, rank appears
7. Prompt to continue or return to dashboard

---

## 2. Taking a Quiz

### Regular Quiz Question Flow
1. User clicks "Take Quiz" from dashboard
2. System randomly selects question based on:
   - User hasn't answered correctly before
   - Not in 24-hour cooldown (if previously failed)
   - Not passed in this session
   - Category distribution settings
   - Rubber band status (if applicable)
3. Question card displays:
   - Category badge
   - Difficulty indicator (🟢🟡🔴)
   - Question text
   - 4 multiple choice options (A, B, C, D)
   - Countdown timer (based on word count)
   - Pass button (shows passes remaining)
   - Questions remaining this week (e.g., "12/20")
4. User selects answer or passes
5. If answered:
   - Correct: Green flash, "+10 kudos", celebration
   - Incorrect: Red flash, "Correct answer: X", 24-hour cooldown starts
6. System checks for streak bonuses, badge triggers
7. Next question loads automatically (or return to dashboard)

### "Know You" Question Flow
1. User sees "Know You" question card (different styling)
2. Question: "What is your favorite color?"
3. User types freeform answer: "Blue"
4. System shows: "Now select 2 wrong answers"
5. System suggests options from other users' answers (if available)
6. User selects or types 2 wrong answers: "Red", "Green"
7. User submits
8. "+1 kudos" awarded immediately
9. System generates quiz question for team:
   - "What is [User]'s favorite color?"
   - Options: ["Blue", "Red", "Green"]
10. Notification: "Your answer created a new team question!"
11. Next question loads

### Pass Flow
1. User clicks "Pass" button
2. Confirmation: "Use 1 pass? (4 remaining this week)"
3. User confirms
4. Question returns to pool (can appear again)
5. Pass counter decrements
6. Next question loads immediately
7. No kudos penalty, no cooldown

### Rubber Band Activation (Invisible)
1. User answers 10 questions wrong in a row
2. System silently activates rubber band
3. Next 15 questions weighted toward easier questions
4. User doesn't see any indication
5. After 15 questions, back to normal random selection

---

## 3. Sending Props

### Flow
1. User clicks "Send Props" from dashboard
2. Props Giver page loads
3. User sees:
   - Props remaining: 4 props, 2 mad-props, 1 prop-hell-yeah
   - User search/selection dropdown
4. User selects recipient: "Bob"
5. User selects prop bundle: "mad-prop 🔥 (50 kudos)"
6. User enters required message: "Great presentation on the new feature!"
7. User clicks "Send Props 🎁"
8. Confirmation animation
9. Props deducted from allowance
10. Recipient gets +50 prop kudos
11. Notification appears in scroller: "Alice sent mad-prop 🔥 to Bob: 'Great presentation!'"
12. Transaction saved to props history

---

## 4. Viewing Leaderboards

### Flow
1. User clicks "Leaderboards" tab
2. Default view: Overall leaderboard (all-time)
3. User sees:
   - Top 10 users (paginated)
   - Own rank highlighted (e.g., "#15 You")
   - Filters: Weekly, All-Time, Props, Categories, Teams
4. User clicks "Weekly"
5. Weekly leaderboard loads (resets every Monday)
6. User clicks "Team: Engineering"
7. Team-specific leaderboard loads
8. User clicks on another user's name
9. Public profile page opens

---

## 5. Viewing Public Profile

### Flow
1. User clicks on another user's name (from leaderboard, notification, etc.)
2. Public profile page loads with tabs:
   - **Overview** (default)
   - **Badges**
   - **Props**
   - **Activity**
3. Overview tab shows:
   - Username, team(s), member since
   - Total kudos (quiz/prop breakdown)
   - Current rank
   - Correctness rate
   - Current streaks (🔥 with numbers)
   - Questions answered by category (bar chart)
4. Badges tab shows:
   - All earned badges (sorted by rarity)
   - Badge earned dates
   - Hidden badges only if earned
5. Props tab shows:
   - Props received history
   - Each prop with: sender, amount, message, date
   - Sorted by most recent
6. Activity tab shows:
   - Recent questions answered
   - Recent props sent/received
   - Recent badges earned

---

## 6. Submitting a Question

### Flow
1. User clicks "Question Builder" tab
2. Form displays:
   - Category dropdown (Product, People, Lore, Industry)
   - Question text input
   - 3 option inputs
   - Correct answer selection (radio buttons)
3. User fills out form:
   - Category: "Lore"
   - Question: "What year was the company founded?"
   - Options: "2018", "2019", "2020"
   - Correct: "2019"
4. User clicks "Submit Question"
5. Validation checks:
   - All fields filled
   - 3 unique options
   - Correct answer selected
   - Duplicate detection (80% similarity threshold)
6. If duplicate detected:
   - Error: "Similar question already exists: [question]"
   - User can edit or cancel
7. If valid:
   - Success message: "Question submitted for approval!"
   - Question enters admin approval queue
   - User notified when approved/rejected

---

## 7. Weekly Reset & Recap

### Sunday Night (Before Reset)
1. User logs in
2. Notification scroller shows: "⏰ 12 hours until weekly reset! Use your remaining props!"
3. User sees props remaining: 2 props, 1 mad-prop
4. User sends props before reset

### Monday Morning (After Reset)
1. User logs in
2. Weekly recap cutscene triggers (if enabled)
3. **Screen 1: Overview**
   - "Week of Jan 15-21"
   - Questions: 18/20
   - Correctness: 83%
   - Rank: #5 (↑2)
   - Passes left: 3/5
4. **Screen 2: Kudos**
   - Quiz kudos: +150
   - Prop kudos: +60
   - Streak bonuses: +25
   - Total: +235 kudos
5. **Screen 3: Social**
   - Props sent: 4
   - Props received: 2
   - Most generous to: Bob
6. **Screen 4: Achievements**
   - Badges earned: Streak Champion 🔥
   - Category performance: Lore (6), Product (5)
   - Streaks: 8 correct, 5 day login
7. **Screen 5: Leaderboard**
   - Overall rank: #5
   - Category ranks: Lore #3, Product #7
   - "You're 50 kudos away from #4!"
8. User clicks "Continue" or "Skip"
9. Dashboard loads with reset stats:
   - Questions: 0/20 this week
   - Passes: 5/5
   - Props: 5 props, 2 mad-props, 1 prop-hell-yeah (refreshed)

---

## 8. Admin Approval Queue

### Flow
1. Admin logs in
2. Admin clicks "Admin Panel" tab
3. Approval queue shows pending questions:
   - Question text
   - Category
   - Options
   - Submitted by
   - Submitted date
   - Similarity score (if duplicate detected)
4. Admin reviews question
5. Admin can:
   - **Approve**: Question goes live, user gets +20 kudos, notification sent
   - **Edit**: Admin modifies question text/options, then approves
   - **Reject**: Admin enters rejection reason, user notified
6. Admin clicks "Approve"
7. Question status changes to "approved"
8. Notification scroller: "New question approved in Lore category!"
9. Question enters quiz pool

---

## 9. Editing "Know You" Answer

### Flow
1. User goes to Profile Settings
2. User clicks "My Know You Answers"
3. List shows all answered "Know You" questions:
   - Question: "What is your favorite color?"
   - Your answer: "Blue"
   - Wrong options: "Red", "Green"
   - Times answered by teammates: 8
4. User clicks "Edit"
5. User changes answer to "Purple"
6. User updates wrong options: "Yellow", "Orange"
7. User clicks "Save"
8. System updates generated quiz question:
   - "What is Alice's favorite color?"
   - New options: ["Purple", "Yellow", "Orange"]
   - New correct answer: "Purple"
9. Teammates who already answered see updated question on next attempt
10. Confirmation: "Your answer has been updated!"

---

## 10. Streak Tracking

### Correct Answer Streak
1. User answers question correctly
2. Streak counter increments: 5 → 6
3. No visual indication yet
4. User answers 4 more correctly
5. Streak reaches 10
6. Popup: "🔥 10 Correct Streak! +25 kudos"
7. Streak badge updates on profile
8. User answers next question incorrectly
9. Streak resets to 0
10. Longest streak remains: 10

### Login Streak
1. User logs in Monday
2. Login streak: 1 day
3. User logs in Tuesday, Wednesday, Thursday, Friday
4. Login streak: 5 days
5. Popup: "🔥 5 Day Streak! +20 kudos"
6. User doesn't log in Saturday/Sunday (weekends don't count)
7. User logs in Monday
8. Login streak: 6 days (continues)
9. User misses Tuesday
10. Login streak resets to 0
11. Longest streak remains: 6 days

---

## 11. Dynamic Badge Transfer

### "Most Propped Up" Badge
1. Alice has 500 prop kudos, holds "Most Propped Up" badge
2. Bob receives mad-prop from Carol (+50 kudos)
3. Bob's prop kudos: 520 (now highest)
4. System automatically:
   - Removes badge from Alice
   - Awards badge to Bob
5. Notification scroller: "👑 Bob is now 'Most Propped Up'!"
6. Alice sees badge removed from profile
7. Bob sees badge added to profile
8. Badge history shows transfer date

---

## 12. Team Switching

### Flow
1. User goes to Profile Settings
2. User clicks "My Teams"
3. Current teams: Engineering, Marketing
4. User clicks "Leave Team" on Marketing
5. Confirmation: "Leave Marketing team? You'll lose access to team questions."
6. User confirms
7. User removed from Marketing team
8. User no longer sees Marketing team's People questions
9. User clicks "Join Team"
10. Dropdown shows available teams
11. User selects "Sales"
12. User joins Sales team
13. User now sees Sales team's People questions
14. Notification: "Welcome to Sales team!"
