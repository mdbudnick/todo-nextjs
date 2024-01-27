"use client"
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import Task from '../types/Task';

const initialTasks: Task[] = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: true },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false },
];

const TasksList: React.FC<TasksListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  const handleComplete = (taskId: string | number) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mx-auto mt-10 ml-10 mr-10">
      {/* !Completed Tasks */}
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-4 text-fuchsia-800">Not Completed</h2>
        {incompleteTasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={handleComplete} />
        ))}
      </div>

      {/* Completed Tasks */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-fuchsia-800">Completed</h2>
        {completedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
