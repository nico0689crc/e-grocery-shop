// React Types
import type { ReactNode } from 'react'

// Custom Types
import type { Locale } from '@/locales/i18n'

// System Modes
export type SystemMode = 'light' | 'dark'

export type Mode = 'system' | 'light' | 'dark'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

// Props
export type ChildrenType = {
  children: ReactNode
}

// Locale Parameters
export type LocaleParams = {
  params: Promise<{ lang: Locale }>
}
