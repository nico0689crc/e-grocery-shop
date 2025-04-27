import { Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

type IllustrationsProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  hrefText: string;
  moreActions?: React.ReactNode;
};

const Illustrations = (props: IllustrationsProps) => {
  const { title, description, image, alt, href, hrefText, moreActions = null } = props;

  return (
    <>
      <Image
        src={image}
        alt={alt}
        width={300}
        height={300}
        className="illustration-image"
        style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }}
        priority
      />
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        {title}
      </Typography>
      <Typography variant="subtitle1" component="p" gutterBottom sx={{ textAlign: 'center' }}>
        {description}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <Button
          component={Link}
          href={href}
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
        >
          {hrefText}
        </Button>
        {moreActions}
      </Stack>
    </>
  );
};

export default Illustrations;
