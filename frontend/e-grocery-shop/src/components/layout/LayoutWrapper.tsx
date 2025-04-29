// External Libraries
import { Box } from '@mui/material'

// Types
import type { PropsWithChildren } from '@/types'

// Components
import Main from '@layout/components/main/Main'
import Footer from '@layout/components/footer/Footer'
import Header from '@layout/components/header/Header'

// Utilities
import { layoutClasses } from '@layout/utils/layoutClasses'

/**
 * LayoutWrapper Component
 * This component serves as the main layout wrapper for the application.
 * It includes the Header, Main content area, and Footer.
 */
const LayoutWrapper = ({ children }: PropsWithChildren) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      minHeight: '100vh'
    }}
    className={layoutClasses.layout.root}
  >
    {/* Header */}
    <Header />

    {/* Main Content */}
    <Main>{children}</Main>

    {/* Footer */}
    <Footer />
  </Box>
)

export default LayoutWrapper
