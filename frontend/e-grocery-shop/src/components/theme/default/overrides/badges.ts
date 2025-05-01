// MUI Imports
import type { Theme } from '@mui/material/styles';

const badges: Theme['components'] = {
  MuiBadge: {
    styleOverrides: {
      standard: ({ theme }) => ({
        top: "0.4rem",
        right: "0.5rem",
        height: 22,
        minWidth: 22,
        borderRadius: '50%',
        fontSize: theme.typography.subtitle2.fontSize,
        lineHeight: 1.07,
        padding: theme.spacing(1, 2),
      }),
    },
  },
};

export default badges;
