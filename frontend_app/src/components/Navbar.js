import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

// PUBLIC_INTERFACE
/**
 * Navbar component displaying the application header with view mode toggle
 * @returns {JSX.Element} Navbar component
 */
const Navbar = () => {
  const { state, actions } = useAppContext();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <span className="logo-icon">📋</span>
          <span className="logo-text">ProKanban</span>
        </div>
        <div className="navbar-board-name">
          {state.boards[0]?.title || 'Kanban Board'}
        </div>
      </div>

      <div className="navbar-center">
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${state.viewMode === 'board' ? 'active' : ''}`}
            onClick={() => actions.setViewMode('board')}
            aria-label="Board view"
          >
            <span className="view-icon">⊞</span>
            Board
          </button>
          <button
            className={`view-toggle-btn ${state.viewMode === 'list' ? 'active' : ''}`}
            onClick={() => actions.setViewMode('list')}
            aria-label="List view"
          >
            <span className="view-icon">☰</span>
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
