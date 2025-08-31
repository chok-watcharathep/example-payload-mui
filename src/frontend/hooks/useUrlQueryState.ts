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

  const page = parseInt(searchParams.get('page') ?? defaultPage)
  const limit = parseInt(searchParams.get('limit') ?? defaultLimit)
  const searchKeyword = searchParams.get('searchKeyword') ?? ''

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
    ({ searchBy, searchKeyword }: { searchBy: string; searchKeyword: string }) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1') // Reset to first page
      params.set('searchBy', searchBy)
      params.set('searchKeyword', searchKeyword ?? '')

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
      searchKeyword,
      onSearch,
    },
    filter: {
      onApplyFilter,
      onClearFilter,
    },
  }
}

export default useUrlQueryState
