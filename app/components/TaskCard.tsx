'use client'
import React, { useEffect, useRef, useState } from 'react'
import Task from '../models/Task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface TaskCardProps {
  task: Task
  onComplete: (taskId: string | number) => void
  onUpdate: (taskId: string | number, updatedTask: Partial<Task>) => void
  onDelete: (taskId: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onUpdate,
  onDelete,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(task.title)
  const [updatedDescription, setUpdatedDescription] = useState(task.description)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const handleComplete = () => {
    onComplete(task.id!)
  }
  const cardStyles = `p-4 bg-white bg-opacity-30 rounded-lg border border-lilac mb-4 ${task.completed ? 'filter grayscale contrast-200' : ''}`
  const titleColor = task.completed ? 'text-fuchsia-300' : 'text-fuchsia-800'
  const descriptionColor = task.completed
    ? 'text-fuchsia-300'
    : 'text-fuchsia-700'

  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null)

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
    onUpdate(task.id!, {
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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUpdatedDescription(e.target.value)
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true)
  }

  const handleDeleteConfirmed = () => {
    onDelete(task.id!)
    setShowDeleteConfirmation(false)
  }

  const handleDeleteCancelled = () => {
    setShowDeleteConfirmation(false)
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
          <textarea
            ref={descriptionInputRef}
            rows={4}
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
      <div className="flex items-end justify-between mt-4">
        <div className="flex items-center">
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
        <div className="flex items-center">
          {showDeleteConfirmation || (
            <FontAwesomeIcon
              title="Delete Task"
              icon={faTrash}
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteClick}
            />
          )}
          {showDeleteConfirmation && (
            <div className="flex items-center space-x-4 text-xs">
              <button
                title="Confirm Delete"
                onClick={handleDeleteConfirmed}
                className="h-5 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                title="Cancel Delete"
                onClick={handleDeleteCancelled}
                className="h-5 px-2 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
