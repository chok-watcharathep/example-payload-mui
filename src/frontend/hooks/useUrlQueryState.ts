import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { DEFAUlT_PAGE, DEFAUlT_PAGE_SIZE } from '@/frontend/constants'

interface UseUrlQueryStateProps {
  scrollToTop?: boolean
  defaultPage?: string
  defaultLimit?: string
}

const useUrlQueryState = ({
  scrollToTop = true,
  defaultPage = DEFAUlT_PAGE,
  defaultLimit = DEFAUlT_PAGE_SIZE,
}: UseUrlQueryStateProps = {}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get('page') ?? defaultPage)
  const limit = Number(searchParams.get('limit') ?? defaultLimit)
  const search = searchParams.get('search') ?? ''

  const onPageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      params.set('limit', limit.toString())

      router.push(`${pathname}?${params.toString()}`, { scroll: scrollToTop })
    },
    [searchParams, router],
  )

  const onLimitChange = useCallback(
    (limit: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1') // Reset to first page
      params.set('limit', limit.toString())

      router.push(`${pathname}?${params.toString()}`, { scroll: scrollToTop })
    },
    [searchParams, router],
  )

  const onSearch = useCallback(
    ({ searchBy, search }: { searchBy: string; search: string }) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1') // Reset to first page
      params.set('searchBy', searchBy)
      params.set('search', search ?? '')

      router.push(`${pathname}?${params.toString()}`, { scroll: scrollToTop })
    },
    [searchParams, router],
  )

  const onApplyFilter = useCallback(
    (fieldValues: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1') // Reset to first page

      Object.keys(fieldValues).forEach((key) => {
        if (fieldValues[key]) {
          // apply only selected filters
          params.set(key, fieldValues[key])
        } else {
          // clear previous filter
          params.delete(key)
        }
      })

      router.push(`${pathname}?${params.toString()}`, { scroll: scrollToTop })
    },
    [searchParams, router],
  )

  const onClearFilter = useCallback(() => {
    router.push(pathname, { scroll: scrollToTop })
  }, [pathname, router])

  return {
    pagination: {
      page,
      limit,
      onPageChange,
      onLimitChange,
    },
    search: {
      search,
      onSearch,
    },
    filter: {
      onApplyFilter,
      onClearFilter,
    },
  }
}

export default useUrlQueryState
