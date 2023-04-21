declare module 'local-storage' {
  export const setStorage: (key: string, data: string) => void
  export const getStorage: (key: string) => string | null
  export const removeStorage: (key: string) => void
  export const types: {
    IS_AUTHENTICATED: string
  }
}

export const setStorage = (key: string, data: string): void => {
  window.localStorage.setItem(key, data)
}

export const getStorage = (key: string): string | null => window.localStorage.getItem(key)

export const removeStorage = (key: string): void => {
  window.localStorage.removeItem(key)
}

export const types = {
  IS_AUTHENTICATED: 'isAuthenticated'
} as const
