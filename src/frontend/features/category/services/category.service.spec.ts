import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  mockAxiosInstance,
  mockedAxiosError,
  mockErrorResponseData,
  getPaginatedDocsMock,
} from '@/frontend/__mock__'
import type { GetCategoryListRequest } from '@/frontend/features/category/interfaces'
import { getCategoryList } from '@/frontend/features/category/services'

import { mockCategoryList } from './__mock__'

// Make Vitest use our manual mock
vi.mock('@/frontend/libs', () => ({
  axiosInstance: mockAxiosInstance,
}))

describe('Category Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getCategoryList', () => {
    it('should get category list successfully', async () => {
      const mockData = getPaginatedDocsMock(mockCategoryList)
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData })
      const request: GetCategoryListRequest = {
        page: 1,
        limit: 10,
      }

      const result = await getCategoryList(request)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/categories', { params: request })
      expect(result).toEqual(mockData)
    })

    it('should throw response.data on AxiosError', async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(mockedAxiosError)

      await expect(getCategoryList({ page: 1, limit: 10 })).rejects.toEqual(mockErrorResponseData)
    })

    it('should throw raw error if not AxiosError', async () => {
      const error = new Error('Unexpected')
      mockAxiosInstance.get.mockRejectedValueOnce(error)

      await expect(getCategoryList({ page: 1, limit: 10 })).rejects.toThrow('Unexpected')
    })
  })
})
