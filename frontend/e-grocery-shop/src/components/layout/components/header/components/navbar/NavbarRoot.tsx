// React and MUI imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Types
import type { ChildrenType } from '@/@core/types'

/**
 * NavbarRoot component
 *
 * A wrapper component for the navigation bar that uses MUI's Box component.
 * It accepts children and additional BoxProps for customization.
 */
type NavbarRootProps = ChildrenType & BoxProps

const NavbarRoot = ({ children, ...props }: NavbarRootProps) => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      {children}
    </Box>
  )
}

export default NavbarRoot
