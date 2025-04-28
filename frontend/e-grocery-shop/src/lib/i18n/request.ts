// External imports
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

// Internal imports
import { routing } from './routing';

// Exporting the request configuration
export default getRequestConfig(async ({ requestLocale }) => {
  // Retrieve the requested locale (typically corresponds to the `[locale]` segment)
  const requested = await requestLocale;

  // Determine the locale to use (fallback to defaultLocale if not found)
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Return the locale and corresponding messages
  return {
    locale,
    messages: (await import(`@/data/dictionaries/${locale}.json`)).default,
  };
});