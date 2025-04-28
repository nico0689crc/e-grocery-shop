// Next Imports
import { redirect } from 'next/navigation';

// Third-party Imports
import { getServerSession } from 'next-auth';

// Type Imports
import type { PropsWithChildren } from '@/types';
import type { Locale } from '@/types';

// Config Imports
import routes from '@/config/routes';

// Util Imports
import { getLocalizedUrl } from '@/lib/i18n';

const GuestOnlyGuard = async ({ children, lang }: PropsWithChildren & { lang: Locale }) => {
  const session = await getServerSession();

  if (session) {
    redirect(getLocalizedUrl(routes.pages.authenticated.dashboard, lang));
  }

  return <>{children}</>;
};

export default GuestOnlyGuard;
