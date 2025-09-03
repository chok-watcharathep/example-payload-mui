import type { BaseAdminRequest } from '@/payload/interfaces'
import type { Product } from '@/payload-types'

export interface AdminGetProductDetailRequest extends BaseAdminRequest {
  id: string
}

export interface AdminGetProductDetailResponse extends Product {}
