// External imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Types
// Removed unused import

/**
 * NavigationMenu Component
 *
 * A flexible navigation menu container that uses MUI's Box component.
 * It supports custom styles and props passed via BoxProps.
 *
 * @param {BoxProps} props - Props to customize the Box component.
 * @returns {JSX.Element} A styled Box component for navigation.
 */
const NavigationMenu = (props: BoxProps): JSX.Element => {
  const { sx, ...restProps } = props

  return (
    <Box
      component='nav'
      sx={
        {
          display: 'flex',
          flexDirection: 'row',
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      Navigation Menu
    </Box>
  )
}

export default NavigationMenu
