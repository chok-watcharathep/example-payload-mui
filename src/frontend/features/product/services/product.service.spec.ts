import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  getPaginatedDocsMock,
  mockAxiosInstance,
  mockedAxiosError,
  mockErrorResponseData,
} from '@/frontend/__mock__'
import { GetProductListRequest } from '@/frontend/features/product/interfaces'
import { getProductDetail, getProductList } from '@/frontend/features/product/services'

import { mockProductDetail, mockProductList } from './__mock__'

// Make Vitest use our manual mock
vi.mock('@/frontend/libs', () => ({
  axiosInstance: mockAxiosInstance,
}))

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getProductList', () => {
    it('should get product list without categoryId', async () => {
      const mockData = getPaginatedDocsMock(mockProductList)
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData })
      const request: GetProductListRequest = {
        page: 1,
        limit: 10,
      }

      const result = await getProductList(request)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products', { params: request })
      expect(result).toEqual(mockData)
    })

    it('should get product list with categoryId', async () => {
      const mockData = getPaginatedDocsMock(mockProductList)
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData })
      const request: GetProductListRequest = {
        page: 1,
        limit: 10,
        categoryId: 2,
      }

      const result = await getProductList(request)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products', {
        params: {
          ...request,
          where: {
            and: [{ category: { equals: 2 } }],
          },
        },
      })
      expect(result).toEqual(mockData)
    })

    it('should throw response.data on AxiosError', async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(mockedAxiosError)

      await expect(getProductList({ page: 1, limit: 10 })).rejects.toEqual(mockErrorResponseData)
    })

    it('should throw raw error if not AxiosError', async () => {
      const error = new Error('Unexpected')
      mockAxiosInstance.get.mockRejectedValueOnce(error)

      await expect(getProductList({ page: 1, limit: 10 })).rejects.toThrow('Unexpected')
    })
  })

  describe('getProductDetail', () => {
    it('should get product detail by slug', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockProductDetail })

      const result = await getProductDetail({ slug: 'prod' })

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products/prod')
      expect(result).toEqual(mockProductDetail)
    })

    it('should throw response.data on AxiosError', async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(mockedAxiosError)

      await expect(getProductDetail({ slug: 'x' })).rejects.toEqual(mockErrorResponseData)
    })

    it('should throw raw error if not AxiosError', async () => {
      const error = new Error('Boom!')
      mockAxiosInstance.get.mockRejectedValueOnce(error)

      await expect(getProductDetail({ slug: 'x' })).rejects.toThrow('Boom!')
    })
  })
})
