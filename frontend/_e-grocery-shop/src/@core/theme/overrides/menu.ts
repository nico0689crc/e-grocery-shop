// MUI Imports
import type { Theme } from '@mui/material/styles'

const menu: Theme['components'] = {
  MuiMenu: {
    defaultProps: {},
    styleOverrides: {
      paper: ({ theme }) => ({
        marginBlockStart: theme.spacing(0.5)
      })
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingBlock: theme.spacing(2),
        color: 'var(--mui-palette-text-primary)',
        '& i, & svg': {
          fontSize: '1.375rem'
        },
        '& .MuiListItemIcon-root': {
          minInlineSize: 0
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
          color: 'var(--mui-palette-primary-main)',
          '& .MuiListItemIcon-root': {
            color: 'var(--mui-palette-primary-main)'
          },
          '&:hover, &.Mui-focused, &.Mui-focusVisible': {
            backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
          }
        },
        '&.Mui-disabled': {
          color: 'var(--mui-palette-text-disabled)',
          opacity: 1
        }
      })
    }
  }
}

export default menu
