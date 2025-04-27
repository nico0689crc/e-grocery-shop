// External imports
import { Box } from '@mui/material' // Material-UI Box component
import type { BoxProps } from '@mui/material' // Type definition for Box props

/**
 * TopBarContent Component
 *
 * This component renders a responsive Material-UI Box with customizable styles and props.
 *
 * @param {BoxProps} props - Props passed to the Box component, including custom styles (sx).
 * @returns {JSX.Element} A styled Box component.
 */
const TopBarContent = (props: BoxProps): JSX.Element => {
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
