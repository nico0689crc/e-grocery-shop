// Next Imports
import type { headers } from 'next/headers';
// Type Imports
import type { Locale } from '@/config/i18n';
import type { PropsWithChildren } from '@/types';

// Config Imports
import { i18n } from '@/config/i18n';
// Component Imports
import LangRedirect from '@/components/LangRedirect';

// ℹ️ We've to create this array because next.js makes request with `_next` prefix for static/asset files
const invalidLangs = ['_next'];

const TranslationWrapper = (
  props: { headersList: Awaited<ReturnType<typeof headers>>; lang: Locale } & PropsWithChildren
) => {
  const doesLangExist = i18n.locales.includes(props.lang);

  const isInvalidLang = invalidLangs.includes(props.lang);

  return doesLangExist || isInvalidLang ? props.children : <LangRedirect />;
};

export default TranslationWrapper;
