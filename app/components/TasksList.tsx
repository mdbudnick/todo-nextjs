'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TaskCard from './TaskCard'
import CreateTask from './CreateTask'
import Task from '../models/Task'
import * as taskApi from '../utils/taskApi'

interface TasksListProps {
  initialTasks: Task[]
}

let TASK_ID_GENERATOR = 1000

const TasksList: React.FC<TasksListProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showCreateTask, setShowCreateTask] = useState(false)
  const isMounted = useRef(true)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskApi.fetchPaginatedTasks()
        setTasks(data.tasks)
      } catch (error) {
        toast.error('Failed to fetch tasks', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
    }
    if (isMounted) {
      fetchTasks()
    }
  }, [])
  const filteredTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tasks
  const completedTasks = filteredTasks.filter((task) => task.completed)
  const incompleteTasks = filteredTasks.filter((task) => !task.completed)

  const handleComplete = async (taskId: string | number) => {
    try {
      const indexUpdateTask = tasks.findIndex((task) => task.id === taskId)
      const updatedTask = {
        ...tasks[indexUpdateTask],
        completed: !tasks[indexUpdateTask].completed,
      }
      await taskApi.updateTask(taskId, updatedTask)
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        ),
      )
    } catch (error) {
      toast.error('Failed to update task, please try again', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const handleOpenCreateTask = () => {
    setShowCreateTask(true)
  }

  const handleCloseCreateTask = () => {
    setShowCreateTask(false)
  }

  const handleCreate = (newTask: Task) => {
    const { id, title, description, completed } = newTask
    tasks.unshift({
      id: id ?? ++TASK_ID_GENERATOR,
      title,
      description: description ?? '',
      completed: completed ?? false,
    })
    setTasks(tasks)
  }

  const handleUpdate = (
    taskId: string | number,
    updatedTask: Partial<Task>,
  ) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      ),
    )
  }

  const handleDelete = (taskId: string | number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div>
      <div className="w-100">
        <ToastContainer />
        <button
          className="left-10 top-10 mr-10 ml-10 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleOpenCreateTask}
        >
          Create Task
        </button>
        {showCreateTask && (
          <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
        )}
        {showCreateTask && (
          <CreateTask onSave={handleCreate} onClose={handleCloseCreateTask} />
        )}
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-2/3 h-10 mb-5 mt-5 p-5"
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mx-auto mt-10 ml-10 mr-10">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          {incompleteTasks.length ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-800">
                To Do
              </h2>
              {incompleteTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </>
          ) : null}
        </div>
        <div className="w-full md:w-1/2">
          {completedTasks.length ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-800">
                Completed
              </h2>
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TasksList
