import type { JoinQuery } from 'payload'

import type { Product, ProductsSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export interface AdminGetProductDetailRequest
  extends BaseAdminRequest<JoinQuery<'products'>, ProductsSelect> {
  id: string
}

export interface AdminGetProductDetailResponse extends Product {}
