'use server';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'cookie_consent';

export const getCookieConsent = async (): Promise<'granted' | 'denied' | null> => {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  return value === 'granted' || value === 'denied' ? value : null;
};

export const setCookieConsent = async (value: 'granted' | 'denied'): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, value, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
};
