import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { filterOptions } from '../data/mockData';
import './TaskDetailsPanel.css';

// PUBLIC_INTERFACE
/**
 * TaskDetailsPanel component for displaying and editing task details
 * @returns {JSX.Element} TaskDetailsPanel component
 */
const TaskDetailsPanel = () => {
  const { state, actions } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const task = state.tasks.find(t => t.id === state.selectedTaskId);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
      setIsEditing(false);
    }
  }, [task]);

  if (!task || !state.selectedTaskId) {
    return null;
  }

  const handleClose = () => {
    actions.setSelectedTask(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTask) {
      actions.updateTask(task.id, editedTask);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      actions.deleteTask(task.id);
      actions.setSelectedTask(null);
    }
  };

  const handleChange = (field, value) => {
    setEditedTask({ ...editedTask, [field]: value });
  };

  const toggleLabel = (label) => {
    const currentLabels = editedTask.labels || [];
    const newLabels = currentLabels.includes(label)
      ? currentLabels.filter(l => l !== label)
      : [...currentLabels, label];
    handleChange('labels', newLabels);
  };

  const getListName = (listId) => {
    const list = state.lists.find(l => l.id === listId);
    return list ? list.title : 'Unknown';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#9CA3AF';
    }
  };

  const displayTask = isEditing ? editedTask : task;

  return (
    <>
      <div className="task-panel-overlay" onClick={handleClose}></div>
      <div className="task-details-panel">
        <div className="panel-header">
          <h2 className="panel-title">Task Details</h2>
          <button className="panel-close-btn" onClick={handleClose} aria-label="Close panel">
            <FiX />
          </button>
        </div>

        <div className="panel-content">
          {/* Title */}
          <div className="panel-section">
            <label className="panel-label">Title</label>
            {isEditing ? (
              <input
                type="text"
                className="panel-input"
                value={displayTask.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            ) : (
              <h3 className="task-detail-title">{displayTask.title}</h3>
            )}
          </div>

          {/* Description */}
          <div className="panel-section">
            <label className="panel-label">Description</label>
            {isEditing ? (
              <textarea
                className="panel-textarea"
                rows="4"
                value={displayTask.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Add a description..."
              />
            ) : (
              <p className="task-detail-description">
                {displayTask.description || 'No description'}
              </p>
            )}
          </div>

          {/* Status/List */}
          <div className="panel-section">
            <label className="panel-label">Status</label>
            {isEditing ? (
              <select
                className="panel-select"
                value={displayTask.listId}
                onChange={(e) => handleChange('listId', e.target.value)}
              >
                {state.lists.map(list => (
                  <option key={list.id} value={list.id}>{list.title}</option>
                ))}
              </select>
            ) : (
              <div className="status-display">{getListName(displayTask.listId)}</div>
            )}
          </div>

          {/* Priority */}
          <div className="panel-section">
            <label className="panel-label">Priority</label>
            {isEditing ? (
              <div className="priority-options">
                {filterOptions.priorities.map(priority => (
                  <button
                    key={priority}
                    className={`priority-option ${displayTask.priority === priority ? 'active' : ''}`}
                    onClick={() => handleChange('priority', priority)}
                  >
                    <span
                      className="priority-indicator"
                      style={{ background: getPriorityColor(priority) }}
                    ></span>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            ) : (
              <div className="priority-display">
                <span
                  className="priority-indicator"
                  style={{ background: getPriorityColor(displayTask.priority) }}
                ></span>
                {displayTask.priority.charAt(0).toUpperCase() + displayTask.priority.slice(1)}
              </div>
            )}
          </div>

          {/* Assignee */}
          <div className="panel-section">
            <label className="panel-label">Assignee</label>
            {isEditing ? (
              <select
                className="panel-select"
                value={displayTask.assignee || ''}
                onChange={(e) => handleChange('assignee', e.target.value)}
              >
                <option value="">Unassigned</option>
                {filterOptions.assignees.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            ) : (
              <div className="assignee-display">{displayTask.assignee || 'Unassigned'}</div>
            )}
          </div>

          {/* Due Date */}
          <div className="panel-section">
            <label className="panel-label">Due Date</label>
            {isEditing ? (
              <input
                type="date"
                className="panel-input"
                value={displayTask.dueDate || ''}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            ) : (
              <div className="date-display">
                {displayTask.dueDate
                  ? new Date(displayTask.dueDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'No due date'}
              </div>
            )}
          </div>

          {/* Labels */}
          <div className="panel-section">
            <label className="panel-label">Labels</label>
            {isEditing ? (
              <div className="labels-edit">
                {filterOptions.labels.map(label => (
                  <button
                    key={label}
                    className={`label-option ${displayTask.labels?.includes(label) ? 'active' : ''}`}
                    onClick={() => toggleLabel(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="labels-display">
                {displayTask.labels && displayTask.labels.length > 0 ? (
                  displayTask.labels.map((label, idx) => (
                    <span key={idx} className="label-badge">{label}</span>
                  ))
                ) : (
                  <span className="no-labels">No labels</span>
                )}
              </div>
            )}
          </div>

          {/* Created Date */}
          <div className="panel-section">
            <label className="panel-label">Created</label>
            <div className="date-display">
              {new Date(displayTask.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div className="panel-footer">
          {isEditing ? (
            <>
              <button className="panel-btn btn-save" onClick={handleSave}>
                Save Changes
              </button>
              <button className="panel-btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="panel-btn btn-edit" onClick={handleEdit}>
                Edit Task
              </button>
              <button className="panel-btn btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetailsPanel;
