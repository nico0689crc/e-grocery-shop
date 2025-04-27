// Types
import type { DictionaryType, LangParamType } from '@/types';

// Configs
import routes from '@/config/routes';

// Utils
import { getLocalizedUrl } from '@/lib/i18n';

// Components
import Illustrations from '@/components/Illustrations';

// Types
type NotFoundViewProps = DictionaryType & LangParamType;

const NotFoundView = ({ dictionary, lang }: NotFoundViewProps) => (
  <Illustrations
    title={dictionary.pages.not_found.title}
    description={dictionary.pages.not_found.description}
    image="/images/illustrations/page_not_found.svg"
    alt={dictionary.pages.not_found.image_alt}
    href={getLocalizedUrl(routes.pages.public.home, lang)}
    hrefText={dictionary.pages.not_found.go_home}
  />
);

export default NotFoundView;
