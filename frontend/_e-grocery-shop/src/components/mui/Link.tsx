'use client'

// React Imports
import type { MouseEvent } from 'react'

// Next.js Imports
import NextLink from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import { Link as LinkMUI } from '@mui/material'
import type { LinkProps as LinkMUIProps } from '@mui/material/Link'

// Utils and Types
import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@/locales/i18n'

// Component Props
type Props = Omit<LinkMUIProps, 'href' | 'onClick'> & {
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const Link = ({ href, onClick, ...rest }: Props) => {
  const { lang: locale } = useParams()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event)
    } else if (!href) {
      event.preventDefault()
    }
  }

  return (
    <LinkMUI
      component={NextLink}
      href={getLocalizedUrl(href || '/', locale as Locale)}
      onClick={handleClick}
      {...rest}
    />
  )
}

export default Link
