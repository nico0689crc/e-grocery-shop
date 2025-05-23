// Config Imports
import { i18n } from '@/config/i18n';

// Util Imports
import { ensurePrefix } from '@/lib/string';

// Check if the url is missing the locale
export const isUrlMissingLocale = (url: string) =>
  i18n.locales.every((locale) => !(url.startsWith(`/${locale}/`) || url === `/${locale}`));

// Get the localized url
export const getLocalizedUrl = (url: string, languageCode: string): string => {
  if (!url || !languageCode) throw new Error("URL or Language Code can't be empty");

  return isUrlMissingLocale(url) ? `/${languageCode}${ensurePrefix(url, '/')}` : url;
};
