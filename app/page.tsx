import React, { createContext, useEffect, useState } from 'react'
import TasksList from './components/TasksList'
import './globals.css'
import Task from './models/Task'
import * as cookies from './utils/cookies'
import API_URL from './utils/hostUrl'

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
  const [sessionId, setSessionId] = useState(cookies.getSessionId)
  const SessionContext = createContext(sessionId)
  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const response = await fetch(API_URL + '/session-id')
        const data = await response.json()

        setSessionId(data.id)
      } catch (error) {
        console.error('Error fetching session ID:', error)
      }
    }

    if (!sessionId) {
      fetchSessionId()
    }
  }, [sessionId, setSessionId])

  return (
    <SessionContext.Provider value={sessionId}>
      <TasksList initialTasks={initialTasks} />
    </SessionContext.Provider>
  )
}

export default Home
