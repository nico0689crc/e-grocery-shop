import type { BreadcrumbLinkType } from '@/types';
import { Typography, Breadcrumbs as BreadcrumbsMUI, Link as LinkMUI } from '@mui/material';
import Link from 'next/link';

type BreadcrumbsProps = {
  links: BreadcrumbLinkType[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => (
  <BreadcrumbsMUI aria-label="breadcrumb">
    {links.map((link, index) =>
      link.href ? (
        <LinkMUI
          component={Link}
          href={link.href}
          className="MuiLink-with-hover-effect"
          sx={{
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'none',
            },
          }}
        >
          {link.title}
        </LinkMUI>
      ) : (
        <Typography sx={{ color: 'text.primary' }}>{link.title}</Typography>
      )
    )}
  </BreadcrumbsMUI>
);

export default Breadcrumbs;
