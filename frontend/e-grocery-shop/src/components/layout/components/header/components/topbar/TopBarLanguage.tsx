'use client'

// React imports
import React, { useRef, useState } from 'react'

// Next.js imports
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'

// Material-UI imports
import type { BoxProps } from '@mui/material'
import {
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@mui/material'

// Custom component imports
import Iconify from '@/components/ui/Icon'

// Utility imports
import { routing } from '@/lib/i18n/routing'
import ArrowDown from '@/components/ui/icons/arrow-down'

/**
 * Utility function to get the localized path.
 *
 * @param {string} pathName - The current path name.
 * @param {string} locale - The target locale.
 * @returns {string} The localized path.
 */
const getLocalePath = (pathName: string, locale: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')
  segments[1] = locale
  return segments.join('/')
}

/**
 * TopBarLanguage Component
 *
 * A reusable component that renders a language selector in the top bar.
 *
 * @param {BoxProps} props - Material-UI Box props.
 * @returns {React.ReactNode} The rendered TopBarLanguage component.
 */
const TopBarLanguage = (props: BoxProps): React.ReactNode => {
  const t = useTranslations()

  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null)

  // Hooks
  const pathName = usePathname()
  const { lang } = useParams()

  // Handlers
  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        className={open ? 'dropdown-open' : ''}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          paddingInline: '0',
          color: 'white',
          "svg": {
            transition: 'transform 0.3s ease',
          },
          '&.dropdown-open svg': {
            transform: 'rotate(180deg)'
          }
        }}
        onClick={handleToggle}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'white',
            textTransform: 'uppercase',
          }}
        >
          {t('language_name')}
        </Typography>
        <ArrowDown />
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement="auto"
        anchorEl={anchorRef.current}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onKeyDown={handleClose}>
                  {routing.locales.map(localeItem => (
                    <MenuItem
                      key={localeItem}
                      component={Link}
                      href={getLocalePath(pathName, localeItem)}
                      onClick={handleClose}
                      selected={lang === localeItem}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          textTransform: 'uppercase',
                        }}
                      >
                        {localeItem === 'en' ? 'English' : localeItem === 'es' ? 'Español' : localeItem}
                      </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default TopBarLanguage
