import type { PaginatedDocs, JoinQuery } from 'payload'

import type { CategoriesSelect, Category } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

// TODO: Change BaseAdminRequest to BaseSearchRequest when call core api
export interface GetCategoryListRequest
  extends BaseAdminRequest<JoinQuery<'categories'>, CategoriesSelect> {}

export interface GetCategoryListResponse extends PaginatedDocs<Category> {}
