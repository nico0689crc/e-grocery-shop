// React imports
import { useMemo } from 'react'

// Third-party imports
import { useCookie } from 'react-use'

// Custom hook
export const useObjectCookie = <T>(key: string, fallback?: T | null): [T, (newVal: T) => void] => {
  const [valStr, updateCookie] = useCookie(key)

  // Parse the cookie value or use the fallback
  const value = useMemo<T>(() => (valStr ? JSON.parse(valStr) : fallback), [valStr, fallback])

  // Update the cookie with the new value
  const updateValue = (newVal: T) => {
    updateCookie(JSON.stringify(newVal))
  }

  return [value, updateValue]
}
