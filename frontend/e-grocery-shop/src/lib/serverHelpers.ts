/* eslint-disable import/no-unresolved */
// Third-party Imports
import 'server-only';

// Next Imports
import { cookies } from 'next/headers';

// Type Imports
import type { Settings } from '@/components/settings/types';
import type { SystemMode } from '@/types';

// Config Imports
import themeConfig from '@/config/app-config';

export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieStore = await cookies();

  const cookieName = themeConfig.settingsCookieName;

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}');
};

export const getMode = async () => {
  const settingsCookie = await getSettingsFromCookie();

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || themeConfig.mode;

  return _mode;
};

export const getSystemMode = async (): Promise<SystemMode> => {
  const cookieStore = await cookies();
  const mode = await getMode();

  const colorPrefCookie = (cookieStore.get('colorPref')?.value || 'light') as SystemMode;

  return (mode === 'system' ? colorPrefCookie : mode) || 'light';
};

export const getServerMode = async () => {
  const mode = await getMode();
  const systemMode = await getSystemMode();

  return mode === 'system' ? systemMode : mode;
};
