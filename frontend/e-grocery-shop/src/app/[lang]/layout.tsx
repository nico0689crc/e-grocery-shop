// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

// Config Imports
import { i18n } from '@/config/i18n';

// Utility Imports
import { getSystemMode } from '@/lib/serverHelpers';

// Component Imports
import TranslationWrapper from '@/components/TranslationWrapper';

// Type Importss
import type { PropsWithChildren, ParamsType } from '@/types';

import Providers from '@/components/providers';
import getMetadata from '@/request/server/metadata/get-metadata';
import BackToTopButton from '@/components/ui/BackToTopButton';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { getCookieConsent } from '@/lib/cookies';
import CookieBanner from '@/components/CookieBanner';
import { GoogleAnalytics } from '@next/third-parties/google';

export async function generateMetadata(props: ParamsType) {
  const params = await props.params;
  const metadata = getMetadata('default');

  return metadata[params.lang];
}

const RootLayout = async (props: PropsWithChildren & ParamsType) => {
  const consent = await getCookieConsent();
  const params = await props.params;
  const { children } = props;

  // Vars
  const systemMode = await getSystemMode();
  const direction = i18n.langDirection[params.lang];

  return (
    <TranslationWrapper lang={params.lang}>
      <html id="__next" lang={params.lang} dir={direction} suppressHydrationWarning>
        <head>
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'denied'
                });
              `,
            }}
          />
        </head>
        <body>
          <Providers>
            <LayoutWrapper>
              <InitColorSchemeScript attribute="data" defaultMode={systemMode} />
              {children}
              <BackToTopButton />
              <CookieBanner />
              {consent === 'granted' && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
              )}
            </LayoutWrapper>
          </Providers>
        </body>
      </html>
    </TranslationWrapper>
  );
};

export default RootLayout;
