// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/features/user/collections'
import { Media } from './payload/features/media/collections'
import { Products } from './payload/features/product/collections'

import { Categories } from './payload/features/category/collections'
import environmentConfig from './environment.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const config = buildConfig({
  admin: {
    theme: 'light',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      logout: {
        Button: {
          path: '@/payload/components',
          exportName: 'LogoutButton',
        },
      },
    },
  },
  collections: [Users, Media, Products, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'ไทย',
        code: 'th',
      },
    ],
    defaultLocale: 'en',
  },
})

export default config
