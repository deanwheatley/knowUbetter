# Admin Configuration Settings

## Overview
All configurable settings accessible via Admin Panel. Defaults provided for initial setup.

## Quiz Settings

### Question Limits
- **Weekly Question Limit**
  - Default: 20 questions per user per week
  - Range: 1-100
  - Description: Maximum quiz questions a user can answer per week

- **Weekly Pass Limit**
  - Default: 5 passes per user per week
  - Range: 0-50
  - Description: Number of times users can skip questions without penalty

### Question Timing
- **Seconds Per Word**
  - Default: 2 seconds
  - Range: 0.5-10 seconds
  - Description: Time multiplier for question countdown (word count × seconds per word)
  - Example: 10-word question = 20 seconds with default

- **Minimum Question Time**
  - Default: 5 seconds
  - Range: 3-30 seconds
  - Description: Minimum time for any question regardless of word count

- **Maximum Question Time**
  - Default: 60 seconds
  - Range: 30-300 seconds
  - Description: Maximum time cap for very long questions

### Kudos Values
- **Kudos Per Correct Answer**
  - Default: 10 kudos
  - Range: 1-100
  - Description: Kudos awarded for each correct quiz answer

- **Kudos Per Know You Answer**
  - Default: 1 kudos
  - Range: 0-10
  - Description: Kudos awarded for answering "Know You" questions

### Question Approval
- **Auto-Approve Questions**
  - Default: false
  - Options: true/false
  - Description: Automatically approve user-submitted questions without admin review

- **Auto-Reject Duplicate Threshold**
  - Default: 80% similarity
  - Range: 50-100%
  - Description: Similarity threshold for automatic duplicate rejection

### Question Rewards
- **Question Approval Kudos**
  - Default: 20 kudos
  - Range: 0-100
  - Description: Kudos for getting a question approved

- **Question Popularity Bonus (10+ answers)**
  - Default: 5 kudos
  - Range: 0-50

- **Question Popularity Bonus (50+ answers)**
  - Default: 10 kudos
  - Range: 0-100

- **Perfect Question Bonus (100% correct rate)**
  - Default: 15 kudos
  - Range: 0-100

## Rubber Band Mechanic

### Trigger Settings
- **Enable Rubber Band**
  - Default: true
  - Options: true/false
  - Description: Help struggling users with easier questions

- **Consecutive Wrong Threshold**
  - Default: 10 wrong answers
  - Range: 5-20
  - Description: Number of consecutive wrong answers to trigger rubber band

### Difficulty Weighting
- **Phase 1 Weight (Questions 1-5)**
  - Default: 80% toward easiest 25% of questions
  - Range: 50-100%

- **Phase 2 Weight (Questions 6-10)**
  - Default: 60% toward easiest 50% of questions
  - Range: 30-100%

- **Phase 3 Weight (Questions 11-15)**
  - Default: 40% toward easiest 75% of questions
  - Range: 20-100%

- **Phase 4 (Questions 16+)**
  - Default: Normal random selection

## Difficulty Display

### Difficulty Thresholds
- **Easy Threshold**
  - Default: 70% correct rate
  - Range: 60-90%
  - Display: Green 🟢

- **Medium Threshold**
  - Default: 40-69% correct rate
  - Range: 30-70%
  - Display: Yellow 🟡

- **Hard Threshold**
  - Default: <40% correct rate
  - Range: <30-40%
  - Display: Red 🔴

- **Minimum Answers for Difficulty**
  - Default: 10 answers
  - Range: 5-50
  - Description: Minimum answers before difficulty is calculated

## Props System

### Weekly Allowance
- **Props Per Week**
  - Default: 5
  - Range: 0-50
  - Value: 10 kudos each

- **Mad-Props Per Week**
  - Default: 2
  - Range: 0-20
  - Value: 50 kudos each

- **Prop-Hell-Yeah Per Week**
  - Default: 1
  - Range: 0-10
  - Value: 100 kudos each

### Props Behavior
- **Props Rollover**
  - Default: true (indefinite rollover)
  - Options: true/false
  - Description: Unused props carry over to next week

- **Require Props Message**
  - Default: true
  - Options: true/false
  - Description: Force users to provide reason when sending props

- **Minimum Message Length**
  - Default: 10 characters
  - Range: 0-200
  - Description: Minimum length for props message

## Streak Settings

### Correct Answer Streak Rewards
- **5 Correct Streak**
  - Default: 10 kudos
  - Range: 0-100

- **10 Correct Streak**
  - Default: 25 kudos
  - Range: 0-200

- **20 Correct Streak**
  - Default: 50 kudos
  - Range: 0-500

- **50 Correct Streak**
  - Default: 100 kudos
  - Range: 0-1000

### Login Streak Rewards
- **5 Day Streak**
  - Default: 20 kudos
  - Range: 0-100

