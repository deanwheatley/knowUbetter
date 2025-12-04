import type { OrganizationType, TeamStructure, OrganizationTemplate } from '@/types';

/**
 * Organization Template Service
 * Provides pre-configured templates for quick organization setup
 */

const templates: Record<OrganizationType, OrganizationTemplate> = {
  company: {
    type: 'company',
    branding: {
      primaryColor: '#2563EB', // Professional blue
      secondaryColor: '#7C3AED', // Purple accent
      theme: 'professional',
    },
    authConfig: {
      google: true,
      facebook: false,
      credentials: true,
    },
    evaluation: {
      period: 30,
      licenses: 20,
    },
    defaultTeams: [
      { name: 'Sales', color: '#10B981', icon: '💼' },
      { name: 'Engineering', color: '#3B82F6', icon: '⚙️' },
      { name: 'Marketing', color: '#F59E0B', icon: '📢' },
    ],
  },
  startup: {
    type: 'startup',
    branding: {
      primaryColor: '#7C3AED', // Startup purple
      secondaryColor: '#EC4899', // Pink accent
      theme: 'modern',
    },
    authConfig: {
      google: true,
      facebook: false,
      credentials: true,
    },
    evaluation: {
      period: 60, // Longer trial for startups
      licenses: 20,
    },
    defaultTeams: [
      { name: 'Core Team', color: '#7C3AED', icon: '🚀' },
      { name: 'Advisors', color: '#6B7280', icon: '🧠' },
    ],
  },
  school: {
    type: 'school',
    branding: {
      primaryColor: '#1D4ED8', // Academic blue
      secondaryColor: '#059669', // Green accent
      theme: 'academic',
    },
    authConfig: {
      google: true, // Students use Google
      facebook: false,
      credentials: true,
    },
    evaluation: {
      period: 90, // Semester length
      licenses: 50, // Larger classes
    },
    defaultTeams: [
      { name: 'Students', color: '#1D4ED8', icon: '🎓' },
      { name: 'Faculty', color: '#059669', icon: '👨‍🏫' },
    ],
  },
  nonprofit: {
    type: 'nonprofit',
    branding: {
      primaryColor: '#059669', // Community green
      secondaryColor: '#F59E0B', // Warm orange
      theme: 'community',
    },
    authConfig: {
      google: true,
      facebook: true, // Community engagement
      credentials: true,
    },
    evaluation: {
      period: 90, // Extended for nonprofits
      licenses: 30,
    },
    defaultTeams: [
      { name: 'Volunteers', color: '#059669', icon: '🤝' },
      { name: 'Staff', color: '#F59E0B', icon: '👥' },
      { name: 'Board', color: '#6B7280', icon: '📋' },
    ],
  },
  team: {
    type: 'team',
    branding: {
      primaryColor: '#3B82F6', // Simple blue
      secondaryColor: '#8B5CF6', // Purple
      theme: 'simple',
    },
    authConfig: {
      google: true,
      facebook: false,
      credentials: true,
    },
    evaluation: {
      period: 30,
      licenses: 10, // Smaller team
    },
    defaultTeams: [], // Will create single team with org name
  },
};

const teamStructureTemplates: Record<TeamStructure, (orgName: string) => Array<{ name: string; color: string; icon: string }>> = {
  departments: () => [
    { name: 'Sales', color: '#10B981', icon: '💼' },
    { name: 'Engineering', color: '#3B82F6', icon: '⚙️' },
    { name: 'Marketing', color: '#F59E0B', icon: '📢' },
    { name: 'Operations', color: '#8B5CF6', icon: '🔧' },
  ],
  projects: () => [
    { name: 'Alpha Team', color: '#3B82F6', icon: '🚀' },
    { name: 'Beta Team', color: '#10B981', icon: '⭐' },
    { name: 'Gamma Team', color: '#F59E0B', icon: '💫' },
  ],
  classes: () => [
    { name: 'Class of 2024', color: '#1D4ED8', icon: '🎓' },
    { name: 'Class of 2025', color: '#059669', icon: '📚' },
    { name: 'Faculty', color: '#6B7280', icon: '👨‍🏫' },
  ],
  single: (orgName: string) => [
    { name: orgName, color: '#3B82F6', icon: '🌟' },
  ],
  custom: () => [], // No default teams
};

