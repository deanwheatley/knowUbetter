# Badges & Achievements System

## Overview
Badges reward user accomplishments and milestones. No kudos rewards for earning badges.

## Badge Properties
- **Name**: Display name
- **Description**: What it's for
- **Icon**: Emoji or image
- **Rarity**: Common, Rare, Epic, Legendary
- **Hidden**: Some badges are discoverable (not shown until earned)
- **Dynamic**: Some badges are temporary (e.g., "Most Propped Up")

## Rarity Colors
- **Common**: Gray #6B7280
- **Rare**: Blue #3B82F6
- **Epic**: Purple #8B5CF6
- **Legendary**: Gold #F59E0B

## Badge Categories

### Quiz Achievement Badges

#### Common
- **First Steps** 🎯
  - Description: "Answered your first question correctly"
  - Trigger: 1 correct answer
  - Hidden: No

- **Getting Started** 📚
  - Description: "Answered 5 questions correctly"
  - Trigger: 5 correct answers
  - Hidden: No

#### Rare
- **Quiz Master** 🎓
  - Description: "Answered 10 questions correctly"
  - Trigger: 10 correct answers
  - Hidden: No

- **Category Expert** 🏆
  - Description: "Answered 20 questions correctly in one category"
  - Trigger: 20 correct in single category
  - Hidden: No
  - Variants: Product Expert, People Expert, Lore Expert, Industry Expert

- **Perfect Week** ⭐
  - Description: "Answered 20/20 questions correctly in one week"
  - Trigger: 20/20 weekly questions correct
  - Hidden: No

#### Epic
- **Century Club** 💯
  - Description: "Answered 100 questions correctly"
  - Trigger: 100 correct answers
  - Hidden: No

- **Speed Demon** ⚡
  - Description: "Answered 10 questions in under 5 seconds each"
  - Trigger: 10 questions with <5 second response time
  - Hidden: Yes

- **Perfectionist** 🎯
  - Description: "Maintained 100% correctness for 20 questions"
  - Trigger: 20 consecutive correct answers
  - Hidden: Yes

#### Legendary
- **Knowledge Legend** 👑
  - Description: "Answered 500 questions correctly"
  - Trigger: 500 correct answers
  - Hidden: No

- **Unstoppable** 🔥
  - Description: "50 question correct answer streak"
  - Trigger: 50 consecutive correct
  - Hidden: Yes

### Props & Social Badges

#### Common
- **Generous Soul** 🎁
  - Description: "Sent your first prop"
  - Trigger: First prop sent
  - Hidden: No

- **Appreciated** 💝
  - Description: "Received your first prop"
  - Trigger: First prop received
  - Hidden: No

#### Rare
- **Team Player** 🤝
  - Description: "Sent props to 10 different people"
  - Trigger: Props sent to 10 unique users
  - Hidden: No

#### Epic
- **Prop Master** 🚀
  - Description: "Sent 50 props"
  - Trigger: 50 props sent (any type)
  - Hidden: No

- **Popular** ⭐
  - Description: "Received 100 prop kudos"
  - Trigger: 100+ prop kudos received
  - Hidden: No

- **Philanthropist** 💎
  - Description: "Gave away 1000 kudos via props"
  - Trigger: 1000+ kudos given via props
  - Hidden: Yes

#### Legendary
- **Most Propped Up** 👑💎 (DYNAMIC)
  - Description: "Currently has the most prop kudos"
  - Trigger: Highest prop kudos count
  - Hidden: No
  - Special: Only one user has this at a time, transfers when overtaken
  - Notification: Announced in notification scroller when awarded

### Streak Badges

#### Rare
- **Streak Champion** 🔥
  - Description: "7 day login streak"
  - Trigger: 7 consecutive workday logins
  - Hidden: No

- **On Fire** 🔥
  - Description: "10 correct answer streak"
  - Trigger: 10 consecutive correct answers
  - Hidden: No

#### Epic
- **Dedicated** 📅
  - Description: "30 day login streak"
  - Trigger: 30 consecutive workday logins
  - Hidden: No

- **Flawless** ✨
  - Description: "25 correct answer streak"
  - Trigger: 25 consecutive correct answers
  - Hidden: Yes

#### Legendary
- **Unstoppable Force** 🌟
  - Description: "60 day login streak"
  - Trigger: 60 consecutive workday logins
  - Hidden: Yes

### "Know You" Badges

#### Common
- **Getting Personal** 💬
  - Description: "Answered your first 'Know You' question"
  - Trigger: 1 "Know You" answer
  - Hidden: No

#### Rare
- **Open Book** 📖
  - Description: "Answered 25 'Know You' questions"
  - Trigger: 25 "Know You" answers
  - Hidden: No

- **Team Connector** 🔗
  - Description: "Your 'Know You' answers were answered correctly 50 times"
  - Trigger: Teammates answered your questions 50 times correctly
  - Hidden: No

#### Epic
- **Life of the Party** 🎉
  - Description: "Answered 100 'Know You' questions"
  - Trigger: 100 "Know You" answers
  - Hidden: Yes

### Question Contribution Badges

#### Common
- **Contributor** ✍️
  - Description: "Submitted your first question"
  - Trigger: 1 question submitted
  - Hidden: No

#### Rare
- **Question Master** 📝
  - Description: "Had 5 questions approved"
  - Trigger: 5 approved questions
  - Hidden: No

#### Epic
- **Crowd Pleaser** 🎭
  - Description: "Your question was answered 100 times"
  - Trigger: One of your questions answered 100+ times
  - Hidden: Yes

- **Stumper** 🤔
  - Description: "Your question has <30% correct rate after 50 answers"
  - Trigger: Hard question (stumps people)
  - Hidden: Yes

### Fun/Negative Badges (Not Humiliating)

#### Common
- **Oops!** 🙈
  - Description: "Got your first answer wrong (it happens!)"
  - Trigger: First wrong answer
  - Hidden: No

- **Speed Reader** 📖⚡
  - Description: "Answered a question in under 1 second"
  - Trigger: <1 second response time
  - Hidden: Yes

#### Rare
- **Comeback Kid** 💪
  - Description: "Went from 10 wrong in a row to 10 correct in a row"
  - Trigger: Recovery from 10-wrong streak to 10-correct streak
  - Hidden: Yes

- **Night Owl** 🦉
  - Description: "Answered 20 questions after 10pm"
  - Trigger: 20 questions answered after 10pm
  - Hidden: Yes

- **Early Bird** 🐦
  - Description: "Answered 20 questions before 7am"
  - Trigger: 20 questions answered before 7am
  - Hidden: Yes

## Badge Display

### User Dashboard
- Show recently earned badges (last 5)
- Badge count by rarity
- Progress toward next badge (if applicable)

### Public Profile
- All earned badges displayed
- Sorted by rarity (Legendary → Common)
- Hidden badges only shown if earned
- Badge earned date on hover

### Notification Scroller
- Badge awards announced: "Alice earned 'Quiz Master' badge!"
- Dynamic badge transfers: "Bob is now 'Most Propped Up'!"

### Badge Celebration
- Animated popup when badge earned
- Rarity-appropriate effects:
  - Common: Simple fade-in
  - Rare: Sparkle effect
  - Epic: Particle burst
  - Legendary: Rainbow explosion with sound

## Future Badge Ideas
- Team-specific badges
- Seasonal badges (holiday themes)
- Event badges (special competitions)
- Collaboration badges (team achievements)
- Milestone badges (1 year member, etc.)
