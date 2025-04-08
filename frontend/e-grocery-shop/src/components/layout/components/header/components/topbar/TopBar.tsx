// External imports
import { layoutClasses } from '@/components/layout/utils/layoutClasses'

// Internal imports
import TopBarContainer from './TopBarContainer'
import TopBarContent from './TopBarContent'
import TopBarLanguage from './TopBarLanguage'
import TopBarRoot from './TopBarRoot'
import TopBarSocialMedias from './TopBarSocialMedias'

// TopBar component: Renders the top bar section of the header
const TopBar = () => {
  return (
    <TopBarRoot className={layoutClasses.header.topBar.root}>
      <TopBarContainer className={layoutClasses.header.topBar.container}>
        <TopBarContent className={layoutClasses.header.topBar.content} />
        <TopBarLanguage className={layoutClasses.header.topBar.language} />
        <TopBarSocialMedias className={layoutClasses.header.topBar.socialMedias} />
      </TopBarContainer>
    </TopBarRoot>
  )
}

export default TopBar
