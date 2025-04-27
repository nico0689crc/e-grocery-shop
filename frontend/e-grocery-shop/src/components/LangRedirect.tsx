'use client';

// Config Imports
import { i18n } from '@/config/i18n';
// Next Imports
import { redirect, usePathname } from 'next/navigation';

const LangRedirect = () => {
  const pathname = usePathname();

  const redirectUrl = `/${i18n.defaultLocale}${pathname}`;

  redirect(redirectUrl);
};

export default LangRedirect;
