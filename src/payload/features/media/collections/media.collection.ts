import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      th: 'สื่อ',
      en: 'Media',
    },
    plural: {
      th: 'สื่อ',
      en: 'Media',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'videoPreview',
      type: 'ui',
      admin: {
        condition: (_, { mimeType }) => mimeType.startsWith('video'),
        components: {
          Field: {
            path: '@/payload/features/media/components',
            exportName: 'VideoPreviewField',
          },
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
  },
}

export default Media
