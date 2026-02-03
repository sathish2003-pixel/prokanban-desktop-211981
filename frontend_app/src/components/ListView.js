import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import './ListView.css';

// PUBLIC_INTERFACE
/**
 * ListView component displaying tasks in a table format
 * @returns {JSX.Element} ListView component
 */
const ListView = () => {
  const { state, actions } = useAppContext();

  // Filter tasks based on active filters
  const filteredTasks = useMemo(() => {
    let filtered = [...state.tasks];

    // Apply current project filter
    if (state.currentProjectId) {
      filtered = filtered.filter(task => task.projectId === state.currentProjectId);
    }

    // Apply selected team filter
    if (state.selectedTeamId) {
      filtered = filtered.filter(task => task.teamId === state.selectedTeamId);
    }

    // Apply search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }

    // Apply priority filter
    if (state.filters.priority) {
      filtered = filtered.filter(task => task.priority === state.filters.priority);
    }

    // Apply status filter
    if (state.filters.status) {
      filtered = filtered.filter(task => task.status === state.filters.status);
    }

    // Apply assignee filter
    if (state.filters.assignee) {
      filtered = filtered.filter(task => task.assignee === state.filters.assignee);
    }

    // Apply labels filter
    if (state.filters.labels.length > 0) {
      filtered = filtered.filter(task =>
        task.labels?.some(label => state.filters.labels.includes(label))
      );
    }

    return filtered.sort((a, b) => {
      // Sort by list order, then by task order
      const listA = state.lists.find(l => l.id === a.listId);
      const listB = state.lists.find(l => l.id === b.listId);
      if (listA && listB && listA.order !== listB.order) {
        return listA.order - listB.order;
      }
      return a.order - b.order;
    });
  }, [state.tasks, state.lists, state.searchQuery, state.filters, state.currentProjectId, state.selectedTeamId]);

  const handleTaskClick = (taskId) => {
    actions.setSelectedTask(taskId);
  };

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const getListName = (listId) => {
    const list = state.lists.find(l => l.id === listId);
    return list ? list.title : 'Unknown';
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="list-view">
      <div className="list-view-header">
        <h2 className="list-view-title">All Tasks ({filteredTasks.length})</h2>
      </div>

      <div className="list-view-table-container">
        <table className="list-view-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Due Date</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr
                key={task.id}
                className="list-view-row"
                onClick={() => handleTaskClick(task.id)}
              >
                <td className="task-cell">
                  <div className="task-info">
                    <div className="task-name">{task.title}</div>
                    {task.description && (
                      <div className="task-desc">{task.description}</div>
                    )}
                  </div>
                </td>
                <td>
                  <span className={getStatusClass(task.status)}>
                    {getListName(task.listId)}
                  </span>
                </td>
                <td>
                  <span className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <div className="assignee-cell">
                    {task.assignee || '-'}
                  </div>
                </td>
                <td>
                  <span className={`due-date-cell ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : '-'}
                  </span>
                </td>
                <td>
                  <div className="labels-cell">
                    {task.labels && task.labels.length > 0 ? (
                      <>
                        {task.labels.slice(0, 2).map((label, idx) => (
                          <span key={idx} className="label-tag">{label}</span>
                        ))}
                        {task.labels.length > 2 && (
                          <span className="label-more">+{task.labels.length - 2}</span>
                        )}
                      </>
                    ) : '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTasks.length === 0 && (
          <div className="empty-list">
            <p>No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
