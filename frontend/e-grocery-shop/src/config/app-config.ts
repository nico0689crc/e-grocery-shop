// Third-party Imports
import type { ToastPosition } from 'react-toastify';

// Type Imports
import type { Mode } from '@/types';
import type { Breakpoint } from '@mui/material';

export type AppConfig = {
  templateName: string;
  settingsCookieName: string;
  mode: Mode;
  layoutPadding: number;
  headerHeight: string;
  toastPosition: ToastPosition;
  breakpointToChangeLayout: Breakpoint;
  primaryColor: {
    light?: string;
    main: string;
    dark?: string;
  }
};

const appConfig: AppConfig = {
  templateName: 'NextJs App MUI Base',
  settingsCookieName: 'nicolas-fernandez-portfolio-settings',
  mode: 'light',
  headerHeight: '70px',
  layoutPadding: 24,
  breakpointToChangeLayout: 'lg',
  toastPosition: 'top-right',
  primaryColor: {
    light: '#f8e17e',
    main: '#f5df4e',
    dark: '#c7a631',
  }
};

export default appConfig;
