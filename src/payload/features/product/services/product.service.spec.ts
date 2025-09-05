import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { mockedAxiosError, mockErrorResponseData, mockAxiosInstance } from '@/payload/__mock__'
import { adminGetProductDetail } from '@/payload/features/product/services'

import { mockAdminProductDetail } from './__mock__'

vi.mock('@/payload/libs', () => ({
  adminAxiosInstance: mockAxiosInstance,
}))

describe('adminGetProductDetail Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should get product detail by id with params', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockAdminProductDetail })

    const result = await adminGetProductDetail({ id: mockAdminProductDetail.id, locale: 'en' })

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products/1', {
      params: { locale: 'en' },
    })
    expect(result).toEqual(mockAdminProductDetail)
  })

  it('should throw response.data on AxiosError', async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(mockedAxiosError)

    await expect(adminGetProductDetail({ id: 1 })).rejects.toEqual(mockErrorResponseData)
  })

  it('should throw raw error if not AxiosError', async () => {
    const error = new Error('Unexpected')
    mockAxiosInstance.get.mockRejectedValueOnce(error)

    await expect(adminGetProductDetail({ id: 1 })).rejects.toThrow('Unexpected')
  })
})
