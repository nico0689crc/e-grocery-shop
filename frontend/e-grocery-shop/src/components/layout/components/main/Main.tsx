import type { ChildrenType } from '@/@core/types'
import { layoutClasses } from '@/components/layout/utils/layoutClasses'
import ContainerCommon from '../common/ContainerCommon'

const Content = ({ children }: ChildrenType) => {
  return (
    <ContainerCommon
      className={layoutClasses.main.root}
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto'
      }}
    >
      {children}
    </ContainerCommon>
  )
}

export default Content
