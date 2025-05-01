// External imports
import AccountCircle from '@/components/ui/icons/account-circle'
import CartCircle from '@/components/ui/icons/cart-circle'
import { Badge, Box, IconButton } from '@mui/material'
import type { BoxProps } from '@mui/material'

/**
 * NavbarActions Component
 *
 * This component renders action buttons (Login and Sign Up) inside a styled Box container.
 * It accepts `className` and `sx` as props for additional styling.
 *
 * @param {BoxProps} props - Props for the Box component.
 * @returns {React.ReactNode} The rendered NavbarActions component.
 */
const NavbarActions = (props: BoxProps): React.ReactNode => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          marginRight: '0.3rem',
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      <IconButton>
        <AccountCircle size={30} />
      </IconButton>
      <Badge badgeContent='5' color='primary'>
        <IconButton>
          <CartCircle size={30} />
        </IconButton>
      </Badge>
    </Box>
  )
}

export default NavbarActions
