'use client'
import React, { useCallback, useEffect, useState } from 'react'

interface CreateTaskProps {
  onClose: () => void
  onSave: (newTask: { title: string; description: string }) => void
}

const CreateTask: React.FC<CreateTaskProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setError('')
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value)
    setError('')
  }

  const handleSave = useCallback(() => {
    if (!title || title.length > 100) {
      setError('Title must be between 1 and 100 characters.')
      return
    }

    if (description.length > 250) {
      setError('Description can only be up to 250 characters.')
      return
    }

    onSave({ title, description })
    onClose()
  }, [title, description, onSave, onClose])

  const handleCancel = useCallback(() => {
    // Close the window without saving
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave()
      } else if (e.key === 'Escape') {
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleSave, handleCancel])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-2xl font-bold mb-4">Create Task</h2>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            maxLength={250}
            onChange={handleDescriptionChange}
            rows={4}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTask
