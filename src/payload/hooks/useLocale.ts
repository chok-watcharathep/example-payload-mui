import { useSearchParams } from 'next/navigation'

const useLocale = () => {
  const searchParamsHook = useSearchParams()
  const locale = searchParamsHook.get('locale')

  return locale || 'th'
}

export default useLocale
