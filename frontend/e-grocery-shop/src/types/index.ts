// Type imports
import type { PropsWithChildren as PropsWithChildrenReact } from 'react'; // React types
import type { Locale } from './locales'; // Local types
import type { getDictionary } from '@/lib/getDictionary'; // Utility types

// Exported types
export type { PageType } from './pages'; // Page-specific types
export type { Locale } from './locales'; // Locale-specific types
export type * from './product'; // Locale-specific types

// General types
export type Mode = 'system' | 'light' | 'dark';
export type SystemMode = 'light' | 'dark';

// Parameter types
export type ParamsType<T extends Record<string, any> = {}> = {
  params: Promise<T & { lang: Locale }>;
};

export type LangParamType = {
  lang: Locale;
};

// Component types
export type PropsWithChildren = PropsWithChildrenReact;

// Utility types
export type DictionaryType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};
