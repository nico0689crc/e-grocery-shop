// External library imports
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

// Component Props
/**
 * Props for the Logo component.
 * Extends BoxProps from MUI, excluding the `className` property.
 */
type LogoProps = Omit<BoxProps, 'className'> & {
  className: string
}

/**
 * Logo Component
 * A reusable component to display the logo of the e-grocery shop.
 */
const Logo = (props: LogoProps) => {
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
      <span className='text-xl font-bold'>E-Grocery Shop Logo</span>
    </Box>
  )
}

export default Logo
