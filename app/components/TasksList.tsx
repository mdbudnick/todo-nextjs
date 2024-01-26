"use client"
import React, { useState } from 'react';
import Task from '../types/Task';

const initialTasks: Task[] = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: true },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false },
];

const TasksList: React.FC<TasksListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const completedTasks = tasks.filter((task) => task.completed);
  const notCompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <h2>To Do</h2>
        <ul>
          {notCompletedTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Done</h2>
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id} style={{ color: 'gray' }}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksList;
