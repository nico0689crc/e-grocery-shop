// Third-party Imports
import { getServerSession } from 'next-auth';

// Type Imports
import type { Locale } from '@/config/i18n';
import type { PropsWithChildren } from '@/types';

// Component Imports
import AuthRedirect from '@/components/AuthRedirect';

export default async function AuthenticatedGuard({
  children,
  locale,
}: PropsWithChildren & { locale: Locale }) {
  const session = await getServerSession();

  return <>{session ? children : <AuthRedirect lang={locale} />}</>;
}
