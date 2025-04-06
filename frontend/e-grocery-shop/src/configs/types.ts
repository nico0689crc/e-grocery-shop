import type { ToastPosition } from 'react-toastify'

import type { Mode } from '@core/types'

export type Config = {
  primaryColor: string
  templateName: string
  homePageUrl: string
  settingsCookieName: string
  mode: Mode
  layoutPadding: number
  toastPosition: ToastPosition
}
