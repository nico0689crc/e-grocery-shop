// React imports
import React from 'react'

// Material-UI imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

/**
 * TopBarLanguage Component
 *
 * A reusable component that renders a Material-UI Box with customizable styles and props.
 *
 * @param {BoxProps} props - Props passed to the Box component, including custom styles (`sx`).
 * @returns {React.ReactNode} The rendered TopBarLanguage component.
 */
const TopBarLanguage: React.FC<BoxProps> = props => {
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
      TopBarLanguage
    </Box>
  )
}

export default TopBarLanguage
