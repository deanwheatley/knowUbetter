# Comprehensive Review: Contradictions & Inconsistencies

## Overview
Analysis of contradictions and inconsistencies found across requirements, design, and implementation documents.

## 1. Authentication Architecture Contradiction

**Issue:** Conflicting authentication approaches between single-tenant and multi-tenant designs.

**References:**
- `docs/design/architecture-diagrams.md` - Shows AWS Cognito user pools per organization
- `docs/plans/phase2-authentication-onboarding.md` - Task 1.1 mentions "AWS Cognito user pools per organization"
- Current implementation uses NextAuth.js with Google OAuth

**Contradiction:**
- Design specifies AWS Cognito with separate user pools per organization
- Implementation uses NextAuth.js with single authentication system
- Multi-tenant design assumes organization-specific authentication, but NextAuth.js doesn't naturally support this

**Impact:** High - Authentication is foundational to the entire multi-tenant architecture

**Recommendation:** 
- Choose one approach and update all documentation consistently
- If using NextAuth.js, update architecture diagrams and remove Cognito references
- If using Cognito, remove NextAuth.js implementation and update accordingly

## 2. License Management Inconsistency

**Issue:** Conflicting information about license enforcement and billing.

**References:**
- `docs/requirements/multi-tenant-organizations.md` - Section 2: "Cannot invite users when licenses are exhausted"
- `docs/design/multi-tenant-organizations-design.md` - Section 6: "Start with FREE unlimited licenses"
- `docs/plans/phase1-multi-tenant-foundation.md` - Task 2.2: "Check available licenses, reserve license, release license"

**Contradiction:**
- Requirements suggest license limits are enforced
- Design says licenses are unlimited and free
- Implementation plans include license checking logic

**Impact:** Medium - Affects invitation system and organization management

**Recommendation:**
- Clarify whether initial implementation has license limits or not
- If unlimited, remove license checking from Phase 1 implementation
- If limited, define what happens when limits are reached

## 3. Team Admin Role Assignment Confusion

**Issue:** Unclear relationship between Team Admin role and team assignment.

**References:**
- `docs/requirements/multi-tenant-organizations.md` - Section 5: "Team Admin role assigned by Organization Admin"
- `docs/design/multi-tenant-organizations-design.md` - User model: `teamAdminFor: string[]`
- `docs/design/architecture-diagrams.md` - Shows Team Admin as separate role level

**Contradiction:**
- Requirements suggest Team Admin is a user role
- Design shows it as an array of team IDs (relationship, not role)
- Architecture diagram shows it as hierarchical role

**Impact:** Medium - Affects permission system and UI design

**Recommendation:**
- Clarify if Team Admin is a role or a relationship
- If role: User has Team Admin role and can be assigned to teams
- If relationship: User has User role but admin privileges for specific teams

## 4. Question Scoping Inconsistency

**Issue:** Conflicting information about question visibility and scoping.

**References:**
- `docs/requirements/core-features.md` - "People category questions are team-scoped"
- `docs/requirements/teams-system.md` - "Only visible to team members"
- `docs/requirements/multi-tenant-organizations.md` - Section 7: "Assign questions to specific teams"

**Contradiction:**
- Core features say People category is automatically team-scoped
- Multi-tenant requirements suggest manual team assignment
- Unclear if users on multiple teams see questions from all teams

**Impact:** Medium - Affects quiz experience and question management

**Recommendation:**
- Define clear rules for question scoping
- Specify behavior for users on multiple teams
- Clarify if scoping is automatic (by category) or manual (by assignment)

## 5. Invitation Expiration Logic Gap

**Issue:** Unclear behavior when invitation expiration is disabled.

**References:**
- `docs/requirements/multi-tenant-organizations.md` - Section 4: "Options: 7, 14, 30, 60, 90 days, or Never expire"
- `docs/design/multi-tenant-organizations-design.md` - "null = never expire"
- `docs/plans/phase3-invitation-team-management.md` - Task 3.2: "Cron job to check expired invitations"

**Contradiction:**
- Requirements mention "Never expire" option
- Design uses null value for never expire
- Implementation plan assumes all invitations have expiration checking

**Impact:** Low - Affects invitation management but not core functionality

**Recommendation:**
- Clarify data model for never-expiring invitations
- Update cron job logic to handle null expiration dates
- Ensure UI handles both cases appropriately

## 6. SSO Configuration Inconsistency

**Issue:** Conflicting information about SSO method availability.

**References:**
- `docs/requirements/multi-tenant-organizations.md` - Section 3: "knowUbetter (email/password) - always enabled"
- `docs/design/multi-tenant-organizations-design.md` - "ssoConfig.knowUbetter: boolean // always true"
- Current implementation only has Google OAuth

**Contradiction:**
- Requirements say knowUbetter auth is always enabled
- Design shows it as configurable boolean
- Implementation doesn't include email/password authentication

**Impact:** Medium - Affects user authentication options

**Recommendation:**
- Decide if knowUbetter auth is always enabled or configurable
- Implement email/password authentication if required
- Update design to match requirements

## 7. Data Model Field Inconsistencies

**Issue:** Field names and types don't match across documents.

**References:**
- `docs/design/multi-tenant-organizations-design.md` - Organization model: `totalLicenses: number | 'unlimited'`
- `amplify/data/resource.ts` - Organization model: `totalLicenses: a.string().default('unlimited')`

**Contradiction:**
- Design shows union type (number or string)
- Implementation uses only string type
- Unclear how to handle numeric license counts

**Impact:** Low - Affects data consistency but not functionality

**Recommendation:**
- Standardize on one approach across all documents
- Update either design or implementation to match
- Consider using separate boolean for unlimited vs numeric count

## Summary

**High Priority Issues:**
1. Authentication architecture mismatch
2. License management approach

**Medium Priority Issues:**
3. Team Admin role definition
4. Question scoping rules
5. SSO configuration approach

**Low Priority Issues:**
6. Invitation expiration edge cases
7. Data model field consistency

**Next Steps:**
1. Resolve authentication approach first (affects all other systems)
2. Clarify license management strategy
3. Define Team Admin role clearly
4. Update all documentation to reflect decisions