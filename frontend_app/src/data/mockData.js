// Mock data for the Kanban board application

// PUBLIC_INTERFACE
/**
 * Generate unique IDs for new items
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Projects mock data
export const projects = [
  {
    id: 'project-1',
    name: 'Project Alpha',
    description: 'Main development board',
    color: '#0052CC',
    taskCount: 8
  },
  {
    id: 'project-2',
    name: 'Project Beta',
    description: 'Marketing and design initiatives',
    color: '#00875A',
    taskCount: 5
  },
  {
    id: 'project-3',
    name: 'Project Gamma',
    description: 'Infrastructure improvements',
    color: '#FF991F',
    taskCount: 3
  }
];

// Teams mock data
export const teams = [
  {
    id: 'team-1',
    name: 'Engineering',
    color: '#0052CC',
    memberCount: 8
  },
  {
    id: 'team-2',
    name: 'Design',
    color: '#6554C0',
    memberCount: 4
  },
  {
    id: 'team-3',
    name: 'Product',
    color: '#00875A',
    memberCount: 5
  },
  {
    id: 'team-4',
    name: 'Marketing',
    color: '#FF991F',
    memberCount: 6
  }
];

// Initial mock data
export const initialMockData = {
  boards: [
    {
      id: 'board-1',
      title: 'Project Alpha',
      description: 'Main development board',
      projectId: 'project-1'
    }
  ],
  lists: [
    {
      id: 'list-1',
      boardId: 'board-1',
      title: 'To Do',
      order: 0
    },
    {
      id: 'list-2',
      boardId: 'board-1',
      title: 'In Progress',
      order: 1
    },
    {
      id: 'list-3',
      boardId: 'board-1',
      title: 'Review',
      order: 2
    },
    {
      id: 'list-4',
      boardId: 'board-1',
      title: 'Done',
      order: 3
    }
  ],
  tasks: [
    {
      id: 'task-1',
      listId: 'list-1',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Design system setup',
      description: 'Create a comprehensive design system with colors, typography, and components',
      priority: 'high',
      status: 'todo',
      assignee: 'Sarah Chen',
      labels: ['design', 'frontend'],
      dueDate: '2024-02-15',
      createdAt: '2024-01-10',
      order: 0
    },
    {
      id: 'task-2',
      listId: 'list-1',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'API documentation',
      description: 'Document all REST API endpoints with examples',
      priority: 'medium',
      status: 'todo',
      assignee: 'John Doe',
      labels: ['backend', 'documentation'],
      dueDate: '2024-02-20',
      createdAt: '2024-01-11',
      order: 1
    },
    {
      id: 'task-3',
      listId: 'list-2',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'User authentication flow',
      description: 'Implement OAuth2 authentication with refresh tokens',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      labels: ['backend', 'security'],
      dueDate: '2024-02-10',
      createdAt: '2024-01-08',
      order: 0
    },
    {
      id: 'task-4',
      listId: 'list-2',
      projectId: 'project-1',
      teamId: 'team-2',
      title: 'Dashboard UI components',
      description: 'Build reusable dashboard components with charts and metrics',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Sarah Chen',
      labels: ['frontend', 'ui'],
      dueDate: '2024-02-18',
      createdAt: '2024-01-12',
      order: 1
    },
    {
      id: 'task-5',
      listId: 'list-3',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Performance optimization',
      description: 'Optimize bundle size and improve load times',
      priority: 'high',
      status: 'review',
      assignee: 'John Doe',
      labels: ['frontend', 'performance'],
      dueDate: '2024-02-12',
      createdAt: '2024-01-05',
      order: 0
    },
    {
      id: 'task-6',
      listId: 'list-3',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Database migration',
      description: 'Migrate from MongoDB to PostgreSQL',
      priority: 'high',
      status: 'review',
      assignee: 'Mike Johnson',
      labels: ['backend', 'database'],
      dueDate: '2024-02-14',
      createdAt: '2024-01-06',
      order: 1
    },
    {
      id: 'task-7',
      listId: 'list-4',
      projectId: 'project-1',
      teamId: 'team-1',
      title: 'Initial project setup',
      description: 'Set up repository, CI/CD, and development environment',
      priority: 'high',
      status: 'done',
      assignee: 'Mike Johnson',
      labels: ['devops'],
      dueDate: '2024-01-15',
      createdAt: '2024-01-01',
      order: 0
    },
    {
      id: 'task-8',
      listId: 'list-4',
      projectId: 'project-1',
      teamId: 'team-3',
      title: 'Requirements gathering',
      description: 'Collect and document all project requirements',
      priority: 'medium',
      status: 'done',
      assignee: 'Sarah Chen',
      labels: ['planning'],
      dueDate: '2024-01-20',
      createdAt: '2024-01-02',
      order: 1
    }
  ]
};

// Available options for filters
export const filterOptions = {
  priorities: ['low', 'medium', 'high'],
  statuses: ['todo', 'in-progress', 'review', 'done'],
  assignees: ['Sarah Chen', 'John Doe', 'Mike Johnson'],
  labels: ['design', 'frontend', 'backend', 'documentation', 'security', 'ui', 'performance', 'database', 'devops', 'planning']
};
