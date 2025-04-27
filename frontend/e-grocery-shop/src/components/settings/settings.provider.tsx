'use client';

// React Imports
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

// Config Imports
import appConfig from '@/config/app-config';

// Hook Imports
import { useObjectCookie } from '@/hooks/useObjectCookie';

// Context Imports
import { SettingsContext } from './settings.context';

// Type Imports
import type { Mode } from '@/types';
import type { Settings, UpdateSettingsOptions } from './types';

// Initial Settings
const initialSettings: Settings = {
  mode: appConfig.mode,
  primaryColor: appConfig.primaryColor.main,
  navbarOpen: false,
};

// Settings Provider
type SettingsProviderProps = {
  children: ReactNode;
  settingsCookie: Settings | null;
  mode?: Mode;
};

export const SettingsProvider = (props: SettingsProviderProps) => {
  const updatedInitialSettings = useMemo(
    () => ({
      ...initialSettings,
      mode: props.mode || appConfig.mode,
    }),
    [props.mode]
  );

  // Cookies
  const [settingsCookie, updateSettingsCookie] = useObjectCookie<Settings>(
    appConfig.settingsCookieName,
    JSON.stringify(props.settingsCookie) !== '{}' ? props.settingsCookie : updatedInitialSettings
  );

  // State
  const [_settingsState, _updateSettingsState] = useState<Settings>(
    JSON.stringify(settingsCookie) !== '{}' ? settingsCookie : updatedInitialSettings
  );

  const updateSettings = useCallback(
    (settings: Partial<Settings>, options?: UpdateSettingsOptions) => {
      const { updateCookie = true } = options || {};

      _updateSettingsState((prev) => {
        const newSettings = { ...prev, ...settings };

        // Update cookie if needed
        if (updateCookie) updateSettingsCookie(newSettings);

        return newSettings;
      });
    },
    [updateSettingsCookie]
  );

  const toggleNavbar = useCallback(() => {
    updateSettings({ navbarOpen: !_settingsState.navbarOpen });
  }, [_settingsState.navbarOpen, updateSettings]);

  const isSettingsChanged = useMemo(
    () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
    [_settingsState]
  );

  return (
    <SettingsContext.Provider
      value={{
        settings: _settingsState,
        updateSettings,
        isSettingsChanged,
        toggleNavbar,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
