import type { CollectionConfig } from 'payload'

import { findOneCategoryIdentifier } from '@/shared/features/category/services'

const Categories: CollectionConfig = {
  slug: 'categories',
  // Enable trash to allow soft delete
  trash: true,
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
  versions: {
    drafts: {
      schedulePublish: true,
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

        const category = await findOneCategoryIdentifier(req.payload, idOrSlug, {
          locale: req.locale,
        })

        if (!category) {
          return Response.json({ error: 'Category not found' }, { status: 404 })
        }

        return Response.json(category)
      },
    },
  ],
}

export default Categories
