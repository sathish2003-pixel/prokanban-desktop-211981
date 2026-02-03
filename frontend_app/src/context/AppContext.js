import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialMockData, generateId } from '../data/mockData';

const AppContext = createContext();

// Action types
const ActionTypes = {
  SET_DATA: 'SET_DATA',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
  REORDER_TASKS: 'REORDER_TASKS',
  ADD_LIST: 'ADD_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
  DELETE_LIST: 'DELETE_LIST',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SET_SELECTED_TASK: 'SET_SELECTED_TASK',
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    case ActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        )
      };

    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case ActionTypes.MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, listId: action.payload.newListId }
            : task
        )
      };

    case ActionTypes.REORDER_TASKS:
      return {
        ...state,
        tasks: action.payload
      };

    case ActionTypes.ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      };

    case ActionTypes.UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.id ? { ...list, ...action.payload.updates } : list
        )
      };

    case ActionTypes.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
        tasks: state.tasks.filter(task => task.listId !== action.payload)
      };

    case ActionTypes.SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };

    case ActionTypes.SET_SELECTED_TASK:
      return { ...state, selectedTaskId: action.payload };

    case ActionTypes.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case ActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case ActionTypes.TOGGLE_SIDEBAR:
      return { ...state, isSidebarCollapsed: action.payload };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  boards: [],
  lists: [],
  tasks: [],
  viewMode: 'board', // 'board' or 'list'
  selectedTaskId: null,
  filters: {
    priority: null,
    status: null,
    assignee: null,
    labels: []
  },
  searchQuery: '',
  isSidebarCollapsed: false
};

// PUBLIC_INTERFACE
/**
 * AppProvider component that wraps the application with state management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('kanbanData');
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: ActionTypes.SET_DATA, payload: parsed });
      } catch (error) {
        console.error('Error loading saved data:', error);
        dispatch({ type: ActionTypes.SET_DATA, payload: initialMockData });
      }
    } else {
      dispatch({ type: ActionTypes.SET_DATA, payload: initialMockData });
    }

    // Load sidebar collapsed state
    if (savedSidebarState !== null) {
      dispatch({ 
        type: ActionTypes.TOGGLE_SIDEBAR, 
        payload: savedSidebarState === 'true' 
      });
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (state.boards.length > 0) {
      const dataToSave = {
        boards: state.boards,
        lists: state.lists,
        tasks: state.tasks
      };
      localStorage.setItem('kanbanData', JSON.stringify(dataToSave));
    }
  }, [state.boards, state.lists, state.tasks]);

  // Actions
  const actions = {
    addTask: (taskData) => {
      const newTask = {
        id: generateId(),
        ...taskData,
        createdAt: new Date().toISOString().split('T')[0],
        order: state.tasks.filter(t => t.listId === taskData.listId).length
      };
      dispatch({ type: ActionTypes.ADD_TASK, payload: newTask });
      return newTask;
    },

    updateTask: (taskId, updates) => {
      dispatch({ type: ActionTypes.UPDATE_TASK, payload: { id: taskId, updates } });
    },

    deleteTask: (taskId) => {
      dispatch({ type: ActionTypes.DELETE_TASK, payload: taskId });
    },

    moveTask: (taskId, newListId) => {
      dispatch({ type: ActionTypes.MOVE_TASK, payload: { taskId, newListId } });
    },

    reorderTasks: (tasks) => {
      dispatch({ type: ActionTypes.REORDER_TASKS, payload: tasks });
    },

    addList: (listData) => {
      const newList = {
        id: generateId(),
        ...listData,
        order: state.lists.length
      };
      dispatch({ type: ActionTypes.ADD_LIST, payload: newList });
      return newList;
    },

    updateList: (listId, updates) => {
      dispatch({ type: ActionTypes.UPDATE_LIST, payload: { id: listId, updates } });
    },

    deleteList: (listId) => {
      dispatch({ type: ActionTypes.DELETE_LIST, payload: listId });
    },

    setViewMode: (mode) => {
      dispatch({ type: ActionTypes.SET_VIEW_MODE, payload: mode });
    },

    setSelectedTask: (taskId) => {
      dispatch({ type: ActionTypes.SET_SELECTED_TASK, payload: taskId });
    },

    setFilters: (filters) => {
      dispatch({ type: ActionTypes.SET_FILTERS, payload: filters });
    },

    setSearchQuery: (query) => {
      dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query });
    },

    toggleSidebar: (collapsed) => {
      localStorage.setItem('sidebarCollapsed', collapsed.toString());
      dispatch({ type: ActionTypes.TOGGLE_SIDEBAR, payload: collapsed });
    }
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to access the app context
 * @returns {Object} Context value with state and actions
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
