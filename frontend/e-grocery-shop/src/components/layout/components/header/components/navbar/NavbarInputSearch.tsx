// External imports
import SearchIcon from '@/components/ui/icons/search';
import type { BoxProps } from '@mui/material';
import { Box, TextField } from '@mui/material'

/**
 * NavbarInputSearch Component
 *
 * A reusable search input component styled with Material-UI's Box and custom styles.
 *
 * @param {BoxProps} props - Props passed to the Box component, including sx for styling.
 * @returns {React.ReactNode} The rendered search input component.
 */
const NavbarInputSearch = (props: BoxProps): React.ReactNode => {
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
      <TextField
        variant='outlined'
        placeholder='Search...'
        sx={{
          width: '100%',
          maxWidth: '600px',
        }}
        slotProps={{
          input: {
            startAdornment: (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'var(--mui-palette-secondary-main)', 
                  paddingInline: '0.5rem 1rem',
                  marginRight: '1rem',
                  borderRight: '1px solid var(--mui-palette-secondary-main)', 
                }}
              >
                <SearchIcon size={28}  />
              </Box>
            )
          }
        }}
      />
    </Box>
  )
}

export default NavbarInputSearch
