// External imports: Importing necessary components and types from external libraries
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Internal imports: Importing custom types from the core module
import type { ChildrenType } from '@core/types'

/**
 * TopBarRootProps
 * Defines the props for the TopBarRoot component, combining ChildrenType and BoxProps.
 */
type TopBarRootProps = ChildrenType & BoxProps

/**
 * TopBarRoot component
 * A wrapper component that uses MUI's Box and accepts children and additional BoxProps.
 *
 * @param {TopBarRootProps} props - Props containing children and additional BoxProps.
 * @returns {JSX.Element} A styled Box component wrapping the children.
 */
const TopBarRoot = ({ children, ...props }: TopBarRootProps): JSX.Element => {
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

export default TopBarRoot
