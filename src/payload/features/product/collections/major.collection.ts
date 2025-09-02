import type { CollectionConfig } from 'payload'

const Majors: CollectionConfig = {
  slug: 'majors',
  labels: {
    singular: {
      th: 'สาขา',
    },
    plural: {
      th: 'สาขา',
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
      name: 'description',
      type: 'textarea',
    },
  ],
}

export default Majors
