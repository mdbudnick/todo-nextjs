import React from 'react'
import TasksList from './components/TasksList'
import './globals.css'
import Task from './types/Task'

interface HomeProps {
  tasks: Task[]
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <TasksList />
    </div>
  )
}

export default Home
