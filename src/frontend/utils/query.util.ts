import { DEFAUlT_PAGE, DEFAUlT_PAGE_SIZE } from '@/frontend/constants'
import type { BaseSearchRequest } from '@/frontend/interfaces'

interface GetUrlQueryStateOptions {
  defaultPage?: string
  defaultPageSize?: string
}

export const getUrlQueryState = (
  searchParams: BaseSearchRequest,
  options?: GetUrlQueryStateOptions,
) => {
  const page = Number(searchParams.page?.toString() ?? options?.defaultPage ?? DEFAUlT_PAGE)
  const pageSize = Number(
    searchParams.limit?.toString() ?? options?.defaultPageSize ?? DEFAUlT_PAGE_SIZE,
  )
  const search = searchParams.search ?? ''

  return {
    page,
    pageSize,
    search,
  }
}
