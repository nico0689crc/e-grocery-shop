// MUI Imports
import type { Theme } from '@mui/material/styles'

const accordion: Theme['components'] = {
  MuiAccordion: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['margin', 'border-radius', 'box-shadow']),
        '&:not(.Mui-expanded):has(+ .Mui-expanded)': {
          borderBottomLeftRadius: 'var(--mui-shape-borderRadius)',
          borderBottomRightRadius: 'var(--mui-shape-borderRadius)'
        },
        '&.Mui-expanded': {
          borderRadius: 'var(--mui-shape-borderRadius)',
          margin: theme.spacing(2, 0),
          '& + .MuiAccordion-root': {
            borderTopLeftRadius: 'var(--mui-shape-borderRadius)',
            borderTopRightRadius: 'var(--mui-shape-borderRadius)',
            '&:before': {
              opacity: 0
            }
          }
        }
      })
    }
  },
  MuiAccordionSummary: {
    defaultProps: {
      expandIcon: <i className='ri-arrow-down-s-line' />
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3, 5),
        color: 'var(--mui-palette-text-primary)',
        '&.Mui-expanded': {
          minHeight: 48
        },
        '& .MuiTypography-root': {
          color: 'inherit',
          fontWeight: theme.typography.fontWeightMedium
        }
      }),
      content: {
        margin: '0 !important'
      },
      expandIconWrapper: {
        color: 'var(--mui-palette-text-primary)',
        fontSize: '1.25rem',
        '& i, & svg': {
          fontSize: 'inherit'
        }
      }
    }
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 5, 5),
        '& .MuiTypography-root': {
          color: 'var(--mui-palette-text-secondary)'
        }
      })
    }
  }
}

export default accordion
