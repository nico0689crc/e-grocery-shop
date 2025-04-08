// External imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Internal imports
import type { ChildrenType } from '@/@core/types'

/**
 * NavigationContainer Component
 *
 * A flexible container for navigation elements, built using MUI's Box component.
 * It supports custom styles and accepts children elements.
 *
 * @param {NavigationProps} props - Props including children and BoxProps.
 * @returns {JSX.Element} The rendered navigation container.
 */
type NavigationProps = ChildrenType & BoxProps

const NavigationContainer = ({ children, ...props }: NavigationProps): JSX.Element => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          ...sx,
          display: 'flex',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          flexDirection: 'row'
        } as BoxProps['sx']
      }
      {...restProps}
    >
      {children}
    </Box>
  )
}

export default NavigationContainer
