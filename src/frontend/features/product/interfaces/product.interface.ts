import { Product } from '@/payload-types'

export interface GetProductListRequest {
  categorySlug?: string
}

export interface GetProductListResponse {
  data: Product[]
}

export interface GetProductDetailRequest {
  slug: string
}

export interface GetProductDetailResponse extends Product {}
