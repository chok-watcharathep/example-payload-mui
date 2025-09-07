import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      th: 'ผู้ใช้',
      en: 'User',
    },
    plural: {
      th: 'ผู้ใช้',
      en: 'Users',
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useSessions: false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
