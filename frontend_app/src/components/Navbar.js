import React from 'react';
import { FiGrid, FiList, FiClipboard } from 'react-icons/fi';
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
          <FiClipboard className="logo-icon" />
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
