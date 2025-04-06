// External libraries
import { ApolloWrapper } from '@/graphql/lib/client/apollo-wrapper'

// Contexts
import { SettingsProvider } from '@/@core/contexts/settings/SettingsProvider'

// Types
import type { ChildrenType } from '@/@core/types'

// Utilities
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'

// Theme
import ThemeProvider from '@/components/theme'

type Props = ChildrenType

const Providers = async ({ children }: Props) => {
  const mode = await getMode()
  const systemMode = await getSystemMode()
  const settingsCookie = await getSettingsFromCookie()

  return (
    <ApolloWrapper>
      <SettingsProvider mode={mode} settingsCookie={settingsCookie}>
        <ThemeProvider systemMode={systemMode}>{children}</ThemeProvider>
      </SettingsProvider>
    </ApolloWrapper>
  )
}

export default Providers
