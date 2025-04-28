// Types
import type { Metadata } from 'next';
import type { PageType, Locale } from '@/types';

// Data
import metadata from '@/data/pages/metadata';

// Enums

/**
 * Fetches metadata for a given page.
 * @param page - The page type.
 * @returns An object containing metadata for each locale.
 */
const getMetadata = (page: PageType): { [key in Locale]: Metadata } => {
  try {
    const pageMetadata = metadata[page];
    if (!pageMetadata || !('en' in pageMetadata) || !('es' in pageMetadata)) {
      throw new Error(`Invalid metadata structure for page: ${page}`);
    }
    return pageMetadata as { en: Metadata; es: Metadata };
  } catch (error) {
    console.error('Error fetching default metadata:', error);
    throw error;
  }
};

export default getMetadata;
