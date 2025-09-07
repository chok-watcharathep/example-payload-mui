import type { JoinQuery, Payload } from 'payload'

import type { ProductsSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export const findOneProductIdentifier = async (
  payload: Payload,
  identifier: string | number,
  options: BaseAdminRequest<JoinQuery<'products'>, ProductsSelect>,
) => {
  const paginatedProducts = await payload.find({
    collection: 'products',
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

  if (!paginatedProducts.docs.length) {
    return
  }

  return paginatedProducts.docs[0]
}
