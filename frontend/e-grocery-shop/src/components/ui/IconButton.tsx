import type { PropsWithChildren } from '@/types';
import type { LinkProps } from '@mui/material';

import { Link, Tooltip } from '@mui/material';

type IconButonProps = PropsWithChildren &
  LinkProps & {
    title: string;
  };

const IconButton = ({ children, title, ...props }: IconButonProps) => {
  const { sx, ...restProps } = props;

  return (
    <Tooltip title={title} arrow>
      <Link
        sx={{
          display: 'flex',
          cursor: 'pointer',
          color: 'var(--mui-palette-text-primary)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            scale: 1.1,
          },
          ...sx,
        }}
        {...restProps}
      >
        {children}
      </Link>
    </Tooltip>
  );
};

export default IconButton;
