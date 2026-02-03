import React from 'react';
import { FiGrid, FiList, FiClipboard, FiMenu, FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { projects } from '../data/mockData';
import './Navbar.css';

// PUBLIC_INTERFACE
/**
 * Navbar component displaying the application header with view mode toggle and current project
 * @returns {JSX.Element} Navbar component
 */
const Navbar = () => {
  const { state, actions } = useAppContext();

  const handleToggleSidebar = () => {
    actions.toggleSidebar(!state.isSidebarCollapsed);
  };

  const getCurrentProject = () => {
    return projects.find(p => p.id === state.currentProjectId) || projects[0];
  };

  const currentProject = getCurrentProject();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={handleToggleSidebar}
          aria-label={state.isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!state.isSidebarCollapsed}
          title={state.isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {state.isSidebarCollapsed ? <FiMenu className="toggle-icon" /> : <FiX className="toggle-icon" />}
        </button>
        <div className="navbar-logo">
          <FiClipboard className="logo-icon" />
          <span className="logo-text">ProKanban</span>
        </div>
        <div className="navbar-board-name">
          <span className="project-indicator" style={{ backgroundColor: currentProject.color }}></span>
          {currentProject.name}
        </div>
      </div>

      <div className="navbar-center">
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${state.viewMode === 'board' ? 'active' : ''}`}
            onClick={() => actions.setViewMode('board')}
            aria-label="Board view"
          >
            <FiGrid className="view-icon" />
            Board
          </button>
          <button
            className={`view-toggle-btn ${state.viewMode === 'list' ? 'active' : ''}`}
            onClick={() => actions.setViewMode('list')}
            aria-label="List view"
          >
            <FiList className="view-icon" />
            List
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <div className="user-avatar">SC</div>
          <span className="user-name">Sarah Chen</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
