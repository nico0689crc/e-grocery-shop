// External imports
import FacebookWithCircle from '@/components/ui/icons/facebook-with-circle';
import InstagramWithCircle from '@/components/ui/icons/instagram-with-circle';
import TwitterWithCircle from '@/components/ui/icons/twitter-with-circle';
import type { PropsWithChildren } from '@/types';
import { Box, Link } from '@mui/material'
import type { BoxProps } from '@mui/material'

type SocialButtonProps = PropsWithChildren & {
  href: string;
}

const SocialButton = ({ href, children }: SocialButtonProps) => (
  <Link
    href={href}
    target="_blank"
    sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      "svg": {
        transition: 'all 0.3s ease',
        color: 'white',
      },
      ":hover": {
        "svg": {
          transform: 'scale(1.2)',
        }
      }
    }}
  >
    {children}
  </Link>
)

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
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "0.5rem",
        ...sx
      } as BoxProps['sx']}
      {...restProps}
    >
      <SocialButton href="https://www.facebook.com">
        <FacebookWithCircle />
      </SocialButton>
      <SocialButton href="https://www.facebook.com">
        <TwitterWithCircle />
      </SocialButton>
      <SocialButton href="https://www.facebook.com">
        <InstagramWithCircle />
      </SocialButton>
    </Box>
  )
}

export default TopBarSocial
