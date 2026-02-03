import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { users, labels as availableLabels } from '../data/mockData';
import './AddTaskModal.css';

// PUBLIC_INTERFACE
/**
 * AddTaskModal component for creating new tasks
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {string} props.defaultListId - Default list/column ID for the new task
 * @returns {JSX.Element} AddTaskModal component
 */
const AddTaskModal = ({ isOpen, onClose, defaultListId }) => {
  const { state, actions } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    labels: [],
    storyPoints: '',
    estimate: '',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        assignee: '',
        priority: 'medium',
        labels: [],
        storyPoints: '',
        estimate: '',
        dueDate: ''
      });
      setErrors({});
      // Focus title input after a short delay to ensure modal is rendered
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.storyPoints && (isNaN(formData.storyPoints) || formData.storyPoints < 0)) {
      newErrors.storyPoints = 'Story points must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Get the list to determine status
    const list = state.lists.find(l => l.id === defaultListId);
    const status = list?.title.toLowerCase().includes('progress') ? 'in-progress' :
                   list?.title.toLowerCase().includes('review') ? 'review' :
                   list?.title.toLowerCase().includes('done') ? 'done' : 'todo';

    // Get current project and team
    const currentProject = state.currentProjectId || 'project-1';
    const currentTeam = state.selectedTeamId || 'team-1';

    // Create new task
    const newTask = {
      listId: defaultListId,
      projectId: currentProject,
      teamId: currentTeam,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: status,
      assignee: formData.assignee || null,
      reporter: users[0]?.name || 'Unknown',
      labels: formData.labels,
      estimate: formData.estimate || null,
      storyPoints: formData.storyPoints ? parseInt(formData.storyPoints, 10) : null,
      dueDate: formData.dueDate || null,
      comments: [],
      attachments: []
    };

    actions.addTask(newTask);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleLabel = (label) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter(l => l !== label)
        : [...prev.labels, label]
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle Enter key on form (only submit if title is valid)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && formData.title.trim()) {
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  const isValid = formData.title.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">Create Task</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {/* Title field */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label required">
              Title
            </label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <div id="title-error" className="form-error" role="alert">
                <FiAlertCircle className="error-icon" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Description field */}
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add a description..."
              rows="4"
            />
          </div>

          {/* Assignee field */}
          <div className="form-group">
            <label htmlFor="task-assignee" className="form-label">
              Assignee
            </label>
            <select
              id="task-assignee"
              className="form-select"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority field */}
          <div className="form-group">
            <label htmlFor="task-priority" className="form-label">
              Priority
            </label>
            <select
              id="task-priority"
              className="form-select"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Story Points and Estimate - Two columns */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-story-points" className="form-label">
                Story Points
              </label>
              <input
                id="task-story-points"
                type="number"
                className={`form-input ${errors.storyPoints ? 'error' : ''}`}
                value={formData.storyPoints}
                onChange={(e) => handleChange('storyPoints', e.target.value)}
                placeholder="e.g., 5"
                min="0"
                aria-invalid={!!errors.storyPoints}
                aria-describedby={errors.storyPoints ? 'story-points-error' : undefined}
              />
              {errors.storyPoints && (
                <div id="story-points-error" className="form-error" role="alert">
                  <FiAlertCircle className="error-icon" />
                  {errors.storyPoints}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="task-estimate" className="form-label">
                Estimate
              </label>
              <input
                id="task-estimate"
                type="text"
                className="form-input"
                value={formData.estimate}
                onChange={(e) => handleChange('estimate', e.target.value)}
                placeholder="e.g., 3d, 5h"
              />
            </div>
          </div>

          {/* Due Date field */}
          <div className="form-group">
            <label htmlFor="task-due-date" className="form-label">
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              className="form-input"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />
          </div>

          {/* Labels field */}
          <div className="form-group">
            <label className="form-label">Labels</label>
            <div className="labels-container">
              {availableLabels.slice(0, 14).map(label => (
                <button
                  key={label.id}
                  type="button"
                  className={`label-chip ${formData.labels.includes(label.name) ? 'active' : ''}`}
                  onClick={() => toggleLabel(label.name)}
                  style={{
                    '--label-color': label.color
                  }}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
