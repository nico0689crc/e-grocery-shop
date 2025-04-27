import type { Mode } from '@core/types'

export type Settings = {
  primaryColor: string
  mode?: Mode
}

export type UpdateSettingsOptions = {
  updateCookie?: boolean
}

export type SettingsContextProps = {
  settings: Settings
  updateSettings: (settings: Partial<Settings>, options?: UpdateSettingsOptions) => void
  isSettingsChanged: boolean
}
