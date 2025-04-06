import { cookies } from 'next/headers'

import { themeConfig } from '@/configs'
import type { Settings } from '@core/contexts/settings/types'
import type { SystemMode } from '@core/types'

export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieStore = await cookies()

  const cookieName = themeConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = async () => {
  const settingsCookie = await getSettingsFromCookie()

  const _mode = settingsCookie.mode || themeConfig.mode

  return _mode
}

export const getSystemMode = async (): Promise<SystemMode> => {
  const cookieStore = await cookies()
  const mode = await getMode()

  const colorPrefCookie = (cookieStore.get('colorPref')?.value || 'light') as SystemMode

  return (mode === 'system' ? colorPrefCookie : mode) || 'light'
}
