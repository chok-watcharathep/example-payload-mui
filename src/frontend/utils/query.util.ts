import { DEFAUlT_PAGE, DEFAUlT_PAGE_SIZE } from '@/frontend/constants'
import type { BaseSearchRequest } from '@/frontend/interfaces'

export const getUrlQueryState = (searchParams: BaseSearchRequest) => {
  const page = Number(searchParams.page?.toString() ?? DEFAUlT_PAGE)
  const pageSize = Number(searchParams.limit?.toString() ?? DEFAUlT_PAGE_SIZE)
  const search = searchParams.search ?? ''

  return {
    page,
    pageSize,
    search,
  }
}
