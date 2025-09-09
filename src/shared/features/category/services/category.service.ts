import type { JoinQuery, Payload } from 'payload'

import type { CategoriesSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export const findOneCategoryByIdentifier = async (
  payload: Payload,
  identifier: string | number,
  options: BaseAdminRequest<JoinQuery<'categories'>, CategoriesSelect>,
) => {
  const paginatedCategories = await payload.find({
    collection: 'categories',
    where: {
      or: [
        {
          slug: {
            equals: identifier,
          },
        },
        {
          id: {
            equals: identifier,
          },
        },
      ],
    },
    ...options,
  })

  if (!paginatedCategories.docs.length) {
    return
  }

  return paginatedCategories.docs[0]
}
