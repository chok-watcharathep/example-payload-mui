import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
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
  secret: environmentConfig.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: environmentConfig.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: environmentConfig.BLOB_READ_WRITE_TOKEN,
    }),
    seoPlugin({
      collections: ['categories', 'products'],
      uploadsCollection: 'media',
      // TODO: Change generateTitle and generateDescription when we have real data
      generateTitle: ({ doc }) => `Credit Port — ${doc.name} | The Ultimate Collection`,
      generateDescription: ({ doc }) =>
        `Discover our expertly curated collection of ${doc.name}. Find your next favorite item and elevate your style with our premium quality and unique.`,
      generateImage: ({ doc }) => doc.image,
    }),
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
