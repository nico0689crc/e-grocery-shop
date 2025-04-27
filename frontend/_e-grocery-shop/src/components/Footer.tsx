// External libraries
import Link from 'next/link'

// Internal modules
import type { Locale } from '@/locales/i18n'
import { i18n } from '@/locales/i18n'

export const Footer = async ({ language }: { language: Locale }) => {
  return (
    <footer style={{ marginTop: 50 }}>
      {i18n.locales
        .filter(locale => language !== locale)
        .map((locale, index) => (
          <span key={locale}>
            {index > 0 && ' or '}
            <Link href={`/${locale}`}>{locale}</Link>
          </span>
        ))}
    </footer>
  )
}