- **10 Day Streak**
  - Default: 50 kudos
  - Range: 0-200

- **20 Day Streak**
  - Default: 100 kudos
  - Range: 0-500

- **30 Day Streak**
  - Default: 200 kudos
  - Range: 0-1000

### Streak Behavior
- **Count Weekends for Login Streak**
  - Default: false (workdays only)
  - Options: true/false
  - Description: Include weekends in login streak calculation

## "Know You" Questions

### Limits
- **Weekly Know You Limit**
  - Default: Unlimited (0 = unlimited)
  - Range: 0-100
  - Description: Maximum "Know You" questions per user per week

### Distribution
- **Know You Question Percentage**
  - Default: 30%
  - Range: 0-100%
  - Description: Target percentage of "Know You" questions in quiz flow (guideline only)

### Behavior
- **Auto-Approve Know You Questions**
  - Default: true
  - Options: true/false
  - Description: Automatically create quiz questions from "Know You" answers

- **Allow Answer Editing**
  - Default: true
  - Options: true/false
  - Description: Let users edit their "Know You" answers

## Weekly Reset

### Timing
- **Reset Day**
  - Default: Monday
  - Options: Monday-Sunday
  - Description: Day of week for weekly reset

- **Reset Time**
  - Default: 00:00 (midnight)
  - Range: 00:00-23:59
  - Description: Time of day for reset

- **Timezone**
  - Default: America/Los_Angeles (PST/PDT)
  - Options: All standard timezones
  - Description: Timezone for reset calculations

### Reset Behavior
- **Send End of Week Reminder**
  - Default: true
  - Options: true/false
  - Description: Notify users to use remaining props before reset

- **Reminder Time Before Reset**
  - Default: 24 hours
  - Range: 1-72 hours
  - Description: How long before reset to send reminder

## Categories

### Default Categories
1. **Product** - Blue #3B82F6 - ⚙️
2. **People** - Purple #8B5CF6 - 👥
3. **Lore** - Orange #F59E0B - 📚
4. **Industry** - Green #10B981 - 🌐

### Category Settings
- **Allow User Category Creation**
  - Default: false
  - Options: true/false
  - Description: Let users create new categories

- **Minimum Questions Per Category**
  - Default: 0 (no minimum)
  - Range: 0-50
  - Description: Minimum questions before category is active

## Leaderboards

### Display Settings
- **Users Per Page**
  - Default: 10
  - Range: 5-50
  - Description: Pagination size for leaderboards

- **Show User Rank Always**
  - Default: true
  - Options: true/false
  - Description: Always show user's rank even if not in top X

### Hall of Fame
- **Hall of Fame Criteria**
  - Default: Top 10 all-time
  - Range: Top 5-100
  - Description: Number of users in Hall of Fame

## Teams

### Team Creation
- **Allow User Team Creation**
  - Default: true
  - Options: true/false
  - Description: Let users create their own teams

- **Require Admin Approval for Teams**
  - Default: false
  - Options: true/false
  - Description: Admin must approve user-created teams

- **Maximum Teams Per User**
  - Default: 5
  - Range: 1-20
  - Description: Maximum number of teams a user can join

### Team Behavior
- **Require Team Selection on Signup**
  - Default: true
  - Options: true/false
  - Description: Force users to select/create team during signup

## Notification Scroller

### Display Settings
- **Notification Count**
  - Default: 20 recent notifications
  - Range: 10-100
  - Description: Number of notifications to display

- **Notification Refresh**
  - Default: On page load (static)
  - Options: Static, 30s, 60s, Real-time
  - Description: How often to refresh notifications

### Notification Types (Enable/Disable)
- Weekly winners: Default true
- Category leaders: Default true
- Props given: Default true
- Badge awards: Default true
- Milestones: Default true
- New questions: Default true
- Streaks: Default true
- Team updates: Default true

## Weekly Recap

### Display Settings
- **Show Weekly Recap**
  - Default: true
  - Options: true/false
  - Description: Show animated recap on first login after week ends

- **Allow Skip Recap**
  - Default: true
  - Options: true/false
  - Description: Let users skip the recap cutscene

- **Recap Screens**
  - Default: All 5 screens
  - Options: Select which screens to show
  - Description: Customize which recap screens appear

## System Settings

### Performance
- **Question Pool Size**
  - Default: 100 questions
  - Range: 50-500
  - Description: Number of questions to load into memory for selection

- **Cache Duration**
  - Default: 5 minutes
  - Range: 1-60 minutes
  - Description: How long to cache leaderboards and stats

### Maintenance
- **Maintenance Mode**
  - Default: false
  - Options: true/false
  - Description: Disable quiz/props while maintaining access

- **Maintenance Message**
  - Default: "System maintenance in progress"
  - Description: Message shown during maintenance mode
