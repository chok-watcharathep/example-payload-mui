import type { CollectionConfig } from 'payload'

const Universities: CollectionConfig = {
  slug: 'universities',
  labels: {
    singular: {
      th: 'มหาวิทยาลัย',
    },
    plural: {
      th: 'มหาวิทยาลัย',
    },
  },
  admin: {
    // This property hides the collection from the sidebar and dashboard.
    hidden: true,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'faculties',
      type: 'array',
      label: 'คณะ',
      required: true,
      fields: [
        {
          name: 'faculty',
          type: 'relationship',
          relationTo: 'faculties',
          required: true,
        },
        {
          name: 'majors',
          type: 'relationship',
          relationTo: 'majors',
          hasMany: true,
        },
      ],
    },
  ],
}

export default Universities
