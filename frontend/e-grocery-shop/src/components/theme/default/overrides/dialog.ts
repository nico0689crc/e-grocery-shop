// MUI Imports
import type { Theme } from '@mui/material/styles';

const dialog: Theme['components'] = {
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        boxShadow: 'var(--mui-customShadows-xl)',
        [theme.breakpoints.down('sm')]: {
          '&:not(.MuiDialog-paperFullScreen)': {
            margin: theme.spacing(6),
          },
        },
      }),
    },
  },
  MuiDialogTitle: {
    defaultProps: {
      variant: 'h5',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        '& + .MuiDialogActions-root': {
          paddingTop: 0,
        },
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        '& + .MuiDialogContent-root, & + .MuiDialogActions-root': {
          paddingTop: 0,
        },
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        '& .MuiButtonBase-root:not(:first-of-type)': {
          marginInlineStart: theme.spacing(4),
        },
        '&:where(.dialog-actions-dense)': {
          padding: theme.spacing(2.5),
          '& .MuiButton-text': {
            paddingInline: theme.spacing(2.5),
          },
        },
      }),
    },
  },
};

export default dialog;
