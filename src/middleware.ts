import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'es',

  // Always use locale prefix except for default locale
  localePrefix: 'as-needed'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
}
