import type { CollectionConfig } from 'payload'

const Faculties: CollectionConfig = {
  slug: 'faculties',
  labels: {
    singular: {
      th: 'คณะ',
    },
    plural: {
      th: 'คณะ',
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

export default Faculties
