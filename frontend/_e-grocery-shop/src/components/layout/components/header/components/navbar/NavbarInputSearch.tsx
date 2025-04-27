// External imports
import { Box, type BoxProps } from '@mui/material'

/**
 * NavbarInputSearch Component
 *
 * A reusable search input component styled with Material-UI's Box and custom styles.
 *
 * @param {BoxProps} props - Props passed to the Box component, including sx for styling.
 * @returns {JSX.Element} The rendered search input component.
 */
const NavbarInputSearch = (props: BoxProps): JSX.Element => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          ...sx
        } as BoxProps['sx']
      }
      {...restProps}
    >
      <input
        type='text'
        placeholder='Search...'
        className='w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500'
      />
    </Box>
  )
}

export default NavbarInputSearch
