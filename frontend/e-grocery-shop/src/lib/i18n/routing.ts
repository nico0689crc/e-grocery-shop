// External library imports
import { defineRouting } from 'next-intl/routing';

// Define routing configuration
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'en',
});