let constructApiUrl = ''

if (process.env.TASKS_API_HOST) {
  constructApiUrl = `https://${process.env.TASKS_API_HOST}`

  constructApiUrl += process.env.TASKS_API_PORT
    ? `:${process.env.TASKS_API_PORT}`
    : ''
} else {
  // Use parentheses to ensure correct order of operations
  constructApiUrl =
    'https://localhost' +
    (process.env.TASKS_API_PORT ? `:${process.env.TASKS_API_PORT}` : ':3001')
}

const API_URL = constructApiUrl

export default API_URL
