import React from 'react';
import TasksList from './components/TasksList';
import './globals.css';
import Task from './types/Task';

interface HomeProps {
  tasks: Task[];
}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      <h1>Task Management</h1>
      <TasksList />
    </div>
  );
};

export default Home;
