import React from 'react'
import TasksList from './components/TasksList'
import './globals.css'
import Task from './models/Task'

interface HomeProps {}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: true,
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description for Task 3',
    completed: false,
  },
]

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <TasksList initialTasks={initialTasks} />
    </div>
  )
}

export default Home
