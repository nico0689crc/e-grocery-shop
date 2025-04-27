// Types
import type { LangParamPromiseType } from '@/types';

// Utilities
import { getDictionary } from '@/lib/getDictionary';

// Components
import NotFoundView from '@/components/views/not-found/NotFoundView';

export const metadata = { title: '404 page not found! | Error' };

type NotFoundPageProps = LangParamPromiseType;

const NotFound = async ({ params }: NotFoundPageProps) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <NotFoundView dictionary={dictionary} lang={lang} />;
};

export default NotFound;
