import { createContext } from 'react'

import type { SettingsContextProps } from './types'

export const SettingsContext = createContext<SettingsContextProps | null>(null)
