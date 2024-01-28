import API_URL from './hostUrl'
import Task from '../models/Task'
import PaginatedTasks from '../models/PaginatedTasks'

const getTasksUrl = (): URL => {
  return new URL('/tasks', API_URL)
}

const getTaskIdUrl = (id: string | number): URL => {
  return new URL(`${id}/tasks`, API_URL)
}

export const fetchPaginatedTasks = async (
  page: number = 1,
  pageSize: number = 200,
): Promise<PaginatedTasks> => {
  const url = getTasksUrl()
  url.searchParams.append('page', page.toString())
  url.searchParams.append('pageSize', pageSize.toString())

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  const data: PaginatedTasks = await response.json()
  return data
}

export const createTask = async (newTask: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(getTasksUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  const createdTask = await response.json()
  return createdTask as Task
}

export const getTaskById = async (
  id: string | number,
): Promise<Task | null> => {
  const response = await fetch(getTaskIdUrl(id))

  if (response.status === 404) {
    return null // Task not found
  }

  if (!response.ok) {
    throw new Error('Failed to fetch task')
  }

  const task = await response.json()
  return task as Task
}

export const updateTask = async (
  id: string | number,
  updatedTask: Partial<Task>,
): Promise<Task> => {
  const response = await fetch(getTaskIdUrl(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  })

  if (!response.ok) {
    throw new Error('Failed to update task')
  }

  const updatedTaskData = await response.json()
  return updatedTaskData as Task
}

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(getTaskIdUrl(id), {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}
