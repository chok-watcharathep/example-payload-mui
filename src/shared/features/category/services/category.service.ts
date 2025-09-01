import type { Payload } from 'payload'

export const findOneCategoryById = async (payload: Payload, id: string) => {
  const category = await payload.findByID({
    collection: 'categories',
    id,
  })

  return category
}

export const findOneCategoryBySlug = async (payload: Payload, slug: string) => {
  const paginatedCategories = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!paginatedCategories.docs.length) {
    return
  }

  return paginatedCategories.docs[0]
}
