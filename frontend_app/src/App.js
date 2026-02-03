import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BoardView from './components/BoardView';
import ListView from './components/ListView';
import TaskDetailsPanel from './components/TaskDetailsPanel';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Placeholder component for Calendar view
 * @returns {JSX.Element} CalendarView component
 */
const CalendarView = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2 style={{ color: 'var(--color-text)', marginBottom: '16px' }}>Calendar View</h2>
    <p style={{ color: 'var(--color-text-secondary)' }}>Calendar functionality coming soon...</p>
  </div>
);

// PUBLIC_INTERFACE
/**
 * Placeholder component for Reports view
 * @returns {JSX.Element} ReportsView component
 */
const ReportsView = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2 style={{ color: 'var(--color-text)', marginBottom: '16px' }}>Reports View</h2>
    <p style={{ color: 'var(--color-text-secondary)' }}>Reports and analytics coming soon...</p>
  </div>
);

// PUBLIC_INTERFACE
/**
 * Placeholder component for Settings view
 * @returns {JSX.Element} SettingsView component
 */
const SettingsView = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2 style={{ color: 'var(--color-text)', marginBottom: '16px' }}>Settings</h2>
    <p style={{ color: 'var(--color-text-secondary)' }}>Settings and preferences coming soon...</p>
  </div>
);

// PUBLIC_INTERFACE
/**
 * Main content component that renders the appropriate view
 * @returns {JSX.Element} AppContent component
 */
const AppContent = () => {
  const { state } = useAppContext();

  const renderMainContent = () => {
    switch (state.activeNav) {
      case 'calendar':
        return <CalendarView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'board':
      default:
        return state.viewMode === 'board' ? <BoardView /> : <ListView />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main 
          className={`main-content ${state.isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
          id="main-content"
          role="main"
        >
          {renderMainContent()}
        </main>
      </div>
      {state.selectedTaskId && <TaskDetailsPanel />}
    </div>
  );
};

// PUBLIC_INTERFACE
/**
 * Root App component wrapped with AppProvider for state management
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
