import NavbarRoot from './NavbarRoot'
import NavbarContainer from './NavbarContainer'
import { layoutClasses } from '@/components/layout/utils/layoutClasses'
import Logo from '../../../common/logo/Logo'
import NavbarInputSearch from './NavbarInputSearch'
import NavbarActions from './NavbarActions'

const Navbar = () => (
    <NavbarRoot className={layoutClasses.header.navBar.root}>
      <NavbarContainer className={layoutClasses.header.navBar.container}>
        <Logo className={layoutClasses.header.navBar.logo} />
        <NavbarInputSearch className={layoutClasses.header.navBar.search} />
        <NavbarActions className={layoutClasses.header.navBar.actions} />
      </NavbarContainer>
    </NavbarRoot>
  )

export default Navbar
