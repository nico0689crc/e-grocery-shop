// Next Imports
import type { headers } from 'next/headers'

// Type Imports
import type { Locale } from '@/locales/i18n'
import type { ChildrenType } from '@core/types'

// Component Imports
import LangRedirect from '@/components/LangRedirect'

// Config Imports
import { i18n } from '@/locales/i18n'

const invalidLangs = ['_next']

const TranslationWrapper = (
  props: { headersList: Awaited<ReturnType<typeof headers>>; lang: Locale } & ChildrenType
) => {
  const doesLangExist = i18n.locales.includes(props.lang)

  // ℹ️ This doesn't mean MISSING, it means INVALID
  const isInvalidLang = invalidLangs.includes(props.lang)

  return doesLangExist || isInvalidLang ? props.children : <LangRedirect />
}

export default TranslationWrapper
