'use client'
import React from 'react'
import Task from '../types/Task'

interface TaskProps {
  task: Task
  onComplete: (taskId: string | number) => void
}

const TaskCard: React.FC<TaskProps> = ({ task, onComplete }) => {
  const handleComplete = () => {
    onComplete(task.id)
  }
  const cardStyles = `p-4 bg-white bg-opacity-30 rounded-lg border border-lilac mb-4 ${task.completed ? 'filter grayscale contrast-200' : ''}`
  const titleColor = task.completed ? 'text-fuchsia-300' : 'text-fuchsia-800'
  const descriptionColor = task.completed
    ? 'text-fuchsia-300'
    : 'text-fuchsia-700'

  return (
    <div className={cardStyles}>
      <h2 className={`text-2xl font-bold ${titleColor}`}>{task.title}</h2>
      <p className={`text ${descriptionColor}`}>{task.description}</p>
      <div className="flex items-end justify-end mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleComplete}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">Complete</span>
        </label>
      </div>
    </div>
  )
}

export default TaskCard
