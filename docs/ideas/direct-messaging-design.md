# Direct Messaging System Design

## Overview
Add direct messaging between team members to enhance the core quiz activities without overwhelming the focused experience.

## Core Principle
**Messaging enhances quiz activities, doesn't replace them.**

## Integration with Core Activities

### 1. Question Creation Enhancement
- **Context**: User submits question about teammate
- **Message Trigger**: "I submitted a question about your favorite coffee - hope that's okay! 😊"
- **Value**: Builds trust and transparency in question creation

### 2. "Know You" Response Enhancement  
- **Context**: User updates their "Know You" answer
- **Message Trigger**: "I updated my answer about weekend plans - check it out!"
- **Value**: Keeps teammates informed about profile changes

### 3. Quiz Results Enhancement
- **Context**: User learns something surprising about teammate from quiz
- **Message Trigger**: "I had no idea you were into rock climbing! Tell me more"
- **Value**: Converts quiz insights into real conversations

### 4. Props System Enhancement
- **Context**: User receives props from teammate
- **Message Trigger**: "Thanks for the mad-prop! That presentation was stressful"
- **Value**: Deepens appreciation and builds relationships

## Minimal Implementation

### Message Types
1. **Quick Messages**: Pre-written templates for common scenarios
2. **Custom Messages**: Free-form text for deeper conversations
3. **System Messages**: Automated notifications about quiz activities

### UI Integration
- **Message icon** next to user names in quiz results
- **Quick message buttons** in props confirmation
- **Message center** accessible from main navigation
- **Notification badges** for unread messages

### Data Model
```typescript
interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: 'quick' | 'custom' | 'system'
  relatedActivity?: {
    type: 'question' | 'quiz' | 'prop' | 'know-you'
    id: string
  }
  isRead: boolean
  createdAt: Date
}
```

## Quick Message Templates

### Question-Related
- "Thanks for the great question about me!"
- "I submitted a question about you - hope that's okay!"
- "Your question stumped everyone! 😄"

### Quiz-Related  
- "I learned something new about you today!"
- "I can't believe I got that wrong about you!"
- "We think so much alike!"

### Props-Related
- "Thanks for the props! 🙌"
- "You deserved those kudos!"
- "Appreciate the recognition!"

### Know You-Related
- "I updated my profile - check it out!"
- "Interesting answer! Tell me more"
- "We have so much in common!"

## Implementation Priority

### Phase 1: Basic Messaging
- Send/receive messages between team members
- Message history and read status
- Integration with existing user profiles

### Phase 2: Activity Integration
- Quick message buttons in quiz results
- Props acknowledgment messages
- Question submission notifications

### Phase 3: Enhanced Features
- Message templates and quick replies
- Typing indicators and read receipts
- Message search and filtering

## Success Metrics
- **Message engagement**: Messages sent per active user per week
- **Activity correlation**: Messages triggered by quiz activities
- **Relationship building**: Unique conversation pairs per team
- **Retention impact**: User retention before/after messaging launch