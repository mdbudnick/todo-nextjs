'use client'
import React, { useEffect, useRef, useState } from 'react'
import Task from '../types/Task'

interface TaskProps {
  task: Task
  onComplete: (taskId: string | number) => void
  onUpdateTask: (taskId: string | number, updatedTask: Partial<Task>) => void
}

const TaskCard: React.FC<TaskProps> = ({ task, onComplete, onUpdateTask }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
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

  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const descriptionInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
    } else if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus()
    }
  }, [isEditingTitle, isEditingDescription])

  const handleEditTitleClick = () => {
    setIsEditingTitle(true)
  }

  const handleEditDescriptionClick = () => {
    setIsEditingDescription(true)
  }

  const handleEdit = () => {
    setIsEditingTitle(false)
    setIsEditingDescription(false)
    onUpdateTask(task.id, {
      title: updatedTitle,
      description: updatedDescription,
    })
  }

  const handleCancelEdit = () => {
    setIsEditingTitle(false)
    setIsEditingDescription(false)
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
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={updatedTitle}
            minLength={1}
            maxLength={100}
            onChange={handleTitleChange}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit()
              } else if (e.key === 'Escape') {
                handleCancelEdit()
              }
            }}
          />
        ) : (
          <h2
            onClick={handleEditTitleClick}
            className={`text-2xl font-bold ${titleColor}`}
          >
            {task.title}
          </h2>
        )}
        {isEditingDescription ? (
          <input
            ref={descriptionInputRef}
            type="text"
            value={updatedDescription}
            maxLength={250}
            onChange={handleDescriptionChange}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit()
              } else if (e.key === 'Escape') {
                handleCancelEdit()
              }
            }}
          />
        ) : (
          <p
            onClick={handleEditDescriptionClick}
            className={`text ${descriptionColor}`}
          >
            {task.description}
          </p>
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
