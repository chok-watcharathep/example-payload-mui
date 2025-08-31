import type { PaginatedDocs } from 'payload'

import { BaseSearchRequest } from '@/frontend/interfaces'
import { Category } from '@/payload-types'

export interface GetCategoryListRequest extends BaseSearchRequest {}

export interface GetCategoryListResponse extends PaginatedDocs<Category> {}
