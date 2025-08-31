import { isAxiosError } from 'axios'

import {
  GetCategoryListRequest,
  GetCategoryListResponse,
} from '@/frontend/features/category/interfaces'
import { axiosInstance } from '@/frontend/libs'

export const getCategoryList = async (request: GetCategoryListRequest) => {
  try {
    const { data } = await axiosInstance.get<GetCategoryListResponse>('/categories', {
      params: request,
    })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw error
  }
}
