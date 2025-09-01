import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

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
  return useQuery<GetCategoryListResponse, Error>({
    queryKey: [CategoryQueryKey.GET_CATEGORY_LIST, request],
    queryFn: () => getCategoryList(request),
    ...options,
  })
}

export default useGetCategoryList
