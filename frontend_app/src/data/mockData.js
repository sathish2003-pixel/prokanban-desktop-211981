// Mock data for the Kanban board application

// PUBLIC_INTERFACE
/**
 * Generate unique IDs for new items
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Users mock data
export const users = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: null,
    role: 'Lead Developer'
  },
  {
    id: 'user-2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    role: 'Backend Engineer'
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatar: null,
    role: 'DevOps Engineer'
  },
  {
    id: 'user-4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    avatar: null,
    role: 'UI/UX Designer'
  },
  {
    id: 'user-5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    avatar: null,
    role: 'Product Manager'
  },
  {
    id: 'user-6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    avatar: null,
    role: 'QA Engineer'
  },
  {
    id: 'user-7',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    avatar: null,
    role: 'Frontend Developer'
  },
  {
    id: 'user-8',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    avatar: null,
    role: 'Marketing Manager'
  }
];

// Teams mock data
export const teams = [
  {
    id: 'team-1',
    name: 'Engineering',
    color: '#0052CC',
    memberCount: 8,
    members: ['user-1', 'user-2', 'user-3', 'user-7']
  },
  {
    id: 'team-2',
    name: 'Design',
    color: '#6554C0',
    memberCount: 4,
    members: ['user-4', 'user-6']
  },
  {
    id: 'team-3',
    name: 'Product',
    color: '#00875A',
    memberCount: 5,
    members: ['user-5']
  },
  {
    id: 'team-4',
    name: 'Marketing',
    color: '#FF991F',
    memberCount: 6,
    members: ['user-8']
  }
];

// Projects mock data
export const projects = [
  {
    id: 'project-1',
    key: 'ALPHA',
    name: 'Project Alpha',
    description: 'Main development board for platform features',
    color: '#0052CC',
    taskCount: 15,
    lead: 'user-1'
  },
  {
    id: 'project-2',
    key: 'BETA',
    name: 'Project Beta',
    description: 'Marketing and design initiatives',
    color: '#00875A',
    taskCount: 8,
    lead: 'user-4'
  },
  {
    id: 'project-3',
    key: 'GAMMA',
    name: 'Project Gamma',
    description: 'Infrastructure and DevOps improvements',
    color: '#FF991F',
    taskCount: 6,
    lead: 'user-3'
  }
];

// Labels mock data
export const labels = [
  { id: 'label-1', name: 'bug', color: '#EF4444' },
  { id: 'label-2', name: 'feature', color: '#10B981' },
  { id: 'label-3', name: 'enhancement', color: '#3B82F6' },
  { id: 'label-4', name: 'design', color: '#8B5CF6' },
  { id: 'label-5', name: 'frontend', color: '#06B6D4' },
  { id: 'label-6', name: 'backend', color: '#F59E0B' },
  { id: 'label-7', name: 'documentation', color: '#6B7280' },
  { id: 'label-8', name: 'security', color: '#DC2626' },
  { id: 'label-9', name: 'performance', color: '#EC4899' },
  { id: 'label-10', name: 'ui', color: '#A855F7' },
  { id: 'label-11', name: 'database', color: '#14B8A6' },
  { id: 'label-12', name: 'devops', color: '#F97316' },
  { id: 'label-13', name: 'testing', color: '#84CC16' },
  { id: 'label-14', name: 'api', color: '#0EA5E9' }
];

// Initial mock data
export const initialMockData = {
  boards: [
    {
      id: 'board-1',
      title: 'Project Alpha',
      description: 'Main development board',
      projectId: 'project-1'
    },
    {
      id: 'board-2',
      title: 'Project Beta',
      description: 'Marketing and design board',
      projectId: 'project-2'
    },
    {
      id: 'board-3',
      title: 'Project Gamma',
      description: 'Infrastructure board',
      projectId: 'project-3'
    }
  ],
  lists: [
    // Project Alpha lists
    {
      id: 'list-1',
      boardId: 'board-1',
      title: 'Backlog',
      order: 0
    },
    {
      id: 'list-2',
      boardId: 'board-1',
      title: 'Selected for Development',
      order: 1
    },
    {
      id: 'list-3',
      boardId: 'board-1',
      title: 'In Progress',
      order: 2
    },
    {
      id: 'list-4',
      boardId: 'board-1',
      title: 'In Review',
      order: 3
    },
    {
      id: 'list-5',
      boardId: 'board-1',
      title: 'Done',
      order: 4
    },
    // Project Beta lists
    {
      id: 'list-6',
      boardId: 'board-2',
      title: 'Backlog',
      order: 0
    },
    {
      id: 'list-7',
      boardId: 'board-2',
      title: 'In Progress',
      order: 1
    },
    {
      id: 'list-8',
      boardId: 'board-2',
      title: 'Review',
      order: 2
    },
    {
      id: 'list-9',
      boardId: 'board-2',
      title: 'Done',
      order: 3
    },
    // Project Gamma lists
    {
      id: 'list-10',
      boardId: 'board-3',
      title: 'Backlog',
      order: 0
    },
    {
      id: 'list-11',
      boardId: 'board-3',
      title: 'In Progress',
      order: 1
    },
    {
      id: 'list-12',
      boardId: 'board-3',
      title: 'Done',
      order: 2
    }
  ],
  tasks: [
    // Project Alpha tasks
    {
      id: 'task-1',
      key: 'ALPHA-1',
      listId: 'list-1',
      projectId: 'project-1',
      teamId: 'team-2',
      title: 'Design system setup',
      description: 'Create a comprehensive design system with colors, typography, spacing, and component library for consistent UI across the platform.',
      priority: 'high',
      status: 'todo',
      assignee: 'Emily Rodriguez',
      reporter: 'David Kim',
      labels: ['design', 'frontend', 'enhancement'],
      estimate: '5d',
      storyPoints: 8,
      dueDate: '2024-02-15',
      createdAt: '2024-01-10T09:30:00Z',
      updatedAt: '2024-01-12T14:20:00Z',
      comments: [
        {
          id: 'comment-1',
          author: 'David Kim',
          content: 'Please include dark mode variants in the design system',
          timestamp: '2024-01-11T10:15:00Z'
        },
        {
          id: 'comment-2',
          author: 'Emily Rodriguez',
          content: 'Will do! Planning to have both light and dark themes ready.',
          timestamp: '2024-01-11T11:30:00Z'
        }
      ],
      attachments: [
        {
          id: 'attach-1',
          name: 'design-tokens.json',
          size: '12kb',
          url: '#'
        }
      ],
      order: 0
    },
    {
      id: 'task-2',
      key: 'ALPHA-2',
      listId: 'list-1',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'API documentation',
      description: 'Document all REST API endpoints with request/response examples, authentication details, and error codes.',
      priority: 'medium',
      status: 'todo',
      assignee: 'John Doe',
      reporter: 'Sarah Chen',
      labels: ['backend', 'documentation', 'api'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-02-20',
      createdAt: '2024-01-11T08:00:00Z',
      updatedAt: '2024-01-11T08:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-3',
      key: 'ALPHA-3',
      listId: 'list-1',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Database migration script',
      description: 'Write migration scripts to move from current schema to v2.0 with proper rollback support.',
      priority: 'high',
      status: 'todo',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['database', 'backend'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-02-18',
      createdAt: '2024-01-12T13:45:00Z',
      updatedAt: '2024-01-12T13:45:00Z',
      comments: [],
      attachments: [],
      order: 2
    },
    {
      id: 'task-4',
      key: 'ALPHA-4',
      listId: 'list-2',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'User authentication flow',
      description: 'Implement OAuth2 authentication with JWT tokens, refresh token rotation, and secure session management.',
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Doe',
      reporter: 'Sarah Chen',
      labels: ['backend', 'security', 'feature'],
      estimate: '5d',
      storyPoints: 8,
      dueDate: '2024-02-10',
      createdAt: '2024-01-08T09:00:00Z',
      updatedAt: '2024-01-15T16:30:00Z',
      comments: [
        {
          id: 'comment-3',
          author: 'Sarah Chen',
          content: 'Make sure to implement rate limiting for login attempts',
          timestamp: '2024-01-09T10:00:00Z'
        }
      ],
      attachments: [],
      order: 0
    },
    {
      id: 'task-5',
      key: 'ALPHA-5',
      listId: 'list-2',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'WebSocket real-time updates',
      description: 'Implement WebSocket connections for real-time board updates and notifications.',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'James Wilson',
      reporter: 'David Kim',
      labels: ['frontend', 'backend', 'feature'],
      estimate: '4d',
      storyPoints: 5,
      dueDate: '2024-02-16',
      createdAt: '2024-01-13T11:00:00Z',
      updatedAt: '2024-01-14T09:15:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-6',
      key: 'ALPHA-6',
      listId: 'list-3',
      projectId: 'project-1',
      teamId: 'team-2',
      title: 'Dashboard UI components',
      description: 'Build reusable dashboard components including charts, metrics cards, and data tables with responsive design.',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Emily Rodriguez',
      reporter: 'David Kim',
      labels: ['frontend', 'ui', 'feature'],
      estimate: '6d',
      storyPoints: 8,
      dueDate: '2024-02-18',
      createdAt: '2024-01-12T10:30:00Z',
      updatedAt: '2024-01-15T14:00:00Z',
      comments: [
        {
          id: 'comment-4',
          author: 'Emily Rodriguez',
          content: 'Working on the chart components first, using recharts library',
          timestamp: '2024-01-15T14:00:00Z'
        }
      ],
      attachments: [
        {
          id: 'attach-2',
          name: 'dashboard-mockups.pdf',
          size: '2.3mb',
          url: '#'
        }
      ],
      order: 0
    },
    {
      id: 'task-7',
      key: 'ALPHA-7',
      listId: 'list-3',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'API rate limiting',
      description: 'Implement rate limiting middleware to prevent API abuse and ensure fair usage.',
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Doe',
      reporter: 'Sarah Chen',
      labels: ['backend', 'security', 'enhancement'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-02-12',
      createdAt: '2024-01-10T15:00:00Z',
      updatedAt: '2024-01-15T11:30:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-8',
      key: 'ALPHA-8',
      listId: 'list-3',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Email notification service',
      description: 'Set up email notification system for task assignments, comments, and due date reminders.',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      reporter: 'David Kim',
      labels: ['backend', 'feature'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-02-17',
      createdAt: '2024-01-13T08:30:00Z',
      updatedAt: '2024-01-14T16:45:00Z',
      comments: [],
      attachments: [],
      order: 2
    },
    {
      id: 'task-9',
      key: 'ALPHA-9',
      listId: 'list-4',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Performance optimization',
      description: 'Optimize bundle size, implement code splitting, and improve initial load times.',
      priority: 'high',
      status: 'review',
      assignee: 'James Wilson',
      reporter: 'Sarah Chen',
      labels: ['frontend', 'performance', 'enhancement'],
      estimate: '4d',
      storyPoints: 5,
      dueDate: '2024-02-12',
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-15T17:00:00Z',
      comments: [
        {
          id: 'comment-5',
          author: 'James Wilson',
          content: 'Reduced bundle size by 40% using dynamic imports',
          timestamp: '2024-01-15T17:00:00Z'
        },
        {
          id: 'comment-6',
          author: 'Sarah Chen',
          content: 'Great work! Please add performance metrics to the PR description.',
          timestamp: '2024-01-15T17:15:00Z'
        }
      ],
      attachments: [],
      order: 0
    },
    {
      id: 'task-10',
      key: 'ALPHA-10',
      listId: 'list-4',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Unit test coverage',
      description: 'Write comprehensive unit tests for all core modules to achieve 80%+ coverage.',
      priority: 'medium',
      status: 'review',
      assignee: 'Lisa Anderson',
      reporter: 'Sarah Chen',
      labels: ['testing', 'backend', 'frontend'],
      estimate: '5d',
      storyPoints: 8,
      dueDate: '2024-02-14',
      createdAt: '2024-01-06T10:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-11',
      key: 'ALPHA-11',
      listId: 'list-5',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Initial project setup',
      description: 'Set up repository, CI/CD pipelines, Docker containers, and development environment.',
      priority: 'high',
      status: 'done',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'feature'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-01-15',
      createdAt: '2024-01-01T09:00:00Z',
      updatedAt: '2024-01-15T18:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-12',
      key: 'ALPHA-12',
      listId: 'list-5',
      projectId: 'project-1',
      teamId: 'team-3',
      title: 'Requirements gathering',
      description: 'Collect and document all project requirements, user stories, and acceptance criteria.',
      priority: 'high',
      status: 'done',
      assignee: 'David Kim',
      reporter: 'Sarah Chen',
      labels: ['documentation'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-01-08',
      createdAt: '2024-01-02T09:00:00Z',
      updatedAt: '2024-01-08T17:00:00Z',
      comments: [],
      attachments: [
        {
          id: 'attach-3',
          name: 'requirements.docx',
          size: '156kb',
          url: '#'
        }
      ],
      order: 1
    },
    {
      id: 'task-13',
      key: 'ALPHA-13',
      listId: 'list-5',
      projectId: 'project-1',
      teamId: 'team-2',
      title: 'Logo and branding design',
      description: 'Create company logo, color palette, and brand guidelines.',
      priority: 'medium',
      status: 'done',
      assignee: 'Emily Rodriguez',
      reporter: 'Maria Garcia',
      labels: ['design'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-01-10',
      createdAt: '2024-01-03T10:00:00Z',
      updatedAt: '2024-01-10T16:00:00Z',
      comments: [],
      attachments: [],
      order: 2
    },
    {
      id: 'task-14',
      key: 'ALPHA-14',
      listId: 'list-5',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Database schema design',
      description: 'Design normalized database schema with proper indexing and relationships.',
      priority: 'high',
      status: 'done',
      assignee: 'John Doe',
      reporter: 'Sarah Chen',
      labels: ['database', 'backend'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-01-12',
      createdAt: '2024-01-04T09:00:00Z',
      updatedAt: '2024-01-12T15:00:00Z',
      comments: [],
      attachments: [],
      order: 3
    },
    {
      id: 'task-15',
      key: 'ALPHA-15',
      listId: 'list-5',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Security audit',
      description: 'Conduct comprehensive security audit and fix identified vulnerabilities.',
      priority: 'high',
      status: 'done',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['security', 'backend'],
      estimate: '4d',
      storyPoints: 8,
      dueDate: '2024-01-14',
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-14T17:30:00Z',
      comments: [],
      attachments: [],
      order: 4
    },

    // Project Beta tasks
    {
      id: 'task-16',
      key: 'BETA-1',
      listId: 'list-6',
      projectId: 'project-2',
      teamId: 'team-4',
      title: 'Marketing website redesign',
      description: 'Redesign the marketing website with modern UI and improved conversion funnel.',
      priority: 'high',
      status: 'todo',
      assignee: 'Emily Rodriguez',
      reporter: 'Maria Garcia',
      labels: ['design', 'frontend'],
      estimate: '8d',
      storyPoints: 13,
      dueDate: '2024-02-25',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-17',
      key: 'BETA-2',
      listId: 'list-6',
      projectId: 'project-2',
      teamId: 'team-4',
      title: 'Social media campaign',
      description: 'Plan and execute social media campaign for product launch.',
      priority: 'medium',
      status: 'todo',
      assignee: 'Maria Garcia',
      reporter: 'David Kim',
      labels: ['documentation'],
      estimate: '5d',
      storyPoints: 5,
      dueDate: '2024-02-20',
      createdAt: '2024-01-11T10:00:00Z',
      updatedAt: '2024-01-11T10:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-18',
      key: 'BETA-3',
      listId: 'list-6',
      projectId: 'project-2',
      teamId: 'team-2',
      title: 'Product demo video',
      description: 'Create professional product demo video highlighting key features.',
      priority: 'medium',
      status: 'todo',
      assignee: 'Emily Rodriguez',
      reporter: 'Maria Garcia',
      labels: ['design'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-02-22',
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-12T11:00:00Z',
      comments: [],
      attachments: [],
      order: 2
    },
    {
      id: 'task-19',
      key: 'BETA-4',
      listId: 'list-7',
      projectId: 'project-2',
      teamId: 'team-4',
      title: 'Email marketing templates',
      description: 'Design and implement responsive email templates for newsletters and announcements.',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Emily Rodriguez',
      reporter: 'Maria Garcia',
      labels: ['design', 'frontend'],
      estimate: '4d',
      storyPoints: 5,
      dueDate: '2024-02-18',
      createdAt: '2024-01-08T09:30:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-20',
      key: 'BETA-5',
      listId: 'list-7',
      projectId: 'project-2',
      teamId: 'team-4',
      title: 'Blog content strategy',
      description: 'Develop content calendar and write initial blog posts for SEO.',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Maria Garcia',
      reporter: 'David Kim',
      labels: ['documentation'],
      estimate: '6d',
      storyPoints: 8,
      dueDate: '2024-02-24',
      createdAt: '2024-01-09T14:00:00Z',
      updatedAt: '2024-01-15T09:30:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-21',
      key: 'BETA-6',
      listId: 'list-8',
      projectId: 'project-2',
      teamId: 'team-2',
      title: 'Landing page A/B testing',
      description: 'Set up and run A/B tests on landing page variants to optimize conversion.',
      priority: 'high',
      status: 'review',
      assignee: 'James Wilson',
      reporter: 'Maria Garcia',
      labels: ['frontend', 'testing'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-02-15',
      createdAt: '2024-01-06T10:00:00Z',
      updatedAt: '2024-01-15T16:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-22',
      key: 'BETA-7',
      listId: 'list-9',
      projectId: 'project-2',
      teamId: 'team-4',
      title: 'Press release',
      description: 'Write and distribute press release for product launch.',
      priority: 'medium',
      status: 'done',
      assignee: 'Maria Garcia',
      reporter: 'David Kim',
      labels: ['documentation'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-01-20',
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-20T17:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-23',
      key: 'BETA-8',
      listId: 'list-9',
      projectId: 'project-2',
      teamId: 'team-2',
      title: 'Brand guidelines document',
      description: 'Create comprehensive brand guidelines including logo usage, colors, and typography.',
      priority: 'high',
      status: 'done',
      assignee: 'Emily Rodriguez',
      reporter: 'Maria Garcia',
      labels: ['design', 'documentation'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-01-18',
      createdAt: '2024-01-03T10:00:00Z',
      updatedAt: '2024-01-18T16:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    },

    // Project Gamma tasks
    {
      id: 'task-24',
      key: 'GAMMA-1',
      listId: 'list-10',
      projectId: 'project-3',
      teamId: 'team-1',
      title: 'Kubernetes cluster setup',
      description: 'Set up production-ready Kubernetes cluster with monitoring and auto-scaling.',
      priority: 'high',
      status: 'todo',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'backend'],
      estimate: '5d',
      storyPoints: 8,
      dueDate: '2024-02-22',
      createdAt: '2024-01-12T09:00:00Z',
      updatedAt: '2024-01-12T09:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-25',
      key: 'GAMMA-2',
      listId: 'list-10',
      projectId: 'project-3',
      teamId: 'team-1',
      title: 'Backup and disaster recovery',
      description: 'Implement automated backup system and disaster recovery procedures.',
      priority: 'high',
      status: 'todo',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'database'],
      estimate: '4d',
      storyPoints: 8,
      dueDate: '2024-02-25',
      createdAt: '2024-01-13T10:00:00Z',
      updatedAt: '2024-01-13T10:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-26',
      key: 'GAMMA-3',
      listId: 'list-11',
      projectId: 'project-3',
      teamId: 'team-1',
      title: 'CDN configuration',
      description: 'Configure CDN for static assets with cache invalidation and geo-distribution.',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'performance'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-02-16',
      createdAt: '2024-01-10T11:00:00Z',
      updatedAt: '2024-01-15T13:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-27',
      key: 'GAMMA-4',
      listId: 'list-11',
      projectId: 'project-3',
      teamId: 'team-1',
      title: 'Monitoring and alerting',
      description: 'Set up comprehensive monitoring with Prometheus and Grafana dashboards.',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'backend'],
      estimate: '3d',
      storyPoints: 5,
      dueDate: '2024-02-19',
      createdAt: '2024-01-11T09:00:00Z',
      updatedAt: '2024-01-15T15:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    },
    {
      id: 'task-28',
      key: 'GAMMA-5',
      listId: 'list-12',
      projectId: 'project-3',
      teamId: 'team-1',
      title: 'SSL certificate automation',
      description: 'Automate SSL certificate generation and renewal using Let\'s Encrypt.',
      priority: 'medium',
      status: 'done',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'security'],
      estimate: '1d',
      storyPoints: 2,
      dueDate: '2024-01-16',
      createdAt: '2024-01-08T09:00:00Z',
      updatedAt: '2024-01-16T17:00:00Z',
      comments: [],
      attachments: [],
      order: 0
    },
    {
      id: 'task-29',
      key: 'GAMMA-6',
      listId: 'list-12',
      projectId: 'project-3',
      teamId: 'team-1',
      title: 'Load balancer configuration',
      description: 'Configure load balancer with health checks and SSL termination.',
      priority: 'high',
      status: 'done',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Chen',
      labels: ['devops', 'backend'],
      estimate: '2d',
      storyPoints: 3,
      dueDate: '2024-01-18',
      createdAt: '2024-01-09T10:00:00Z',
      updatedAt: '2024-01-18T16:00:00Z',
      comments: [],
      attachments: [],
      order: 1
    }
  ]
};

// Available options for filters
export const filterOptions = {
  priorities: ['low', 'medium', 'high'],
  statuses: ['todo', 'in-progress', 'review', 'done'],
  assignees: users.map(u => u.name),
  labels: labels.map(l => l.name)
};
