// MUI Imports
import type { Theme } from '@mui/material/styles';

const chip: Theme['components'] = {
  MuiChip: {
    styleOverrides: {
      root: {
        padding: '0.8rem',
        fontSize: '0.8125rem',
        fontWeight: 600,
      },
    },
  },
};

export default chip;
