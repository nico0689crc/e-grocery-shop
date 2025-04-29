// External imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

/**
 * TopBarSocial Component
 *
 * A reusable component that renders a Box with specific styling for social media elements in the top bar.
 *
 * @param {BoxProps} props - Props passed to the Box component, including sx for custom styles.
 * @returns {React.ReactNode} The rendered TopBarSocial component.
 */
const TopBarSocial = (props: BoxProps): React.ReactNode => {
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
      TopBarSocial
    </Box>
  )
}

export default TopBarSocial
