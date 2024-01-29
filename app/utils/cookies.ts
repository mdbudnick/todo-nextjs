import Cookies from 'js-cookie'

export const getSessionId = (): string | null => {
  return Cookies.get('session') || null
}

export const clearSessionId = (): void => {
  Cookies.remove('session')
}
