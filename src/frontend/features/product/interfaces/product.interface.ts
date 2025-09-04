import type { PaginatedDocs, JoinQuery } from 'payload'

import type { Product, ProductsSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

// TODO: Change BaseAdminRequest to BaseSearchRequest when call core api
export interface GetProductListRequest
  extends BaseAdminRequest<JoinQuery<'products'>, ProductsSelect> {
  categoryId?: number
}

export interface GetProductListResponse extends PaginatedDocs<Product> {}

export interface GetProductDetailRequest {
  slug: string
}

export interface GetProductDetailResponse extends Product {}
