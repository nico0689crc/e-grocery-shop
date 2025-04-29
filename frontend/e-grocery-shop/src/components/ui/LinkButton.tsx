'use client'

import type { PropsWithChildren } from "@/types";
import type { ButtonProps} from "@mui/material";
import { Button } from "@mui/material";
import { Link } from '@/lib/i18n/navigation';

type LinkButtonProps = ButtonProps & PropsWithChildren

const LinkButton = ({ href, children, ...props }: LinkButtonProps) => (
  <Button
    component={Link}
    href={href}
    variant="contained"
    color="primary"
    size="large"
    {...props}
  >
    {children}
  </Button>
)

export default LinkButton;