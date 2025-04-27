// MUI Imports
import type { Theme } from '@mui/material/styles';

const progress: Theme['components'] = {
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 6,
        borderRadius: 'var(--mui-shape-borderRadius)',
        backgroundColor: '#d1d1d1', // Color para la parte restante
        '& .MuiLinearProgress-bar': {
          borderRadius: 'var(--mui-shape-borderRadius)',
        },
      },
    },
  },
};

export default progress;
