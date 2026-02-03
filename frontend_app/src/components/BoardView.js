import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useAppContext } from '../context/AppContext';
import BoardColumn from './BoardColumn';
import TaskCard from './TaskCard';
import './BoardView.css';

// PUBLIC_INTERFACE
/**
 * BoardView component displaying tasks in columns with drag-and-drop
 * @returns {JSX.Element} BoardView component
 */
const BoardView = () => {
  const { state, actions } = useAppContext();
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

    return filtered;
  }, [state.tasks, state.searchQuery, state.filters, state.currentProjectId, state.selectedTeamId]);

  // Get tasks for each list
  const getTasksByListId = (listId) => {
    return filteredTasks
      .filter(task => task.listId === listId)
      .sort((a, b) => a.order - b.order);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = state.tasks.find(t => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Find active and over tasks
    const activeTask = state.tasks.find(t => t.id === activeId);
    const overTask = state.tasks.find(t => t.id === overId);

    if (!activeTask) return;

    // If dropping over a list (column)
    if (state.lists.find(l => l.id === overId)) {
      if (activeTask.listId !== overId) {
        actions.moveTask(activeId, overId);
      }
      return;
    }

    // If dropping over another task
    if (overTask && activeTask.listId !== overTask.listId) {
      actions.moveTask(activeId, overTask.listId);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    // Find active task and determine target list
    const activeTask = state.tasks.find(t => t.id === activeId);
    if (!activeTask) {
      setActiveTask(null);
      return;
    }

    let targetListId = activeTask.listId;
    
    // Check if dropped over a list
    const overList = state.lists.find(l => l.id === overId);
    if (overList) {
      targetListId = overList.id;
    } else {
      // Dropped over a task
      const overTask = state.tasks.find(t => t.id === overId);
      if (overTask) {
        targetListId = overTask.listId;
      }
    }

    // Get tasks in target list
    const listTasks = state.tasks
      .filter(t => t.listId === targetListId)
      .sort((a, b) => a.order - b.order);

    const oldIndex = listTasks.findIndex(t => t.id === activeId);
    const newIndex = listTasks.findIndex(t => t.id === overId);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const reordered = arrayMove(listTasks, oldIndex, newIndex);
      
      // Update order for all tasks in the list
      const updatedTasks = state.tasks.map(task => {
        if (task.listId === targetListId) {
          const newOrder = reordered.findIndex(t => t.id === task.id);
          return { ...task, order: newOrder, listId: targetListId };
        }
        return task;
      });

      actions.reorderTasks(updatedTasks);
    } else if (activeTask.listId !== targetListId) {
      // Just moved to a different list without reordering
      actions.moveTask(activeId, targetListId);
    }

    setActiveTask(null);
  };

  const sortedLists = [...state.lists].sort((a, b) => a.order - b.order);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="board-view">
        <div className="board-columns">
          {sortedLists.map(list => (
            <SortableContext
              key={list.id}
              items={getTasksByListId(list.id).map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <BoardColumn
                list={list}
                tasks={getTasksByListId(list.id)}
              />
            </SortableContext>
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardView;
