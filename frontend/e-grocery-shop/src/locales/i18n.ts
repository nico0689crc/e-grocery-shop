export const i18n = {
  cookieName: 'i18next-lng-cookie',
  defaultLocale: 'en',
  locales: ['en', 'es'],
  langDirection: {
    en: 'ltr',
    escapeRegExp: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
