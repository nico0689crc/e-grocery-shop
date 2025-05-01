// External imports
import { Box, Chip, Typography } from '@mui/material' // Material-UI Box component
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
          paddingY: '0.5rem',
          alignItems: 'center',
          gap: '0.25rem',
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      <Chip 
        label="HOT"
        variant="filled"
        color="primary"
        size='small'
      />
      <Typography
        variant="body2"
        sx={{
          marginLeft: '0.5rem',
          fontWeight: 600,
          color: `rgb(var(--mui-mainColorChannels-dark) / 1)`,
        }}
      >
        Free Express Shipping
      </Typography>
    </Box>
  )
}

export default TopBarContent
