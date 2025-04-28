'use client';

// Next Imports
import { redirect, usePathname } from 'next/navigation';

// Type Imports
import type { Locale } from '@/types';

// Config Imports
import routes from '@/config/routes';

// Util Imports
import { getLocalizedUrl } from '@/lib/i18n';

const AuthRedirect = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname();

  // ℹ️ Bring me `lang`
  const redirectUrl = `/${lang}/login?redirectTo=${pathname}`;
  const login = `/${lang}/login`;
  const homePage = getLocalizedUrl(routes.pages.authenticated.dashboard, lang);

  return redirect(pathname === login ? login : pathname === homePage ? login : redirectUrl);
};

export default AuthRedirect;
