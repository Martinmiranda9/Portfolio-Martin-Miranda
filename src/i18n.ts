import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Can be imported from a shared config
export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  // Wait for the requested locale
  let locale = await requestLocale

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'es' // fallback to default locale instead of 404
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
