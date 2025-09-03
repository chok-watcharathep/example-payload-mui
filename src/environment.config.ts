import { z } from 'zod'

const environmentSchema = z.object({
  // public
  NEXT_PUBLIC_APP_BASE_URL: z.string().readonly(),
  NEXT_PUBLIC_API_ENDPOINT: z.string().readonly(),
  NEXT_PUBLIC_PAYLOAD_API_ENDPOINT: z.string().readonly(),
  // private
  DATABASE_URI: z.string().optional().readonly(),
  PAYLOAD_SECRET: z.string().optional().readonly(),
  BLOB_READ_WRITE_TOKEN: z.string().optional().readonly(),
})

const environmentConfig = (() => {
  const env = typeof window === 'undefined' ? process.env : window.__ENV

  return environmentSchema.safeParse(env).data || ({} as EnvironmentConfig)
})()

export type EnvironmentConfig = z.infer<typeof environmentSchema>

export default environmentConfig
