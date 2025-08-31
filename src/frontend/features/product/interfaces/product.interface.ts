import type { PaginatedDocs } from 'payload'

import { BaseSearchRequest } from '@/frontend/interfaces'
import { Product } from '@/payload-types'

export interface GetProductListRequest extends BaseSearchRequest {
  categoryId?: number
}

export interface GetProductListResponse extends PaginatedDocs<Product> {}

export interface GetProductDetailRequest {
  slug: string
}

export interface GetProductDetailResponse extends Product {}
