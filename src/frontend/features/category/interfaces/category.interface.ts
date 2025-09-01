import type { PaginatedDocs } from 'payload'

import type { BaseSearchRequest } from '@/frontend/interfaces'
import type { Category } from '@/payload-types'

export interface GetCategoryListRequest extends BaseSearchRequest {}

export interface GetCategoryListResponse extends PaginatedDocs<Category> {}
