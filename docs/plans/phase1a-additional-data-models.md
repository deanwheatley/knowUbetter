# Phase 1A: Additional Data Models - Implementation Plan

## Overview
Add missing data models and services required for messaging and advanced features that were not included in Phase 1 foundation.

**Requirements:** Multi-tenant organizations requirements (docs/requirements/multi-tenant-organizations.md)
**Design:** Multi-tenant organizations design (docs/design/multi-tenant-organizations-design.md)

## Tasks

### 1. Message System Data Models
- [ ] 1.1 Create Message table/model
  - Fields: id, senderId, receiverId, content, type, relatedActivity, isRead, createdAt
  - **Requirements:** 11. Direct Messaging
  - **Design:** Message data model (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 1.2 Create MessageTemplate table/model
  - Fields: id, category, template, variables, isActive
  - **Requirements:** 11. Direct Messaging (Message templates)
  - **Design:** Message templates (docs/ideas/direct-messaging-design.md)

### 2. Organization Template Data Models
- [ ] 2.1 Create OrganizationTemplate table/model
  - Fields: id, type, name, branding, authConfig, defaultTeams, evaluationPeriod, defaultLicenses
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** OrganizationTemplate data model (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 2.2 Create DefaultTeamTemplate table/model
  - Fields: id, organizationType, structureType, teamName, color, icon, description
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Smart defaults by organization type (docs/ideas/turbotax-admin-setup.md)

### 3. Enhanced User Activity Tracking
- [ ] 3.1 Update UserActivity table/model for messaging
  - Add: messagesSent, messagesReceived, conversationCount
  - **Requirements:** Integration with messaging system
  - **Design:** User activity tracking (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 3.2 Create Conversation table/model
  - Fields: id, participant1Id, participant2Id, lastMessageAt, unreadCount1, unreadCount2
  - **Requirements:** 11. Direct Messaging (Conversation threads)
  - **Design:** Conversation management (docs/ideas/direct-messaging-design.md)

### 4. Organization Settings Extensions
- [ ] 4.1 Update Organization table for messaging settings
  - Add: messagingEnabled, messageRetentionDays, allowCrossTeamMessaging
  - **Requirements:** 11. Direct Messaging (Organization-level controls)
  - **Design:** Organization messaging settings (docs/ideas/direct-messaging-design.md)
  
- [ ] 4.2 Update Organization table for quick setup tracking
  - Add: setupMethod, templateUsed, setupCompletedAt, customizationLevel
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Setup tracking (docs/ideas/turbotax-admin-setup.md)

### 5. Data Services
- [ ] 5.1 Implement Message service
  - CRUD operations, team validation, read status tracking
  - **Requirements:** 11. Direct Messaging
  - **Design:** Message service (docs/ideas/direct-messaging-design.md)
  
- [ ] 5.2 Implement OrganizationTemplate service
  - Template CRUD, apply template to organization
  - **Requirements:** 13. Quick Setup & Progressive Configuration
  - **Design:** Template service (docs/ideas/turbotax-admin-setup.md)
  
- [ ] 5.3 Implement Conversation service
  - Conversation management, participant validation, unread tracking
  - **Requirements:** 11. Direct Messaging
  - **Design:** Conversation service (docs/ideas/direct-messaging-design.md)

### 6. Database Migrations
- [ ] 6.1 Create migration scripts for new tables
  - Message, MessageTemplate, OrganizationTemplate, DefaultTeamTemplate, Conversation
  - **Design:** Database migration strategy
  
- [ ] 6.2 Create migration scripts for table updates
  - Organization, UserActivity table additions
  - **Design:** Database migration strategy
  
- [ ] 6.3 Seed default data
  - Message templates, organization templates, default team templates
  - **Requirements:** Default data for messaging and quick setup
  - **Design:** Data seeding strategy

### 7. Testing & Validation
- [ ] 7.1 Write unit tests for new data models
  - Test all CRUD operations, relationships, validations
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.2 Write unit tests for new services
  - Test message service, template service, conversation service
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.3 Write integration tests for data relationships
  - Test cross-model relationships, data integrity
  - **Design:** Testing strategy (docs/design/multi-tenant-organizations-design.md)
  
- [ ] 7.4 Run `npx next build` to ensure no errors
  - Validate all changes build successfully
  - **Felix Guidelines:** Always validate builds

## Completion Criteria
- [ ] All new data models created and migrated
- [ ] Message system data models ready for Phase 4A
- [ ] Organization template models ready for Phase 2 quick setup
- [ ] Enhanced user activity tracking implemented
- [ ] All new services implemented and tested
- [ ] Database migrations completed successfully
- [ ] Default data seeded
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Build completes without errors

## Dependencies
- Phase 1: Multi-Tenant Foundation (must be complete)

## Next Phase
Phase 2: Authentication & Quick Setup (unified)

## Integration Notes
- **Phase 2**: Requires OrganizationTemplate and DefaultTeamTemplate models
- **Phase 4A**: Requires Message, MessageTemplate, and Conversation models
- **All Future Phases**: Benefit from enhanced Organization and UserActivity models