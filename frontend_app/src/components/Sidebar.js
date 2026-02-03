import React, { useState } from 'react';
import { FiGrid, FiCalendar, FiBarChart2, FiSettings, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { filterOptions } from '../data/mockData';
import './Sidebar.css';

// PUBLIC_INTERFACE
/**
 * Sidebar component with navigation and filter controls
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = () => {
  const { state, actions } = useAppContext();
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

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

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Navigation</h3>
          <nav className="sidebar-nav">
            <button className="nav-item active">
              <FiGrid className="nav-icon" />
              Board
            </button>
            <button className="nav-item">
              <FiCalendar className="nav-icon" />
              Calendar
            </button>
            <button className="nav-item">
              <FiBarChart2 className="nav-icon" />
              Reports
            </button>
            <button className="nav-item">
              <FiSettings className="nav-icon" />
              Settings
            </button>
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-header">
            <h3 className="sidebar-title">Filters</h3>
            <button
              className="expand-toggle"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              aria-label="Toggle filters"
            >
              {isFiltersExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </button>
          </div>

          {isFiltersExpanded && (
            <div className="filters-content">
              {/* Search */}
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="filter-search"
                  placeholder="Search tasks..."
                  value={state.searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                />
              </div>

              {/* Priority Filter */}
              <div className="filter-group">
                <label className="filter-label">Priority</label>
                <div className="filter-options">
                  {filterOptions.priorities.map(priority => (
                    <button
                      key={priority}
                      className={`filter-chip ${state.filters.priority === priority ? 'active' : ''}`}
                      onClick={() => handleFilterChange('priority', priority)}
                    >
                      <span className={`priority-dot priority-${priority}`}></span>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <div className="filter-options">
                  {filterOptions.statuses.map(status => (
                    <button
                      key={status}
                      className={`filter-chip ${state.filters.status === status ? 'active' : ''}`}
                      onClick={() => handleFilterChange('status', status)}
                    >
                      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignee Filter */}
              <div className="filter-group">
                <label className="filter-label">Assignee</label>
                <div className="filter-options">
                  {filterOptions.assignees.map(assignee => (
                    <button
                      key={assignee}
                      className={`filter-chip ${state.filters.assignee === assignee ? 'active' : ''}`}
                      onClick={() => handleFilterChange('assignee', assignee)}
                    >
                      {assignee}
                    </button>
                  ))}
                </div>
              </div>

              {/* Labels Filter */}
              <div className="filter-group">
                <label className="filter-label">Labels</label>
                <div className="filter-options">
                  {filterOptions.labels.map(label => (
                    <button
                      key={label}
                      className={`filter-chip ${state.filters.labels.includes(label) ? 'active' : ''}`}
                      onClick={() => handleFilterChange('labels', label)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters() && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
