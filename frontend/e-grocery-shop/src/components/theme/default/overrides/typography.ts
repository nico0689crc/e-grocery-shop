// MUI Imports
import type { Theme } from '@mui/material/styles';

const typography: Theme['components'] = {
  MuiTypography: {
    styleOverrides: {
      root: {
        variants: [
          ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2'].map(
            (variant) => ({
              props: { variant },
              style: ({ theme }: { theme: Theme }) => ({
                color:
                  variant === 'body2' || variant === 'subtitle2'
                    ? 'var(--mui-palette-text-secondary)'
                    : 'var(--mui-palette-text-primary)',
                fontSize: {
                  h1: '2.5rem',
                  h2: '2rem',
                  h3: '1.75rem',
                  h4: '1.5rem',
                  h5: '1.25rem',
                  h6: '1.125rem',
                  body1: '0.9rem',
                  body2: '0.8rem',
                  subtitle1: '1.125rem',
                  subtitle2: '1rem',
                }[variant],
                [theme.breakpoints.up('lg')]: {
                  fontSize: {
                    h1: '3.5rem',
                    h2: '3rem',
                    h3: '2.5rem',
                    h4: '2rem',
                    h5: '1.75rem',
                    h6: '1.5rem',
                    body1: '1rem',
                    body2: '0.95rem',
                    subtitle1: '1.375rem',
                    subtitle2: '1.25rem',
                  }[variant],
                },
                '& mark': {
                  backgroundColor: 'var(--mui-palette-primary-main)',
                  color: 'var(--mui-palette-primary-contrastText)',
                  paddingInline: '0.2rem',
                },
              }),
            })
          ),
        ],
      },
      gutterBottom: ({ theme }) => ({
        marginBottom: theme.spacing(2),
      }),
    },
  },
};

export default typography;
