// React and Material-UI imports
import { Box, type BoxProps } from '@mui/material'

// Types
import type { PropsWithChildren } from '@/types'

/**
 * Props for the NavigationRoot component.
 * Combines children type and BoxProps from Material-UI.
 */
type NavigationRootProps = PropsWithChildren & BoxProps

/**
 * NavigationRoot component.
 * A wrapper component that renders its children inside a Material-UI Box.
 *
 * @param {NavigationRootProps} props - Props for the component.
 * @returns {React.ReactNode} The rendered component.
 */
const NavigationRoot = ({ children, ...props }: NavigationRootProps): React.ReactNode => {
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

export default NavigationRoot
