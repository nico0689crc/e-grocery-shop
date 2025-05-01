// External imports: Importing necessary components and types from external libraries
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Internal imports: Importing custom types from the core module
import type { PropsWithChildren } from '@/types'
import React from 'react'

/**
 * TopBarRootProps
 * Defines the props for the TopBarRoot component, combining PropsWithChildren and BoxProps.
 */
type TopBarRootProps = PropsWithChildren & BoxProps

/**
 * TopBarRoot component
 * A wrapper component that uses MUI's Box and accepts children and additional BoxProps.
 *
 * @param {TopBarRootProps} props - Props containing children and additional BoxProps.
 * @returns {React.ReactNode} A styled Box component wrapping the children.
 */
const TopBarRoot = ({ children, ...props }: TopBarRootProps): React.ReactNode => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          backgroundColor: '#2b3445',
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
