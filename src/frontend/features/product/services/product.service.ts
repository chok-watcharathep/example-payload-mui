import { isAxiosError } from 'axios'
import type { Where } from 'payload'

import type {
  GetProductListRequest,
  GetProductListResponse,
  GetProductDetailRequest,
  GetProductDetailResponse,
} from '@/frontend/features/product/interfaces'
import { axiosInstance } from '@/frontend/libs'

export const getProductList = async (request: GetProductListRequest) => {
  // TODO: Remove (where) when integrate with real API
  const where: Where = {
    and: [
      {
        category: {
          equals: request.categoryId,
        },
      },
    ],
  }

  try {
    const { data } = await axiosInstance.get<GetProductListResponse>('/products', {
      params: request.categoryId
        ? {
            ...request,
            where,
          }
        : request,
    })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw error
  }
}

export const getProductDetail = async (request: GetProductDetailRequest) => {
  try {
    const { data } = await axiosInstance.get<GetProductDetailResponse>(`/products/${request.slug}`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw error
  }
}
