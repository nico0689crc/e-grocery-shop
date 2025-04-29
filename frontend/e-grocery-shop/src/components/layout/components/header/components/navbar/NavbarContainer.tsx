// External library imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Internal types
import type { PropsWithChildren } from '@/types'

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
    <Box
      sx={
        {
          display: 'flex',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          flexDirection: 'row',
          gap: 5,
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      {children}
    </Box>
  )
}

export default NavbarContainer
