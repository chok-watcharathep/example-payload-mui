import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      th: 'สินค้า',
      en: 'Product',
    },
    plural: {
      th: 'สินค้า',
      en: 'Products',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        components: {},
      },
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        components: {
          Cell: {
            path: '@/payload/components',
            exportName: 'PriceCell',
          },
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Category',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
          ],
        },
        {
          label: 'Comments',
          fields: [
            {
              name: 'comments',
              type: 'relationship',
              relationTo: 'comments',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}

export default Products
