import type { CollectionConfig } from 'payload'

import { findOneCategoryById, findOneCategoryBySlug } from '@/shared/features/category/services'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      th: 'หมวดหมู่',
      en: 'Category',
    },
    plural: {
      th: 'หมวดหมู่',
      en: 'Categories',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Example',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 100,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      localized: true,
      maxLength: 100,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/:idOrSlug',
      method: 'get',
      handler: async (req) => {
        const idOrSlug = req.routeParams?.idOrSlug as string

        const categoryById = await findOneCategoryById(req.payload, idOrSlug)

        if (categoryById) {
          return Response.json(categoryById)
        }

        const categoryBySlug = await findOneCategoryBySlug(req.payload, idOrSlug)

        if (categoryBySlug) {
          return Response.json(categoryBySlug)
        }

        return Response.json({ error: 'Category not found' }, { status: 404 })
      },
    },
  ],
}

export default Categories
