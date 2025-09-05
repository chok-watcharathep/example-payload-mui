import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

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
  const locale = useLocale()
  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery<GetProductListResponse, Error>({
    queryKey: [ProductQueryKey.GET_PRODUCT_LIST, requestWithLocale],
    queryFn: () => getProductList(requestWithLocale),
    ...options,
  })
}

export default useGetProductList
