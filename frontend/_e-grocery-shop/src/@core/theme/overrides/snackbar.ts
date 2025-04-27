import type { Theme } from '@mui/material/styles'

const snackbar: Theme['components'] = {
  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 4),
        boxShadow: 'var(--mui-customShadows-xs)',
        '& .MuiSnackbarContent-message': {
          paddingBlock: theme.spacing(3)
        }
      })
    }
  }
}

export default snackbar
