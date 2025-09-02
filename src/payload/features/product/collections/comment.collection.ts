// src/collections/Comments.ts

import type { CollectionConfig } from 'payload'

const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: {
      en: 'Comment',
      th: 'ความคิดเห็น',
    },
    plural: {
      en: 'Comments',
      th: 'ความคิดเห็น',
    },
  },
  admin: {
    // This property hides the collection from the sidebar and dashboard.
    hidden: true,
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Comment Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Author',
          fields: [
            {
              name: 'authorName',
              type: 'text',
              required: true,
            },
            {
              name: 'authorImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    // {
    //   name: 'product',
    //   type: 'relationship',
    //   relationTo: 'products',
    //   required: true,
    //   hasMany: false,
    // },
  ],
}

export default Comments
