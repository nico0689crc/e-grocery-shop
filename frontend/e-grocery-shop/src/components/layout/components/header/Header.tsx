// Internal imports
import Navbar from '@layout/components/header/components/navbar/Navbar' // Component for the navigation bar
import TopBar from '@layout/components/header/components/topbar/TopBar' // Component for the top section of the header
import Navigation from '@layout/components/header/components/navigation/Navigation' // Component for additional navigation options
import { layoutClasses } from '@layout/utils/layoutClasses'
import { Box } from '@mui/material'

/**
 * Header component
 *
 * Represents the header section of the application, including the top bar and navigation menu.
 */
const Header = () => (
    <Box
      component='header'
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
      className={layoutClasses.header.root}
    >
      <TopBar />
      <Navbar />
      <Navigation />
    </Box>
  )

export default Header
