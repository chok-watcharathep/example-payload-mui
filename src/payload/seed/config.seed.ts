/* eslint-disable no-console */
import type { Payload } from 'payload'

import type { Config1 } from '@/payload-types'

const configsToSeed: Pick<Config1, 'key' | 'value' | 'description'>[] = [
  {
    key: 'site-title',
    value: 'My Awesome Website',
    description: 'The title of the website',
  },
  {
    key: 'contact-email',
    value: 'contact@example.com',
    description: 'The email address to contact the website',
  },
  {
    key: 'items-per-page',
    value: '10',
    description: 'The number of items to display per page',
  },
]

export async function seedConfigs(payload: Payload): Promise<void> {
  console.log('Seeding the "configs" collection...')

  for (const config of configsToSeed) {
    const existingConfig = await payload.find({
      collection: 'configs',
      where: {
        key: {
          equals: config.key,
        },
      },
      limit: 1,
    })

    if (existingConfig.docs.length > 0) {
      console.log(`Updating config "${config.key}"...`)
      await payload.update({
        collection: 'configs',
        where: {
          key: {
            equals: config.key,
          },
        },
        data: {
          value: config.value,
          description: config.description,
        },
      })
    } else {
      console.log(`Creating config "${config.key}"...`)
      await payload.create({
        collection: 'configs',
        data: config,
      })
    }
  }

  console.log('Finished seeding "configs".')
}
