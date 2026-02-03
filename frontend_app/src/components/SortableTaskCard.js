import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

// PUBLIC_INTERFACE
/**
 * SortableTaskCard component wrapping TaskCard with sortable functionality
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data object
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} SortableTaskCard component
 */
const SortableTaskCard = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} onClick={onClick} isDragging={isDragging} />
    </div>
  );
};

export default SortableTaskCard;
