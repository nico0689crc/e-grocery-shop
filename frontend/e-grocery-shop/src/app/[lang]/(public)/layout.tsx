// Types
import type { Locale } from '@/config/i18n';
import type { PropsWithChildren } from '@/types';

// Layout Components
import CookieBanner from '@/components/CookieBanner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getCookieConsent } from '@/lib/cookies';
import { getDictionary } from '@/lib/getDictionary';

type Props = PropsWithChildren & {
  params: Promise<{ lang: Locale }>;
};

// Layout Component
const Layout = async ({ params, children }: Props) => {
  const consent = await getCookieConsent();
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      {children}
      <CookieBanner dictionary={dictionary} lang={lang}/>
      {consent === 'granted' && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
      )}
    </>
  );
};

export default Layout;
