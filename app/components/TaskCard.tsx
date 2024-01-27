"use client"
import React from 'react';
import Task from '../types/Task';

interface TaskProps {
  task: Task;
}

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const cardStyles = `p-4 bg-white bg-opacity-30 rounded-lg border border-lilac mb-4 ${task.completed ? 'filter grayscale contrast-200' : ''}`;
  const titleColor = task.completed ? 'text-fuchsia-300' : 'text-fuchsia-800';
  const descriptionColor = task.completed ? 'text-fuchsia-300' : 'text-fuchsia-700';

  return (
      <div className={cardStyles}>
        <h2 className={`text-2xl font-bold ${titleColor}`}>{task.title}</h2>
        <p className={`text ${descriptionColor}`}>{task.description}</p>
      </div>
  );
};

export default TaskCard;
