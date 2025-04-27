import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

const Iconify = (props: IconProps) => (
  <Icon width={24} height={24} style={{ fontSize: '1.5rem' }} {...props} />
);

export default Iconify;
