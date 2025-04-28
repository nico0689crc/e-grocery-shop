// External library imports
import { createNavigation } from 'next-intl/navigation';

// Internal imports
import { routing } from './routing';

// Lightweight wrappers around Next.js' navigation APIs
// that consider the routing configuration
export const { 
  Link, 
  redirect, 
  usePathname, 
  useRouter, 
  getPathname 
} = createNavigation(routing);