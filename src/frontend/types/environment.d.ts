import type { EnvironmentConfig } from '@/environment.config'

declare global {
  interface Window {
    __ENV: EnvironmentConfig
  }
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentConfig {
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}
