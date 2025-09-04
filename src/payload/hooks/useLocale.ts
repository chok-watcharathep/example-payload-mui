import { useSearchParams } from 'next/navigation'
import type { TypedLocale } from 'payload'

import { DEFAULT_LOCALE } from '@/shared/constants'

const useLocale = () => {
  const searchParamsHook = useSearchParams()
  const locale = searchParamsHook.get('locale')

  return (locale || DEFAULT_LOCALE) as TypedLocale
}

export default useLocale
