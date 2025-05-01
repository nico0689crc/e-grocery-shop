// Next Imports
import { Public_Sans } from 'next/font/google';

// MUI Imports
import type { Theme } from '@mui/material/styles';

// Type Imports
import type { SystemMode } from '@/types';

// Theme Options Imports
import overrides from './overrides';
import colorSchemes from './colorSchemes';
import spacing from './spacing';
import shadows from './shadows';
import customShadows from './customShadows';
import typography from './typography';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const theme = (mode: SystemMode): Theme => ({
  components: overrides(),
  colorSchemes: colorSchemes(),
  ...spacing,
  shape: {
    borderRadius: 6,
    customBorderRadius: {
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 10,
    },
  },
  shadows: shadows(mode),
  typography: typography([publicSans.style.fontFamily].join(',')),
  customShadows: customShadows(mode),
  mainColorChannels: {
    light: '37 43 51',
    dark: '255 255 255',
    lightShadow: '46 38 61',
    darkShadow: '19 17 32',
  },
}) as Theme;

export default theme;
