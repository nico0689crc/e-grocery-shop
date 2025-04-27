// Type Imports
import type { PropsWithChildren } from '@/types';
import type { Locale } from '@/config/i18n';

// HOC Imports
import GuestOnlyRoute from '@/components/guards/GuestOnlyGuard';

const Layout = async (props: PropsWithChildren & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params;

  const { children } = props;

  return <GuestOnlyRoute lang={params.lang}>{children}</GuestOnlyRoute>;
};

export default Layout;
