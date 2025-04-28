'use client'

import { PropsWithChildren } from "@/types";
import { Button, ButtonProps, LinkProps } from "@mui/material";
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