import type { JoinQuery, Payload } from 'payload'

import type { ProductsSelect } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export const findOneProductBySlug = async (
  payload: Payload,
  slug: string,
  options: BaseAdminRequest<JoinQuery<'products'>, ProductsSelect>,
) => {
  const paginatedProducts = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    ...options,
  })

  if (!paginatedProducts.docs.length) {
    return
  }

  return paginatedProducts.docs[0]
}
