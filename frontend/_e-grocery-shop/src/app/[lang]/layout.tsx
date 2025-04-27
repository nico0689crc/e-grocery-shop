// Types
import { headers } from 'next/headers'

import type { Metadata } from 'next'

import type { ChildrenType } from '@core/types'

// Components
import Providers from '@/components/Providers'

// HOCs
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Utilities
import type { Locale } from '@/locales/i18n'
import { i18n } from '@/locales/i18n'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

// Metadata
export const metadata: Metadata = {
  title: 'E-Grocery Shop',
  description:
    "E-Grocery Shop is a grocery store that sells groceries online. It is a one-stop shop for all your grocery needs. You can find everything from fresh produce to canned goods, all at the click of a button. E-Grocery Shop is the perfect solution for busy people who don't have time to go to the store. With E-Grocery Shop, you can shop from the comfort of your own home, and have your groceries delivered right to your door."
}

// Static Params
export async function generateStaticParams() {
  return i18n.locales.map(lang => ({ lang }))
}

// Types
type RootLayoutProps = ChildrenType & {
  params: Promise<{ lang: Locale }>
}

// Root Layout Component
export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params

  const headersList = await headers()

  return (
    <TranslationWrapper headersList={headersList} lang={lang}>
      <html lang={lang}>
        <body suppressHydrationWarning style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
        </body>
      </html>
    </TranslationWrapper>
  )
}
