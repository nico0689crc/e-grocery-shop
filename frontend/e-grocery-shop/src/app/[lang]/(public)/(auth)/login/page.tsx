'use client';

// External libraries
import { Button, Stack, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// Configs and utilities
import type { Locale } from '@/config/i18n';
import routes from '@/config/routes';
import { getLocalizedUrl } from '@/lib/i18n';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const { lang: locale } = useParams();
  const router = useRouter();

  const onClickHandler = useCallback(async () => {
    const res = await signIn('credentials', {
      email: 'administrador@tareas.com',
      password: 'password',
      redirect: false,
    });

    try {
      if (res && res.ok && res.error === null) {
        // Vars
        const redirectURL = searchParams.get('redirectTo') ?? routes.pages.authenticated.dashboard;

        router.replace(getLocalizedUrl(redirectURL, locale as Locale));
      } else {
        const errorMessage = res?.error
          ? JSON.parse(res.error)?.message || 'An unknown error occurred'
          : 'Login failed. Please try again.';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Optionally, you can display an error message to the user here
    }
  }, [locale, router, searchParams]);

  return (
    <Stack>
      <Typography>LoginPage</Typography>
      <Button onClick={onClickHandler}>Login</Button>
    </Stack>
  );
};

export default LoginPage;
