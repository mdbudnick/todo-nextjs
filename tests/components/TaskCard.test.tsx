import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import TaskCard from '../../app/components/TaskCard'
import { INCOMPLETE_TASK, COMPLETE_TASK } from '../models/testTasks'

test('renders TaskCard component', () => {
  const handleComplete = jest.fn()
  const handleDelete = jest.fn()
  const handleUpdate = jest.fn()

  render(
    <TaskCard
      task={INCOMPLETE_TASK}
      onComplete={handleComplete}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />,
  )

  expect(screen.getByText(INCOMPLETE_TASK.title)).toBeInTheDocument()
  expect(screen.getByText(INCOMPLETE_TASK.description!)).toBeInTheDocument()
  expect(screen.getByRole('checkbox')).not.toBeChecked()
  expect(screen.getByTitle('Delete Task')).toBeInTheDocument()
  expect(screen.getByTitle('Task Card')).toHaveClass(
    'p-4 bg-white bg-opacity-30 rounded-lg border border-lilac mb-4',
  )
  cleanup()

  render(
    <TaskCard
      task={COMPLETE_TASK}
      onComplete={handleComplete}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />,
  )

  expect(screen.getByText(COMPLETE_TASK.title)).toBeInTheDocument()
  expect(screen.getByText(COMPLETE_TASK.description!)).toBeInTheDocument()
  expect(screen.getByRole('checkbox')).toBeChecked()
  expect(screen.getByTitle('Delete Task')).toBeInTheDocument()
  expect(screen.getByTitle('Task Card')).toHaveClass(
    'p-4 bg-white bg-opacity-30 rounded-lg border border-lilac mb-4 filter grayscale contrast-200',
  )
})

test('TaskCard component updates completed status', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleComplete = jest.fn((taskId) => {})

  render(
    <TaskCard
      task={INCOMPLETE_TASK}
      onComplete={handleComplete}
      onDelete={() => {}}
      onUpdate={() => {}}
    />,
  )
  const completedCheck = screen.getByRole('checkbox')
  expect(completedCheck).not.toBeChecked()
  fireEvent.click(completedCheck)
  expect(handleComplete).toHaveBeenCalledWith(INCOMPLETE_TASK.id)
})

test('Updates task title on click and blur', () => {
  const handleUpdate = jest.fn()

  render(
    <TaskCard
      task={INCOMPLETE_TASK}
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
  expect(handleUpdate).toHaveBeenCalledWith(INCOMPLETE_TASK.id, {
    title: 'New Title',
    description: INCOMPLETE_TASK.description,
  })
})

test('Updates task description on click and blur', () => {
  const handleUpdate = jest.fn()

  render(
    <TaskCard
      task={INCOMPLETE_TASK}
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
  expect(handleUpdate).toHaveBeenCalledWith(INCOMPLETE_TASK.id, {
    description: 'New Description',
    title: INCOMPLETE_TASK.title,
  })
})

test('TaskCard delete functionality', () => {
  const handleDelete = jest.fn()

  render(
    <TaskCard
      task={INCOMPLETE_TASK}
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

  expect(handleDelete).toHaveBeenCalledWith(INCOMPLETE_TASK.id)
})
