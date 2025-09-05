import { useLocale } from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation'
import type { TypedLocale } from 'payload'

import { DEFAULT_LOCALE } from '@/shared/constants'

const useAdminLocale = () => {
  const searchParamsHook = useSearchParams()
  const locale = searchParamsHook.get('locale')
  const localeHook = useLocale()

  return (locale || localeHook.code || DEFAULT_LOCALE) as TypedLocale
}

export default useAdminLocale
