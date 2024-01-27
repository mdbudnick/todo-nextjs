import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TasksList from '../../app/components/TasksList'
import { INCOMPLETE_TASK, COMPLETE_TASK } from '../models/testTasks'

test('renders TasksList component with create button, search bar, and task lists', () => {
  render(<TasksList initialTasks={[INCOMPLETE_TASK, COMPLETE_TASK]} />)

  expect(screen.getByText('Create Task')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument()
  expect(screen.getByText('To Do')).toBeInTheDocument()
  expect(screen.getByText(INCOMPLETE_TASK.title)).toBeInTheDocument()
  expect(screen.getByText('Completed')).toBeInTheDocument()
  expect(screen.getByText(COMPLETE_TASK.title)).toBeInTheDocument()
})
