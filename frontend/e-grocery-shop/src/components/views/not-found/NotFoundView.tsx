// Configs
import routes from '@/config/routes';

// Components
import Illustrations from '@/components/Illustrations';
import { getTranslations } from 'next-intl/server';


const NotFoundView = async () => {
  const t = await getTranslations('pages.not_found');
  
  return (
    <Illustrations
      title={t('title')}
      description={t('description')}
      image="/images/illustrations/page_not_found.svg"
      alt={t('image_alt')}
      href={routes.pages.public.home}
      hrefText={t('go_home')}
    />
  )
};

export default NotFoundView;
