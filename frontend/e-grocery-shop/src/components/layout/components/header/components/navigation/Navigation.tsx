// Internal imports
import NavigationRoot from './NavigationRoot'
import NavigationContainer from './NavigationContainer'
import NavigationMenu from './NavigationMenu'
import { layoutClasses } from '@/components/layout/utils/layoutClasses'
import NavigationCategories from './NavigationCategories'

/**
 * Navigation component
 *
 * This component renders the navigation section of the header,
 * including the root, container, and menu elements.
 */
const Navigation = () => {
  return (
    <NavigationRoot className={layoutClasses.header.navigation.root}>
      <NavigationContainer className={layoutClasses.header.navigation.container}>
        <NavigationCategories className={layoutClasses.header.navigation.categories} />
        <NavigationMenu className={layoutClasses.header.navigation.menu} />
      </NavigationContainer>
    </NavigationRoot>
  )
}

export default Navigation
