import { layoutClasses } from '../../utils/layoutClasses'
import ContainerCommon from '../common/ContainerCommon'

const Footer = () => {
  return (
    <ContainerCommon
      className={layoutClasses.footer.root}
      component='footer'
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          lg: 'row'
        }
      }}
    >
      <div className='container mx-auto text-center'>
        <p>&copy; 2023 E-Grocery Shop. All rights reserved.</p>
      </div>
      <div className='container mx-auto text-center'>
        <p>&copy; 2023 E-Grocery Shop. All rights reserved.</p>
      </div>
    </ContainerCommon>
  )
}

export default Footer
