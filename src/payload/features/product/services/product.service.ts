import { isAxiosError } from 'axios'

import type {
  AdminGetProductDetailRequest,
  AdminGetProductDetailResponse,
} from '@/payload/features/product/interfaces'
import { adminAxiosInstance } from '@/payload/libs'

export const adminGetProductDetail = async (request: AdminGetProductDetailRequest) => {
  const { id, ...rest } = request
  try {
    const { data } = await adminAxiosInstance.get<AdminGetProductDetailResponse>(
      `/products/${id}`,
      {
        params: rest,
      },
    )
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw error
  }
}
