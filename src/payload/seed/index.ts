/* eslint-disable no-console */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'

import { seedConfigs } from './config.seed'

/**
 * Main function to initialize Payload and run all seeding scripts.
 */
async function runSeed() {
  const payload = await getPayload({
    config: config,
  })

  try {
    console.log('Starting full database seed...')
    await seedConfigs(payload)
    console.log('Full database seed complete! ✅')
    process.exit(0)
  } catch (err) {
    console.error('Database seeding failed: ❌', err)
    process.exit(1)
  }
}

runSeed()
