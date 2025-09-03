import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { ProductQueryKey } from '@/payload/features/product/enums'
import type {
  AdminGetProductDetailRequest,
  AdminGetProductDetailResponse,
} from '@/payload/features/product/interfaces'
import { adminGetProductDetail } from '@/payload/features/product/services'

const useAdminGetProductDetail = (
  request: AdminGetProductDetailRequest,
  options?: Omit<UseQueryOptions<AdminGetProductDetailResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<AdminGetProductDetailResponse, Error>({
    queryKey: [ProductQueryKey.ADMIN_GET_PRODUCT_DETAIL, request],
    queryFn: () => adminGetProductDetail(request),
    ...options,
  })
}

export default useAdminGetProductDetail
