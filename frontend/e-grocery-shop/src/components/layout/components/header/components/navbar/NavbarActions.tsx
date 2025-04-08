// External imports
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

/**
 * NavbarActions Component
 *
 * This component renders action buttons (Login and Sign Up) inside a styled Box container.
 * It accepts `className` and `sx` as props for additional styling.
 *
 * @param {BoxProps} props - Props for the Box component.
 * @returns {JSX.Element} The rendered NavbarActions component.
 */
const NavbarActions = (props: BoxProps): JSX.Element => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      <button className='bg-blue-500 text-white px-4 py-2 rounded'>Login</button>
      <button className='bg-green-500 text-white px-4 py-2 rounded'>Sign Up</button>
    </Box>
  )
}

export default NavbarActions
