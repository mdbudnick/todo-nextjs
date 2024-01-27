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

test('TaskCard delete functionality', () => {
  const handleDelete = jest.fn()

  render(
    <TaskCard
      task={TASK}
      onComplete={() => {}}
      onUpdate={() => {}}
      onDelete={handleDelete}
    />,
  )

  const deleteIcon = screen.getByTitle('Delete Task')
  expect(deleteIcon).toBeInTheDocument()

  fireEvent.click(deleteIcon)
  // Delete and Cancel buttons should appear
  const deleteButton = screen.getByTitle('Confirm Delete')
  const cancelButton = screen.getByTitle('Cancel Delete')
  expect(deleteButton).toBeInTheDocument()
  expect(cancelButton).toBeInTheDocument()
  fireEvent.click(cancelButton)

  // Delete Icon should be back
  expect(screen.queryByTitle('Delete Task')).toBeInTheDocument()
  fireEvent.click(screen.getByTitle('Delete Task'))
  fireEvent.click(screen.getByTitle('Confirm Delete'))

  expect(handleDelete).toHaveBeenCalledWith(TASK.id)
})
