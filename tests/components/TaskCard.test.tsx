import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskCard from '../../app/components/TaskCard'
import Task from '@/app/models/Task'

const TASK: Task = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
}

test('renders TaskCard component', () => {
  const handleComplete = jest.fn()
  const handleDelete = jest.fn()
  const handleUpdate = jest.fn()

  render(
    <TaskCard
      task={TASK}
      onComplete={handleComplete}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />,
  )

  // Your existing assertions
  expect(screen.getByText('Test Task')).toBeInTheDocument()
  expect(screen.getByText('Test Description')).toBeInTheDocument()
  expect(screen.getByRole('checkbox')).not.toBeChecked()
  expect(screen.getByTitle('Delete Task')).toBeInTheDocument()
})

test('updates task title on click and blur', () => {
  const handleUpdate = jest.fn()

  render(
    <TaskCard
      task={TASK}
      onComplete={() => {}}
      onDelete={() => {}}
      onUpdate={handleUpdate}
    />,
  )

  expect(screen.queryByRole('textbox')).toBeNull
  fireEvent.click(screen.getByText('Test Task'))
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'New Title' },
  })
  fireEvent.blur(screen.getByRole('textbox'))
  expect(handleUpdate).toHaveBeenCalledWith(1, {
    title: 'New Title',
    description: TASK.description,
  })
})

test('updates task description on click and blur', () => {
  const handleUpdate = jest.fn()

  render(
    <TaskCard
      task={TASK}
      onComplete={() => {}}
      onDelete={() => {}}
      onUpdate={handleUpdate}
    />,
  )

  expect(screen.queryByRole('textbox')).toBeNull
  fireEvent.click(screen.getByText('Test Description'))
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'New Description' },
  })
  fireEvent.blur(screen.getByRole('textbox'))
  expect(handleUpdate).toHaveBeenCalledWith(1, {
    description: 'New Description',
    title: TASK.title,
  })
})
