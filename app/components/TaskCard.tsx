'use client'
import React, { useState } from 'react'
import Task from '../types/Task'

interface TaskProps {
  task: Task
  onComplete: (taskId: string | number) => void
  onUpdateTask: (taskId: string | number, updatedTask: Partial<Task>) => void
}

const TaskCard: React.FC<TaskProps> = ({ task, onComplete, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(task.title)
  const [updatedDescription, setUpdatedDescription] = useState(task.description)

  const handleComplete = () => {
    onComplete(task.id)
  }
  const cardStyles = `p-4 bg-white bg-opacity-30 rounded-lg border border-lilac mb-4 ${task.completed ? 'filter grayscale contrast-200' : ''}`
  const titleColor = task.completed ? 'text-fuchsia-300' : 'text-fuchsia-800'
  const descriptionColor = task.completed
    ? 'text-fuchsia-300'
    : 'text-fuchsia-700'

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onUpdateTask(task.id, {
      title: updatedTitle,
      description: updatedDescription,
    })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDescription(e.target.value)
  }

  return (
    <div className={cardStyles}>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={handleTitleChange}
              onBlur={handleBlur}
            />
            <input
              type="text"
              value={updatedDescription}
              onChange={handleDescriptionChange}
              onBlur={handleBlur}
            />
          </>
        ) : (
          <>
            <h2 onClick={handleEditClick} className={`text-2xl font-bold ${titleColor}`}>{task.title}</h2>
            <p onClick={handleEditClick} className={`text ${descriptionColor}`}>{task.description}</p>
          </>
        )}
      </div>
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
