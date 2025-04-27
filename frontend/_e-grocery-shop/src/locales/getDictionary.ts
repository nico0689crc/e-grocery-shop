// Third-party Imports
'server-only'

// Type Imports
import type { Locale } from '@/locales/i18n'

const dictionaries = {
  en: () => import('@/locales/dictionaries/en.json').then(module => module.default),
  es: () => import('@/locales/dictionaries/es.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
