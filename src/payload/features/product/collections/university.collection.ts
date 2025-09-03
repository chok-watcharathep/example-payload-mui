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
      label: 'มหาวิทยาลัย',
      type: 'text',
      required: true,
    },
    {
      name: 'faculties',
      type: 'array',
      label: 'คณะและสาขา',
      labels: {
        singular: {
          th: 'คณะและสาขา',
        },
        plural: {
          th: 'คณะและสาขา',
        },
      },
      required: true,
      fields: [
        {
          name: 'faculty',
          label: 'คณะ',
          type: 'relationship',
          relationTo: 'faculties',
          required: true,
        },
        {
          name: 'majors',
          label: 'สาขา',
          type: 'relationship',
          relationTo: 'majors',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
}

export default Universities
