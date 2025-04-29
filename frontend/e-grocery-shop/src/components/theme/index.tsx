'use client';

// React Imports
import { useMemo } from 'react';

// Third-party Imports
import { useMedia } from 'react-use';

// MUI Imports
import { deepmerge } from '@mui/utils';
import { ThemeProvider, lighten, darken, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import type {} from '@mui/material/themeCssVarsAugmentation'; //! Do not remove this import otherwise you will get type errors while making a production build
import type {} from '@mui/lab/themeAugmentation'; //! Do not remove this import otherwise you will get type errors while making a production build

// Config Imports
import themeConfig from '@/config/app-config';

// Hook Imports
import { useSettings } from '@/components/settings/settings.hook';

// Core Theme Imports
import defaultCoreTheme from './default';

// Type Imports
import type { PropsWithChildren, SystemMode } from '@/types';

// Component Imports
import ModeChanger from './ModeChanger';

type Props = PropsWithChildren & {
  systemMode: SystemMode;
};

const CustomThemeProvider = (props: Props) => {
  // Props
  const { children, systemMode } = props;

  // Vars
  const isServer = typeof window === 'undefined';
  let currentMode: SystemMode;

  // Hooks
  const { settings } = useSettings();
  const isDark = useMedia('(prefers-color-scheme: dark)', systemMode === 'dark');

  if (isServer) {
    currentMode = systemMode;
  } else {
    if (settings.mode === 'system') {
      currentMode = isDark ? 'dark' : 'light';
    } else {
      currentMode = settings.mode as SystemMode;
    }
  }

  // Merge the primary color scheme override with the core theme
  const theme = useMemo(() => {
    const newTheme = {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: settings.primaryColor,
              light: lighten(settings.primaryColor as string, 0.2),
              dark: darken(settings.primaryColor as string, 0.1),
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: settings.primaryColor,
              light: lighten(settings.primaryColor as string, 0.2),
              dark: darken(settings.primaryColor as string, 0.1),
            },
          },
        },
      },
      cssVariables: {
        colorSchemeSelector: 'data',
      },
    };

    const coreTheme = deepmerge(defaultCoreTheme(currentMode), newTheme);

    return responsiveFontSizes(createTheme(coreTheme));
  }, [settings.primaryColor, currentMode]);

  return (
    <AppRouterCacheProvider
      options={{
        prepend: true,
      }}
    >
      <ThemeProvider
        theme={theme}
        defaultMode={systemMode}
        modeStorageKey={`${themeConfig.templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`}
      >
        <>
          <ModeChanger systemMode={systemMode} />
          <CssBaseline />
          {children}
        </>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default CustomThemeProvider;
