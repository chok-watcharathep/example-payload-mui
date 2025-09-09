import type { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: {
      th: 'หน้า',
      en: 'Page',
    },
    plural: {
      th: 'หน้า',
      en: 'Pages',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'ชื่อหน้า',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'รายละเอียด',
      required: true,
    },
  ],
}

export default Pages
