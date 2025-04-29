// React and Material-UI imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Types
import type { PropsWithChildren } from '@/types'

// Define the props for the TopBarContainer component
type TopBarContainerProps = PropsWithChildren & BoxProps

/**
 * TopBarContainer component
 * A wrapper component that uses Material-UI's Box to provide a flexible container
 * for its children with predefined styles.
 */
const TopBarContainer = ({ children, ...props }: TopBarContainerProps) => {
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

export default TopBarContainer
