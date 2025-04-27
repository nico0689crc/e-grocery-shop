// Types
import type { Theme } from '@mui/material/styles';

const list: Theme['components'] = {
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        '&.MuiLink-with-hover-effect': {
          position: 'relative',
          '&:after': {
            position: 'absolute',
            content: "''",
            height: '2px',
            width: 0,
            left: '50%',
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            color: '#fff',
            borderWidth: '0px 0px 3px 0px',
            borderStyle: 'solid',
            borderColor: 'var(--mui-palette-primary-main)',
            transition: 'all 0.3s ease-in-out',
            transform: 'translate(-50%, 0) translateZ(0)',
          },
          '&:hover': {
            '&:after': {
              width: '100%',
            },
          },
        },
      },
    },
  },
};

export default list;