export const organizationTemplateService = {
  /**
   * Get template for organization type
   */
  getTemplate(type: OrganizationType): OrganizationTemplate {
    return templates[type];
  },

  /**
   * Get teams for structure type
   */
  getTeamsForStructure(structure: TeamStructure, orgName: string): Array<{ name: string; color: string; icon: string }> {
    return teamStructureTemplates[structure](orgName);
  },

  /**
   * Apply template to organization creation
   */
  applyTemplate(
    type: OrganizationType,
    structure: TeamStructure,
    orgName: string,
    customBranding?: {
      primaryColor?: string;
      secondaryColor?: string;
    }
  ): {
    branding: OrganizationTemplate['branding'];
    authConfig: OrganizationTemplate['authConfig'];
    evaluation: OrganizationTemplate['evaluation'];
    teams: Array<{ name: string; color: string; icon: string }>;
  } {
    const template = this.getTemplate(type);
    const teams = this.getTeamsForStructure(structure, orgName);

    return {
      branding: {
        ...template.branding,
        primaryColor: customBranding?.primaryColor || template.branding.primaryColor,
        secondaryColor: customBranding?.secondaryColor || template.branding.secondaryColor,
      },
      authConfig: template.authConfig,
      evaluation: template.evaluation,
      teams,
    };
  },

  /**
   * Get all available organization types
   */
  getOrganizationTypes(): Array<{
    value: OrganizationType;
    label: string;
    description: string;
    icon: string;
  }> {
    return [
      {
        value: 'company',
        label: 'Company/Business',
        description: '10-500+ employees',
        icon: '🏢',
      },
      {
        value: 'startup',
        label: 'Startup',
        description: '2-20 employees',
        icon: '🚀',
      },
      {
        value: 'school',
        label: 'School/University',
        description: 'Students and faculty',
        icon: '🏫',
      },
      {
        value: 'nonprofit',
        label: 'Non-profit',
        description: 'Volunteers and staff',
        icon: '🏛️',
      },
      {
        value: 'team',
        label: 'Team/Department',
        description: 'Part of larger organization',
        icon: '👥',
      },
    ];
  },

  /**
   * Get all available team structures
   */
  getTeamStructures(): Array<{
    value: TeamStructure;
    label: string;
    description: string;
    icon: string;
  }> {
    return [
      {
        value: 'departments',
        label: 'Departments',
        description: 'Sales, Engineering, Marketing, etc.',
        icon: '📊',
      },
      {
        value: 'projects',
        label: 'Project Teams',
        description: 'Alpha Team, Beta Team, etc.',
        icon: '🎯',
      },
      {
        value: 'classes',
        label: 'Classes/Cohorts',
        description: 'Class of 2024, Spring Cohort, etc.',
        icon: '📚',
      },
      {
        value: 'single',
        label: 'One Big Team',
        description: 'Everyone together',
        icon: '🌟',
      },
      {
        value: 'custom',
        label: 'Custom',
        description: "I'll set this up myself",
        icon: '⚙️',
      },
    ];
  },

  /**
   * Get first action options
   */
  getFirstActions(): Array<{
    value: string;
    label: string;
    description: string;
    icon: string;
  }> {
    return [
      {
        value: 'invite',
        label: 'Invite my team',
        description: 'Send invitations to team members',
        icon: '👥',
      },
      {
        value: 'questions',
        label: 'Add some questions',
        description: 'Create custom quiz questions',
        icon: '❓',
      },
      {
        value: 'customize',
        label: 'Customize appearance',
        description: 'Upload logo and set colors',
        icon: '🎨',
      },
      {
        value: 'start',
        label: 'Start using it now',
        description: 'Skip to dashboard with defaults',
        icon: '🚀',
      },
    ];
  },
};
