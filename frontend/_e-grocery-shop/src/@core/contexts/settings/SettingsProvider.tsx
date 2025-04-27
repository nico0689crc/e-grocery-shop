'use client'

// ** React Imports
import { useCallback, useMemo, useState } from 'react'

// ** Types
import type { ChildrenType, Mode } from '@core/types'
import type { Settings, UpdateSettingsOptions } from './types'

// ** Configs
import { themeConfig } from '@/configs'

// ** Hooks
import { useObjectCookie } from '@core/hooks/useObjectCookie'

// ** Contexts
import { SettingsContext } from '@core/contexts/settings/SettingsContext'

type Props = ChildrenType & {
  settingsCookie: Settings | null
  mode?: Mode
}

const initialSettings: Settings = {
  primaryColor: themeConfig.primaryColor,
  mode: themeConfig.mode
}

export const SettingsProvider = ({ children, settingsCookie, mode }: Props) => {
  const defaultSettings =
    settingsCookie && JSON.stringify(settingsCookie) !== '{}'
      ? settingsCookie
      : { ...initialSettings, mode: mode || themeConfig.mode }

  const [, updateSettingsCookie] = useObjectCookie<Settings>(themeConfig.settingsCookieName, defaultSettings)

  const [_settingsState, _updateSettingsState] = useState<Settings>(defaultSettings)

  const updateSettings = useCallback(
    (settings: Partial<Settings>, options?: UpdateSettingsOptions) => {
      const { updateCookie = true } = options || {}

      _updateSettingsState(_ => {
        const newSettings = { ..._, ...settings }

        if (updateCookie) updateSettingsCookie(newSettings)

        return newSettings
      })
    },
    [updateSettingsCookie]
  )

  const isSettingsChanged = useMemo(
    () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
    [_settingsState]
  )

  return (
    <SettingsContext.Provider
      value={{
        settings: _settingsState,
        updateSettings,
        isSettingsChanged
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
