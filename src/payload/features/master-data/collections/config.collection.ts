import type { CollectionConfig } from 'payload'

const Configs: CollectionConfig = {
  slug: 'configs',
  labels: {
    singular: {
      th: 'ค่าตั้งค่า',
      en: 'Config',
    },
    plural: {
      th: 'ค่าตั้งค่า',
      en: 'Configs',
    },
  },
  admin: {
    group: 'Example',
  },
  fields: [
    {
      name: 'key',
      label: 'Key',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
  ],
}

export default Configs
