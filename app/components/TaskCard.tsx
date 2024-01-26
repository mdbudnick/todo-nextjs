"use client"
import React from 'react';
import Task from '../types/Task';

interface TaskProps {
  task: Task;
}

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">{task.title}</span>
        <span className="text-xs opacity-50">{task.id}</span>
      </div>
      <p className="text-sm mt-2">{task.description}</p>
    </div>
  );
};

export default TaskCard;
