import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { ProductQueryKey } from '@/frontend/features/product/enums'
import type {
  GetProductListRequest,
  GetProductListResponse,
} from '@/frontend/features/product/interfaces'
import { getProductList } from '@/frontend/features/product/services'

const useGetProductList = (
  request: GetProductListRequest,
  options?: Omit<UseQueryOptions<GetProductListResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<GetProductListResponse, Error>({
    queryKey: [ProductQueryKey.GET_PRODUCT_LIST, request],
    queryFn: () => getProductList(request),
    ...options,
  })
}

export default useGetProductList
