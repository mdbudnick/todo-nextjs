import React from 'react'

interface CreateTaskProps {
  onClose: () => void
}

const CreateTask: React.FC<CreateTaskProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        {/* ... Your form and input fields ... */}

        {/* Close button */}
        <button className="text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default CreateTask
