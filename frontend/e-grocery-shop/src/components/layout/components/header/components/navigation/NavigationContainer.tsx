// External imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

// Internal imports
import type { PropsWithChildren } from '@/types'
import React from 'react'

/**
 * NavigationContainer Component
 *
 * A flexible container for navigation elements, built using MUI's Box component.
 * It supports custom styles and accepts children elements.
 *
 * @param {NavigationProps} props - Props including children and BoxProps.
 * @returns {React.ReactNode} The rendered navigation container.
 */
type NavigationProps = PropsWithChildren & BoxProps

const NavigationContainer = ({ children, ...props }: NavigationProps): React.ReactNode => {
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
