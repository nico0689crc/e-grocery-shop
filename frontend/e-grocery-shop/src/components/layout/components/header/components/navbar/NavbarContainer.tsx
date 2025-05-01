// External library imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Internal types
import type { PropsWithChildren } from '@/types'
import ContainerCommon from '../../../common/ContainerCommon'

/**
 * NavbarContainerProps combines PropsWithChildren and BoxProps to define the props for the NavbarContainer component.
 */
type NavbarContainerProps = PropsWithChildren & BoxProps

/**
 * NavbarContainer is a wrapper component that uses MUI's Box to create a flexible container for navigation items.
 *
 * @param {NavbarContainerProps} props - Props including children and BoxProps.
 * @returns {React.ReactNode} A styled Box component containing the children.
 */
const NavbarContainer = ({ children, ...props }: NavbarContainerProps): React.ReactNode => {
  const { sx, ...restProps } = props

  return (
    <ContainerCommon
      sx={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          flexDirection: 'row',
          py: '1.5rem',
          gap: 5,
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      {children}
    </ContainerCommon>
  )
}

export default NavbarContainer
