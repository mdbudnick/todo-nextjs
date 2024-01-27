import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskCard from '../../app/components/TaskCard'

test('renders TaskCard component', () => {
  const task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
  }

  render(
    <TaskCard
      task={task}
      onComplete={() => {}}
      onUpdate={() => {}}
      onDelete={() => {}}
    />,
  )

  expect(screen.getByText('Test Task')).toBeDefined()
  expect(screen.getByText('Test Description')).toBeDefined()
})
