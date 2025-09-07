import { z } from 'zod'

const environmentSchema = z.object({
  // public
  NEXT_PUBLIC_APP_BASE_URL: z.string().readonly(),
  NEXT_PUBLIC_API_ENDPOINT: z.string().readonly(),
  NEXT_PUBLIC_PAYLOAD_API_ENDPOINT: z.string().readonly(),
  // private
  DATABASE_URI: z.string().optional().readonly(),
  PAYLOAD_SECRET: z.string().optional().readonly(),
  S3_ACCESS_KEY_ID: z.string().optional().readonly(),
  S3_SECRET_ACCESS_KEY: z.string().optional().readonly(),
  S3_BUCKET_NAME: z.string().optional().readonly(),
  S3_REGION: z.string().optional().readonly(),
})

const environmentConfig = (() => {
  const env = typeof window === 'undefined' ? process.env : window.__ENV

  return environmentSchema.safeParse(env).data || ({} as EnvironmentConfig)
})()

export type EnvironmentConfig = z.infer<typeof environmentSchema>

export default environmentConfig
