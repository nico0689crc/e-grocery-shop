// External library imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

/**
 * NavigationCategories Component
 *
 * A reusable component that renders a Box with customizable styles and props.
 *
 * @param props - Props inherited from MUI's Box component.
 * @returns A styled Box component.
 */
const NavigationCategories = (props: BoxProps) => {
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
      Navigation Categories
    </Box>
  )
}

export default NavigationCategories
