'use client';

import { useState, useCallback } from 'react';
import { Box, Stack, IconButton, useTheme, styled, keyframes } from '@mui/material';
import Iconify from '@/components/ui/Icon';
import { CldImage } from 'next-cloudinary';
import type { CarouselSlide } from '@/types';
import SlideImage from './SlideImage';

interface Props {
  slides: CarouselSlide[];
  height?: number; // alto en px – útil para el layout shift
}

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
`;

const Track = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const SlideBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'direction',
})<{ active: boolean; direction: 'next' | 'prev' }>(({ active, direction }) => ({
  minWidth: '100%',
  height: '100%',
  position: active ? 'relative' : 'absolute',
  top: 0,
  left: 0,
  animation: `${direction === 'next' ? slideIn : slideOut} .6s ease`,
}));

export default function Carousel({ slides, height = 480 }: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const theme = useTheme();

  const next = useCallback(() => {
    setDir('next');
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setDir('prev');
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        userSelect: 'none',
      }}
    >
      {/* carrusel principal */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Track>
          {slides.map(
            (slide, i) =>
              i === index && (
                <SlideBox key={i} active direction={dir}>
                  <SlideImage slide={slide} sizes="(max-width:768px) 100vw, 60vw" />
                </SlideBox>
              )
          )}
        </Track>

        {/* controles */}
        <IconButton
          aria-label="Anterior"
          onClick={prev}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,.4)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,.6)' },
          }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>
        <IconButton
          aria-label="Siguiente"
          onClick={next}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,.4)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,.6)' },
          }}
        >
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      </Box>

      {/* miniaturas */}
      <Stack direction="row" justifyContent="center" gap={1} mt={1}>
        {slides.map((s, i) => (
          <Box
            key={i}
            onClick={() => {
              setDir(i > index ? 'next' : 'prev');
              setIndex(i);
            }}
            sx={{
              width: 64,
              height: 48,
              position: 'relative',
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              outline: i === index ? `2px solid ${theme.palette.primary.main}` : 'none',
              opacity: i === index ? 1 : 0.6,
              transition: 'opacity .2s',
              '&:hover': { opacity: 1 },
            }}
          >
            <CldImage
              src={s.src}
              alt={s.alt ?? `thumb-${i}`}
              fill
              sizes="64px"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
