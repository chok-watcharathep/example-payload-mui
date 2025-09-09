import type { JoinQuery, Payload } from 'payload'

import type { PagesSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export const findOnePageByIdentifier = async (
  payload: Payload,
  identifier: string | number,
  options: BaseAdminRequest<JoinQuery<'pages'>, PagesSelect>,
) => {
  const paginatedPages = await payload.find({
    collection: 'pages',
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

  if (!paginatedPages.docs.length) {
    return
  }

  return paginatedPages.docs[0]
}
