import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { ProductQueryKey } from '@/payload/features/product/enums'
import type {
  AdminGetProductDetailRequest,
  AdminGetProductDetailResponse,
} from '@/payload/features/product/interfaces'
import { adminGetProductDetail } from '@/payload/features/product/services'
import { useAdminLocale } from '@/payload/hooks'

const useAdminGetProductDetail = (
  request: AdminGetProductDetailRequest,
  options?: Omit<UseQueryOptions<AdminGetProductDetailResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  const locale = useAdminLocale()
  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery<AdminGetProductDetailResponse, Error>({
    queryKey: [ProductQueryKey.ADMIN_GET_PRODUCT_DETAIL, requestWithLocale],
    queryFn: () => adminGetProductDetail(requestWithLocale),
    staleTime: 3000,
    ...options,
  })
}

export default useAdminGetProductDetail
