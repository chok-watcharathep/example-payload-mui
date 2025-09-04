import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { CategoryQueryKey } from '@/frontend/features/category/enums'
import type {
  GetCategoryListRequest,
  GetCategoryListResponse,
} from '@/frontend/features/category/interfaces'
import { getCategoryList } from '@/frontend/features/category/services'

const useGetCategoryList = (
  request: GetCategoryListRequest,
  options?: Omit<UseQueryOptions<GetCategoryListResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  const locale = useLocale()
  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery<GetCategoryListResponse, Error>({
    queryKey: [CategoryQueryKey.GET_CATEGORY_LIST, requestWithLocale],
    queryFn: () => getCategoryList(requestWithLocale),
    ...options,
  })
}

export default useGetCategoryList
