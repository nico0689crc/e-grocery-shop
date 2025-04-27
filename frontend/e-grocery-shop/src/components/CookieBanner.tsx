'use client';

import type { DictionaryType, LangParamType } from '@/types';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Link as LinkMUI } from '@mui/material';
import Link from 'next/link';
import themeConfig from '@/config/app-config';
import { getLocalizedUrl } from '@/lib/i18n';
import routes from '@/config/routes';

type CookieBannerProps = DictionaryType & LangParamType;

export default function CookieBanner({ dictionary, lang }: CookieBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie_consent='))
      ?.split('=')[1];
    if (!consent) setShow(true);
  }, []);

  const handleConsent = (value: 'granted' | 'denied') => {
    document.cookie = `cookie_consent=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: value,
      });
    }
    setShow(false);

    if(value === 'granted') {
      window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        flexDirection: {
          xs: 'column',
          [themeConfig.breakpointToChangeLayout]: 'row',
        },
        gap: 5,
        justifyContent: 'space-between',
        bottom: 0,
        width: '100%',
        bgcolor: 'primary.main',
        borderTop: 1,
        borderColor: 'divider',
        boxShadow: 3,
        p: 5,
        zIndex: 1300,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexGrow: 1,
        gap: 2,
        flexDirection: {
          xs: 'column',
          [themeConfig.breakpointToChangeLayout]: 'row',
        },
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#000000', fontWeight: 500 }}>
          {dictionary.cookies_banner.description}
        </Typography>
        <LinkMUI 
          component={Link} 
          href={getLocalizedUrl("/", lang)}
          sx={{ 
            fontWeight: 600,
            width: 'fit-content', 
            color: '#000000',
            '&.MuiLink-with-hover-effect': {
              '&:after': {
                borderColor: '#000000',
              },
            },
          }}
          className='MuiLink-with-hover-effect'
        >
          {dictionary.cookies_banner.learn_more}
        </LinkMUI>
      </Box>
      <Box sx={{ display: 'flex', gap: 5 }}>
        <Button
          variant="contained"
          size='small'
          color="inherit"
          onClick={() => handleConsent('denied')}
          sx={{
            backgroundColor: "#424242", color: "#ffffff",
          }}
        >
          {dictionary.cookies_banner.decline}
        </Button>
        <Button
          variant="contained"
          color='primary'
          size='small'
          onClick={() => handleConsent('granted')}
          sx={{
            border: '1px solid #000000',
          }}
        >
          {dictionary.cookies_banner.accept}
        </Button>
      </Box>
    </Box>
  );
}
