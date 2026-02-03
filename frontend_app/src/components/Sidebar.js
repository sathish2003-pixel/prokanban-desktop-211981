import React, { useState, useRef, useEffect } from 'react';
import { FiGrid, FiCalendar, FiBarChart2, FiSettings, FiChevronDown, FiChevronRight, FiFolder, FiUsers } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { filterOptions, projects, teams } from '../data/mockData';
import './Sidebar.css';

// PUBLIC_INTERFACE
/**
 * Sidebar component with navigation, projects, teams, and filter controls
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = () => {
  const { state, actions } = useAppContext();
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const [isTeamsExpanded, setIsTeamsExpanded] = useState(true);
  const [isPeeking, setIsPeeking] = useState(false);
  const sidebarRef = useRef(null);
  const peekTimeoutRef = useRef(null);

  const handleFilterChange = (filterType, value) => {
    const currentValue = state.filters[filterType];
    
    if (filterType === 'labels') {
      const currentLabels = state.filters.labels || [];
      const newLabels = currentLabels.includes(value)
        ? currentLabels.filter(l => l !== value)
        : [...currentLabels, value];
      actions.setFilters({ labels: newLabels });
    } else {
      actions.setFilters({ [filterType]: currentValue === value ? null : value });
    }
  };

  const clearFilters = () => {
    actions.setFilters({
      priority: null,
      status: null,
      assignee: null,
      labels: []
    });
    actions.setSearchQuery('');
  };

  const hasActiveFilters = () => {
    return state.filters.priority || 
           state.filters.status || 
           state.filters.assignee || 
           state.filters.labels.length > 0 ||
           state.searchQuery;
  };

  const handleNavClick = (navItem) => {
    actions.setActiveNav(navItem);
    if (navItem === 'board') {
      actions.setViewMode('board');
    }
  };

  const handleProjectClick = (projectId) => {
    actions.setCurrentProject(projectId);
    actions.setActiveNav('board');
    actions.setViewMode('board');
  };

  const handleTeamClick = (teamId) => {
    // Toggle team selection (clicking same team deselects it)
    if (state.selectedTeamId === teamId) {
      actions.setSelectedTeam(null);
    } else {
      actions.setSelectedTeam(teamId);
    }
  };

  const { isSidebarCollapsed } = state;

  // Hover-to-peek handlers
  const handleMouseEnter = () => {
    if (isSidebarCollapsed) {
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current);
      }
      peekTimeoutRef.current = setTimeout(() => {
        setIsPeeking(true);
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (isSidebarCollapsed) {
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current);
      }
      setIsPeeking(false);
    }
  };

  const handleFocusIn = (e) => {
    if (isSidebarCollapsed && sidebarRef.current && sidebarRef.current.contains(e.target)) {
      setIsPeeking(true);
    }
  };

  const handleFocusOut = (e) => {
    if (isSidebarCollapsed && sidebarRef.current && !sidebarRef.current.contains(e.relatedTarget)) {
      setIsPeeking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current);
      }
    };
  }, []);

  const shouldShowExpanded = !isSidebarCollapsed || isPeeking;

  const getCurrentProject = () => {
    return projects.find(p => p.id === state.currentProjectId);
  };

  const getProjectTaskCount = (projectId) => {
    return state.tasks.filter(t => t.projectId === projectId).length;
  };

  const getTeamTaskCount = (teamId) => {
    return state.tasks.filter(t => t.teamId === teamId).length;
  };

  return (
    <aside 
      ref={sidebarRef}
      className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isPeeking ? 'peek-expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="sidebar-content">
        {/* Navigation Section */}
        <div className="sidebar-section">
          {shouldShowExpanded && <h3 className="sidebar-title">Navigation</h3>}
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${state.activeNav === 'board' ? 'active' : ''}`}
              onClick={() => handleNavClick('board')}
              title={isSidebarCollapsed && !isPeeking ? 'Board' : ''}
              aria-label="Board"
              aria-selected={state.activeNav === 'board'}
              aria-controls="main-content"
              tabIndex={0}
            >
              <FiGrid className="nav-icon" />
              {shouldShowExpanded && <span className="nav-text">Board</span>}
            </button>
            <button 
              className={`nav-item ${state.activeNav === 'calendar' ? 'active' : ''}`}
              onClick={() => handleNavClick('calendar')}
              title={isSidebarCollapsed && !isPeeking ? 'Calendar' : ''}
              aria-label="Calendar"
              aria-selected={state.activeNav === 'calendar'}
              aria-controls="main-content"
              tabIndex={0}
            >
              <FiCalendar className="nav-icon" />
              {shouldShowExpanded && <span className="nav-text">Calendar</span>}
            </button>
            <button 
              className={`nav-item ${state.activeNav === 'reports' ? 'active' : ''}`}
              onClick={() => handleNavClick('reports')}
              title={isSidebarCollapsed && !isPeeking ? 'Reports' : ''}
              aria-label="Reports"
              aria-selected={state.activeNav === 'reports'}
              aria-controls="main-content"
              tabIndex={0}
            >
              <FiBarChart2 className="nav-icon" />
              {shouldShowExpanded && <span className="nav-text">Reports</span>}
            </button>
            <button 
              className={`nav-item ${state.activeNav === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavClick('settings')}
              title={isSidebarCollapsed && !isPeeking ? 'Settings' : ''}
              aria-label="Settings"
              aria-selected={state.activeNav === 'settings'}
              aria-controls="main-content"
              tabIndex={0}
            >
              <FiSettings className="nav-icon" />
              {shouldShowExpanded && <span className="nav-text">Settings</span>}
            </button>
          </nav>
        </div>

        {/* Projects Section */}
        {shouldShowExpanded && (
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <FiFolder style={{ display: 'inline', marginRight: '6px' }} />
                Projects
              </h3>
              <button
                className="expand-toggle"
                onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                aria-label="Toggle projects"
                aria-expanded={isProjectsExpanded}
                tabIndex={0}
              >
                {isProjectsExpanded ? <FiChevronDown /> : <FiChevronRight />}
              </button>
            </div>

            {isProjectsExpanded && (
              <div className="projects-list">
                {projects.map(project => (
                  <button
                    key={project.id}
                    className={`project-item ${state.currentProjectId === project.id ? 'active' : ''}`}
                    onClick={() => handleProjectClick(project.id)}
                    aria-label={`Switch to ${project.name}`}
                    aria-selected={state.currentProjectId === project.id}
                    tabIndex={0}
                  >
                    <div className="project-info">
                      <span 
                        className="project-color" 
                        style={{ backgroundColor: project.color }}
                        aria-hidden="true"
                      ></span>
                      <span className="project-name">{project.name}</span>
                    </div>
                    <span className="project-count" aria-label={`${getProjectTaskCount(project.id)} tasks`}>
                      {getProjectTaskCount(project.id)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Teams Section */}
        {shouldShowExpanded && (
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <FiUsers style={{ display: 'inline', marginRight: '6px' }} />
                Teams
              </h3>
              <button
                className="expand-toggle"
                onClick={() => setIsTeamsExpanded(!isTeamsExpanded)}
                aria-label="Toggle teams"
                aria-expanded={isTeamsExpanded}
                tabIndex={0}
              >
                {isTeamsExpanded ? <FiChevronDown /> : <FiChevronRight />}
              </button>
            </div>

            {isTeamsExpanded && (
              <div className="teams-list">
                <button
                  className={`team-item ${state.selectedTeamId === null ? 'active' : ''}`}
                  onClick={() => actions.setSelectedTeam(null)}
                  aria-label="Show all teams"
                  aria-selected={state.selectedTeamId === null}
                  tabIndex={0}
                >
                  <div className="team-info">
                    <span className="team-name">All Teams</span>
                  </div>
                  <span className="team-count" aria-label={`${state.tasks.length} tasks`}>
                    {state.tasks.length}
                  </span>
                </button>
                {teams.map(team => (
                  <button
                    key={team.id}
                    className={`team-item ${state.selectedTeamId === team.id ? 'active' : ''}`}
                    onClick={() => handleTeamClick(team.id)}
                    aria-label={`Filter by ${team.name}`}
                    aria-selected={state.selectedTeamId === team.id}
                    tabIndex={0}
                  >
                    <div className="team-info">
                      <span 
                        className="team-color" 
                        style={{ backgroundColor: team.color }}
                        aria-hidden="true"
                      ></span>
                      <span className="team-name">{team.name}</span>
                    </div>
                    <span className="team-count" aria-label={`${getTeamTaskCount(team.id)} tasks`}>
                      {getTeamTaskCount(team.id)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Filters Section */}
        {shouldShowExpanded && (
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">Filters</h3>
              <button
                className="expand-toggle"
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                aria-label="Toggle filters"
                aria-expanded={isFiltersExpanded}
                tabIndex={0}
              >
                {isFiltersExpanded ? <FiChevronDown /> : <FiChevronRight />}
              </button>
            </div>

            {isFiltersExpanded && (
            <div className="filters-content">
              {/* Search */}
              <div className="filter-group">
                <label className="filter-label" htmlFor="task-search">Search</label>
                <input
                  id="task-search"
                  type="text"
                  className="filter-search"
                  placeholder="Search tasks..."
                  value={state.searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                  aria-label="Search tasks"
                />
              </div>

              {/* Priority Filter */}
              <div className="filter-group">
                <label className="filter-label">Priority</label>
                <div className="filter-options" role="group" aria-label="Priority filters">
                  {filterOptions.priorities.map(priority => (
                    <button
                      key={priority}
                      className={`filter-chip ${state.filters.priority === priority ? 'active' : ''}`}
                      onClick={() => handleFilterChange('priority', priority)}
                      aria-pressed={state.filters.priority === priority}
                      tabIndex={0}
                    >
                      <span className={`priority-dot priority-${priority}`} aria-hidden="true"></span>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <div className="filter-options" role="group" aria-label="Status filters">
                  {filterOptions.statuses.map(status => (
                    <button
                      key={status}
                      className={`filter-chip ${state.filters.status === status ? 'active' : ''}`}
                      onClick={() => handleFilterChange('status', status)}
                      aria-pressed={state.filters.status === status}
                      tabIndex={0}
                    >
                      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignee Filter */}
              <div className="filter-group">
                <label className="filter-label">Assignee</label>
                <div className="filter-options" role="group" aria-label="Assignee filters">
                  {filterOptions.assignees.map(assignee => (
                    <button
                      key={assignee}
                      className={`filter-chip ${state.filters.assignee === assignee ? 'active' : ''}`}
                      onClick={() => handleFilterChange('assignee', assignee)}
                      aria-pressed={state.filters.assignee === assignee}
                      tabIndex={0}
                    >
                      {assignee}
                    </button>
                  ))}
                </div>
              </div>

              {/* Labels Filter */}
              <div className="filter-group">
                <label className="filter-label">Labels</label>
                <div className="filter-options" role="group" aria-label="Label filters">
                  {filterOptions.labels.map(label => (
                    <button
                      key={label}
                      className={`filter-chip ${state.filters.labels.includes(label) ? 'active' : ''}`}
                      onClick={() => handleFilterChange('labels', label)}
                      aria-pressed={state.filters.labels.includes(label)}
                      tabIndex={0}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters() && (
                <button className="clear-filters-btn" onClick={clearFilters} tabIndex={0}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
