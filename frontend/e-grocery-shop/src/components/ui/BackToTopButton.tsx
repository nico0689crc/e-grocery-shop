'use client';

import { Fab } from '@mui/material';
import { useBackToTop } from 'minimal-shared/hooks';
import Iconify from './Icon';

const BackToTopButton = () => {
  const { onBackToTop, isVisible } = useBackToTop('30%', true);

  return (
    <Fab
      color="primary"
      aria-label="Back to top"
      onClick={onBackToTop}
      sx={[
        (theme) => ({
          width: 48,
          height: 48,
          position: 'fixed',
          transform: 'scale(0)',
          right: { xs: 24, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          transition: theme.transitions.create(['transform']),
          ...(isVisible && { transform: 'scale(1)' }),
        }),
      ]}
    >
      <Iconify width={24} icon="radix-icons:double-arrow-up" />
    </Fab>
  );
};

export default BackToTopButton;
