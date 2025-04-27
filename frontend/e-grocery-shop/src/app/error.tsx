'use client';

// Types
import type { Locale } from '@/config/i18n';

// Hooks
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// Components
import ErrorView from '@/components/views/error/ErrorView';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Component definition
const Error = ({ error, reset }: ErrorPageProps) => {
  const { lang } = useParams();

  useEffect(() => {
    console.error('An error occurred while loading the page.', error);
  }, [error]);

  return <ErrorView lang={lang as Locale} reset={reset} />;
};

export default Error;
