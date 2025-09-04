import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import type { TypedLocale } from 'payload'

import { DEFAULT_LOCALE } from '@/shared/constants'

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = (store.get('locale')?.value || DEFAULT_LOCALE) as TypedLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
