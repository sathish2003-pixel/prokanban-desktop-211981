import React from 'react';
import './TaskCard.css';

// PUBLIC_INTERFACE
/**
 * TaskCard component displaying task information in a card format
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data object
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.isDragging - Whether the card is being dragged
 * @returns {JSX.Element} TaskCard component
 */
const TaskCard = ({ task, onClick, isDragging }) => {
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

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
    >
      <div className="task-card-header">
        <div className="task-priority-indicator" style={{ background: getPriorityColor(task.priority) }}></div>
        <h4 className="task-title">{task.title}</h4>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.labels && task.labels.length > 0 && (
        <div className="task-labels">
          {task.labels.slice(0, 3).map((label, index) => (
            <span key={index} className="task-label">{label}</span>
          ))}
          {task.labels.length > 3 && (
            <span className="task-label-more">+{task.labels.length - 3}</span>
          )}
        </div>
      )}

      <div className="task-card-footer">
        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              📅 {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        {task.assignee && (
          <div className="task-assignee" title={task.assignee}>
            {getInitials(task.assignee)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
