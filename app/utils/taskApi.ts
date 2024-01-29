import API_URL from './hostUrl'
import Task from '../models/Task'
import PaginatedTasks from '../models/PaginatedTasks'

interface URLOptions {
  version: 'v1'
}

interface GetTasksOptions extends URLOptions {
  page?: number
  pageSize?: number
}

const getTasksUrl = (options?: URLOptions): URL => {
  const baseUrl = new URL(API_URL)
  const path = options?.version ? `/${options.version}/tasks` : '/v1/tasks'
  baseUrl.pathname = path

  return baseUrl
}

const getTaskIdUrl = (id: string | number, options?: URLOptions): URL => {
  const baseUrl = new URL(API_URL)
  const path = options?.version ? `/${options.version}/tasks` : '/v1/tasks'
  baseUrl.pathname = path
  baseUrl.pathname += `/${id}`

  return baseUrl
}

export const fetchPaginatedTasks = async (
  options?: GetTasksOptions,
): Promise<PaginatedTasks> => {
  const url = getTasksUrl()
  url.searchParams.append('page', options?.page ? options.page.toString() : '1')
  url.searchParams.append(
    'pageSize',
    options?.pageSize ? options.pageSize.toString() : '20',
  )

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

export const createTask = async (
  newTask: Omit<Task, 'id'>,
  options?: URLOptions,
): Promise<Task> => {
  const response = await fetch(getTasksUrl(options), {
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
    return null
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
