import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category'],
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Products
