// MUI Imports
import type { Theme } from '@mui/material/styles';

const accordion: Theme['components'] = {
  MuiAccordion: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['margin', 'border-radius', 'box-shadow']),
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&.Mui-expanded': {
          margin: 0,
          boxShadow: 'none',
          '&:before': {
            opacity: 1,
          },
        },
      }),
    },
  },
  MuiAccordionSummary: {
    defaultProps: {
      expandIcon: <i className="ri-arrow-down-s-line" />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3, 5),
        borderRadius: 0,
        color: 'var(--mui-palette-text-primary)',
        '&.Mui-expanded': {
          minHeight: 48,
        },
        '& .MuiTypography-root': {
          color: 'inherit',
          fontWeight: theme.typography.fontWeightMedium,
        },
      }),
      content: {
        margin: '0 !important',
      },
      expandIconWrapper: {
        color: 'var(--mui-palette-text-primary)',
        fontSize: '1.25rem',
        '& i, & svg': {
          fontSize: 'inherit',
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 5, 5),
        '& .MuiTypography-root': {
          color: 'var(--mui-palette-text-primary)',
        },
      }),
    },
  },
};

export default accordion;
