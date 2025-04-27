import type { PropsWithChildren } from '@/types';
import type { Locale } from '@/config/i18n';
import AuthenticatedGuard from '@/components/guards/AuthenticatedGuard';

const PrivateLayout = async (props: PropsWithChildren & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params;

  const { children } = props;

  // Vars
  // const dictionary = await getDictionary(params.lang)
  // const mode = await getMode()
  // const systemMode = await getSystemMode()

  return <AuthenticatedGuard locale={params.lang}>{children}</AuthenticatedGuard>;
};

export default PrivateLayout;
