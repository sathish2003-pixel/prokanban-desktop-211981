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
 * Main content component that renders the appropriate view
 * @returns {JSX.Element} AppContent component
 */
const AppContent = () => {
  const { state } = useAppContext();

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          {state.viewMode === 'board' ? <BoardView /> : <ListView />}
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
