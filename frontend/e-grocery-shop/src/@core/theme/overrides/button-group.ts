// MUI Imports
import type { Theme } from '@mui/material/styles'

const buttonGroup: Theme['components'] = {
  MuiButtonGroup: {
    defaultProps: {},
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === 'text' && {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: `var(--mui-palette-${ownerState.color}-main)`
          }
        })
      }),
      contained: ({ ownerState }) => ({
        boxShadow: 'var(--mui-customShadows-xs)',
        ...(ownerState.disabled && {
          boxShadow: 'none'
        })
      })
    }
  }
}

export default buttonGroup
