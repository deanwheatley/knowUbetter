# Phase 3: Direct Messaging System - Implementation Plan

## Overview
Implement team-scoped async messaging system that enhances core quiz activities without overwhelming the focused user experience.

**Requirements:** Multi-tenant organizations requirements (docs/requirements/multi-tenant-organizations.md) - Section 11
**Design:** Direct messaging system (docs/design/multi-tenant-organizations-design.md) - Section 8

## Tasks

### 1. Message Data Model & Service
- [ ] 1.1 Create Message table/model
  - Fields: id, senderId, receiverId, content, type, relatedActivity, isRead, createdAt
  - **Requirements:** 11. Direct Messaging
  - **Design:** Message data model (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 1.2 Implement message service
  - CRUD operations, team membership validation, read status tracking
  - **Requirements:** 11. Direct Messaging (Team-Scoped Messaging)
  - **Design:** Message service (docs/ideas/direct-messaging-design.md)
  
- [ ] 1.3 Implement team membership validation
  - Users can only message teammates (shared team membership)
  - Validate sender and receiver share at least one team
  - **Requirements:** 11. Direct Messaging (Team-Scoped Messaging)
  - **Design:** Team-scoped messaging (docs/ideas/direct-messaging-design.md)

### 2. Core Messaging Features
- [ ] 2.1 Implement send/receive message functionality
  - Async message delivery, message history, conversation threads
  - **Requirements:** 11. Direct Messaging (Async messaging system)
  - **Design:** Basic messaging (docs/ideas/direct-messaging-design.md)
  
- [ ] 2.2 Implement message templates
  - Quick message templates for common scenarios
  - Question-related, quiz-related, props-related, know-you-related templates
  - **Requirements:** 11. Direct Messaging (Message templates)
  - **Design:** Quick message templates (docs/ideas/direct-messaging-design.md)
  
- [ ] 2.3 Implement custom message composition
  - Free-form text messages for deeper conversations
  - **Requirements:** 11. Direct Messaging (Custom messages)
  - **Design:** Custom messages (docs/ideas/direct-messaging-design.md)
  
- [ ] 2.4 Implement read status and notifications
  - Mark messages as read, unread message indicators
  - **Requirements:** 11. Direct Messaging (Notification system)
  - **Design:** Message status tracking (docs/ideas/direct-messaging-design.md)

### 3. Activity Integration
- [ ] 3.1 Integrate messaging with quiz results
  - "Message" button next to user names in quiz results
  - Context about which quiz question triggered the message
  - **Requirements:** 11. Direct Messaging (Message Integration with Core Activities - Quiz results)
  - **Design:** Quiz results enhancement (docs/ideas/direct-messaging-design.md)
  
- [ ] 3.2 Integrate messaging with props system
  - Quick message buttons in props confirmation flow
  - Props acknowledgment message templates
  - **Requirements:** 11. Direct Messaging (Message Integration with Core Activities - Props system)
  - **Design:** Props system enhancement (docs/ideas/direct-messaging-design.md)
  
- [ ] 3.3 Integrate messaging with question creation
  - Courtesy messages when submitting questions about teammates
  - Question-related message templates
  - **Requirements:** 11. Direct Messaging (Message Integration with Core Activities - Question creation)
  - **Design:** Question creation enhancement (docs/ideas/direct-messaging-design.md)
  
- [ ] 3.4 Integrate messaging with "Know You" responses
  - Notifications to teammates when profile is updated
  - Know-you-related message templates
  - **Requirements:** 11. Direct Messaging (Message Integration with Core Activities - Know You responses)
  - **Design:** Know You response enhancement (docs/ideas/direct-messaging-design.md)

### 4. Message Center UI
- [ ] 4.1 Create message center page
  - List of conversations, message history, compose new message
  - **Requirements:** 11. Direct Messaging (Message center)
  - **Design:** Message center UI (docs/ideas/direct-messaging-design.md)
  
- [ ] 4.2 Implement conversation view
  - Thread view of messages between two users
  - Message timestamps, read status indicators
  - **Requirements:** 11. Direct Messaging (Message history and read status)
  - **Design:** Conversation view (docs/ideas/direct-messaging-design.md)
  
- [ ] 4.3 Add message center to main navigation
  - Navigation item with unread message badge
  - **Requirements:** 11. Direct Messaging (Message center accessible from main navigation)
  - **Design:** Navigation integration (docs/ideas/direct-messaging-design.md)
  
- [ ] 4.4 Implement quick message modals
  - Modal dialogs for sending quick messages from activity contexts
  - Template selection and custom message options
  - **Requirements:** 11. Direct Messaging (Quick message buttons in quiz results)
  - **Design:** Quick message UI (docs/ideas/direct-messaging-design.md)

### 5. Notification System
- [ ] 5.1 Implement unread message indicators
  - Badge counts on message center navigation
  - Visual indicators for unread conversations
  - **Requirements:** 11. Direct Messaging (Unread message indicators and notifications)
  - **Design:** Notification system (docs/ideas/direct-messaging-design.md)
  
- [ ] 5.2 Create in-app notification system
  - Toast notifications for new messages (when user is online)
  - Integration with existing notification scroller
  - **Requirements:** 11. Direct Messaging (Notification system for new messages)
  - **Design:** In-app notifications (docs/ideas/direct-messaging-design.md)
  
- [ ] 5.3 Implement message-related activity feed items
  - Show messaging activity in notification scroller
  - "Alice sent you a message" type notifications
  - **Requirements:** Integration with existing notification system
  - **Design:** Activity feed integration (docs/ideas/direct-messaging-design.md)

### 6. Integration with Existing Features
- [ ] 6.1 Update user profile pages
  - "Send Message" button on teammate profiles
  - Recent message history in profile context
  - **Requirements:** Integration with existing user profiles
  - **Design:** Profile integration (docs/ideas/direct-messaging-design.md)
  
- [ ] 6.2 Update team pages
  - Team member list with message buttons
  - Team messaging activity overview
  - **Requirements:** Integration with existing team management
  - **Design:** Team page integration (docs/ideas/direct-messaging-design.md)
  
- [ ] 6.3 Update dashboard with messaging widgets
  - Recent messages widget on dashboard
  - Quick access to active conversations
  - **Requirements:** Integration with existing dashboard
  - **Design:** Dashboard integration (docs/ideas/direct-messaging-design.md)

### 7. Testing & Validation
- [ ] 7.1 Write unit tests for message service
  - Test CRUD operations, team validation, read status tracking
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.2 Write integration tests for activity integration
  - Test messaging from quiz results, props, question creation
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.3 Write UI tests for message center
  - Test conversation view, message composition, notifications
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.4 Test team scoping validation
  - Ensure users can only message teammates
  - Test cross-team messaging restrictions
  - **Requirements:** 11. Direct Messaging (Team-Scoped Messaging)
  - **Design:** Team scoping tests (docs/ideas/direct-messaging-design.md)
  
- [ ] 7.5 Run `npx next build` to ensure no errors
  - Validate all changes build successfully
  - **Felix Guidelines:** Always validate builds

## Completion Criteria
- [ ] Message data model and service implemented
- [ ] Team-scoped messaging working correctly
- [ ] Message templates and custom messages functional
- [ ] Activity integration complete (quiz, props, questions, know-you)
- [ ] Message center UI implemented and accessible
- [ ] Notification system working with unread indicators
- [ ] Integration with existing features complete
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Build completes without errors

## Dependencies
- Phase 1: Multi-Tenant Foundation (User and Team models)
- Phase 1A: Additional Data Models (Message models required)
- Phase 2: Authentication & Quick Setup (user authentication required)
- Existing quiz, props, and question systems for integration

## Integration Points
- **Quiz System**: Add message buttons to quiz result screens
- **Props System**: Add message options to props confirmation flow
- **Question System**: Add courtesy messaging for question submission
- **User Profiles**: Add messaging capabilities to profile pages
- **Team Management**: Add messaging to team member management
- **Dashboard**: Add messaging widgets and notifications

## Success Metrics
- **Message engagement**: Messages sent per active user per week (target: 2-3)
- **Activity correlation**: Messages triggered by quiz activities (target: 60%+)
- **Relationship building**: Unique conversation pairs per team (target: 50%+ of possible pairs)
- **Retention impact**: User retention before/after messaging launch (target: +10%)

## Next Phase
Phase 4: Invitation & Team Management