// MUI Imports
import type { Theme } from '@mui/material';

const drawer: Theme['components'] = {
  MuiDrawer: {
    defaultProps: {},
    styleOverrides: {
      paper: {
        backgroundColor: 'var(--mui-palette-background-default)',
        boxShadow: 'var(--mui-customShadows-lg)',
      },
    },
  },
};

export default drawer;
