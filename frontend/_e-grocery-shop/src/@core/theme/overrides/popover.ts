// MUI Imports
import type { Theme } from '@mui/material/styles'

const popover: Theme['components'] = {
  MuiPopover: {
    styleOverrides: {
      paper: {
        boxShadow: 'var(--mui-customShadows-sm)'
      }
    }
  }
}

export default popover
