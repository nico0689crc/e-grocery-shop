// Type Imports
import type { PropsWithChildren } from '@/types';

// Context Imports
import { NextAuthProvider } from '@/components/next-auth/NextAuthProvider';
import { SettingsProvider } from '@/components/settings/settings.provider';
import ThemeProvider from '@/components/theme';
import ReduxProvider from '@/redux-store/ReduxProvider';

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@/lib/serverHelpers';

type Props = PropsWithChildren;

const Providers = async (props: Props) => {
  // Props
  const { children } = props;

  // Vars
  const mode = await getMode();
  const settingsCookie = await getSettingsFromCookie();
  const systemMode = await getSystemMode();

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider systemMode={systemMode}>
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </SettingsProvider>
    </NextAuthProvider>
  );
};

export default Providers;
