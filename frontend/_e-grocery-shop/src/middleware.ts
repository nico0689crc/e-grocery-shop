import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import acceptLanguage from 'accept-language'

import { i18n } from '@/locales/i18n'

const languages = i18n.locales
const defaultLanguage = i18n.defaultLocale

acceptLanguage.languages([...languages])

export function middleware(req: NextRequest) {
  let lng

  if (req?.cookies?.has(i18n.cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(i18n.cookieName)?.value)
  }

  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }

  if (!lng) {
    lng = defaultLanguage
  }

  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string)
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()

    if (lngInReferer) {
      response.cookies.set(i18n.cookieName, lngInReferer)
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}
