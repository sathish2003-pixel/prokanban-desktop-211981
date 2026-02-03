import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#DE350B';
      case 'medium':
        return '#FF991F';
      case 'low':
        return '#36B37E';
      default:
        return '#6B778C';
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  // Generate a simple issue key from task id
  const getIssueKey = (taskId) => {
    const num = taskId.split('-').pop() || '1';
    return `PRO-${num.substring(0, 4).toUpperCase()}`;
  };

  // Mock estimate (story points)
  const getEstimate = () => {
    const estimates = [1, 2, 3, 5, 8];
    return estimates[Math.floor(Math.random() * estimates.length)];
  };

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Issue Key & Title */}
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
      </div>

      {/* Description (optional preview) */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="task-labels">
          {task.labels.slice(0, 2).map((label, index) => (
            <span key={index} className="task-label">{label}</span>
          ))}
          {task.labels.length > 2 && (
            <span className="task-label-more">+{task.labels.length - 2}</span>
          )}
        </div>
      )}

      {/* Metadata Row: Issue Key, Priority, Assignee, Estimate */}
      <div className="task-card-footer">
        <div className="task-meta-left">
          <span className="task-issue-key">{getIssueKey(task.id)}</span>
          <span 
            className="task-priority-dot" 
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`Priority: ${task.priority}`}
          ></span>
        </div>
        
        <div className="task-meta-right">
          {task.assignee && (
            <div className="task-assignee" title={task.assignee}>
              {getInitials(task.assignee)}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions (visible on hover) */}
      {isHovered && !isDragging && (
        <div className="task-quick-actions">
          <button className="quick-action-btn" title="Comments" aria-label="Comments">
            <span className="action-icon">💬</span>
            <span className="action-count">0</span>
          </button>
          <button className="quick-action-btn" title="Attachments" aria-label="Attachments">
            <span className="action-icon">📎</span>
            <span className="action-count">0</span>
          </button>
          <button className="quick-action-btn" title="More actions" aria-label="More actions">
            <span className="action-icon">⋯</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
