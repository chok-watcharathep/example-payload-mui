import type { JoinQuery, Payload } from 'payload'

import type { CategoriesSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export const findOneCategoryById = async (
  payload: Payload,
  id: string,
  options: BaseAdminRequest<JoinQuery<'categories'>, CategoriesSelect>,
) => {
  const category = await payload.findByID({
    collection: 'categories',
    id,
    ...options,
  })

  return category
}

export const findOneCategoryBySlug = async (
  payload: Payload,
  slug: string,
  options: BaseAdminRequest<JoinQuery<'categories'>, CategoriesSelect>,
) => {
  const paginatedCategories = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    ...options,
  })

  if (!paginatedCategories.docs.length) {
    return
  }

  return paginatedCategories.docs[0]
}
