import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDroppable } from '@dnd-kit/core';
import SortableTaskCard from './SortableTaskCard';
import AddTaskModal from './AddTaskModal';
import { useAppContext } from '../context/AppContext';
import './BoardColumn.css';

// PUBLIC_INTERFACE
/**
 * BoardColumn component representing a single list/column in the board
 * @param {Object} props - Component props
 * @param {Object} props.list - List data object
 * @param {Array} props.tasks - Array of tasks in this list
 * @returns {JSX.Element} BoardColumn component
 */
const BoardColumn = ({ list, tasks }) => {
  const { actions } = useAppContext();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const handleTaskClick = (taskId) => {
    actions.setSelectedTask(taskId);
  };

  const handleAddTaskClick = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <h3 className="column-title">{list.title}</h3>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div ref={setNodeRef} className="column-tasks">
        {tasks.map(task => (
          <SortableTaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <div className="empty-column">
            <p>No tasks</p>
          </div>
        )}
      </div>

      <button className="add-task-btn" onClick={handleAddTaskClick}>
        <FiPlus className="add-icon" />
        Add task
      </button>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseModal}
        defaultListId={list.id}
      />
    </div>
  );
};

export default BoardColumn;
