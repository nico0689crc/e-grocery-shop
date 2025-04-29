// External imports
import { Box } from '@mui/material' // Material-UI Box component
import type { BoxProps } from '@mui/material' // Type definition for Box props
import React from 'react'

/**
 * TopBarContent Component
 *
 * This component renders a responsive Material-UI Box with customizable styles and props.
 *
 * @param {BoxProps} props - Props passed to the Box component, including custom styles (sx).
 * @returns {React.ReactNode} A styled Box component.
 */
const TopBarContent = (props: BoxProps): React.ReactNode => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          display: 'flex',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      TopBarContent
    </Box>
  )
}

export default TopBarContent
