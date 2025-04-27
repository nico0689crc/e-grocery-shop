import { CldImage } from 'next-cloudinary';
import { Box, Skeleton, CircularProgress } from '@mui/material';
import type { CarouselSlide } from '@/types';
import { useState } from 'react';

function SlideImage({ slide, sizes }: { slide: CarouselSlide; sizes: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && (
        <>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ position: 'absolute', inset: 0 }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={48} />
          </Box>
        </>
      )}
      <CldImage
        src={slide.src}
        alt={slide.alt ?? ''}
        fill
        sizes={sizes}
        priority
        placeholder={slide.blurDataURL ? 'blur' : undefined}
        blurDataURL={slide.blurDataURL}
        style={{
          objectFit: 'cover',
          transition: 'opacity .3s ease',
          opacity: loaded ? 1 : 0,
        }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
}

export default SlideImage;
