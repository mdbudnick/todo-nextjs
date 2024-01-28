import Cookies from 'js-cookie'

const SESSION_COOKIE_NAME = 'todo-nextjs-session-id'

export const getSessionId = (): string | null => {
  return Cookies.get(SESSION_COOKIE_NAME) || null
}

export const setSessionId = (sessionId: string): void => {
  Cookies.set(SESSION_COOKIE_NAME, sessionId, { expires: 365 })
}

export const clearSessionId = (): void => {
  Cookies.remove(SESSION_COOKIE_NAME)
}
