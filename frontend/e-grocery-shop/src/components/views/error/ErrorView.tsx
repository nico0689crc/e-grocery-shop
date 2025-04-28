// Types
import type { LangParamType } from '@/types';

// Components
import Illustrations from '@/components/Illustrations';

// Configs
import routes from '@/config/routes';

// Utilities
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

// Types
type ErrorViewProps = {
  reset: () => void;
};

const ErrorView = ({ reset }: ErrorViewProps) => {
  const t = useTranslations('pages.error');
  
  return (
    <Illustrations
      title={t('title')}
      description={t('description')}
      image="/images/illustrations/error.svg"
      alt={t('image_alt')}
      href={routes.pages.public.home}
      hrefText={t('go_home')}
      moreActions={
        <Button variant="outlined" color="secondary" onClick={reset}>
          {t('retry')}
        </Button>
      }
    />
  )
};

export default ErrorView;
