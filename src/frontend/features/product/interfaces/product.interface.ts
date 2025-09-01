import type { PaginatedDocs } from 'payload'

import type { BaseSearchRequest } from '@/frontend/interfaces'
import type { Product } from '@/payload-types'

export interface GetProductListRequest extends BaseSearchRequest {
  categoryId?: number
}

export interface GetProductListResponse extends PaginatedDocs<Product> {}

export interface GetProductDetailRequest {
  slug: string
}

export interface GetProductDetailResponse extends Product {}
