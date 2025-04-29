// Types
import type { PropsWithChildren } from '@/types';
import type { LinkProps as LinkPropsMUI } from '@mui/material';

// Components
import { Link as LinkMUI } from '@mui/material';
import { Link as LinkI18n } from '@/lib/i18n/navigation';

interface LinkProps extends LinkPropsMUI, PropsWithChildren {}

// Custom Link component
const Link = ({ children, href, ...props }: LinkProps) => (
  <LinkMUI
    component={LinkI18n}
    href={href}
    {...props}
  >
    {children}
  </LinkMUI>
);

export default Link;