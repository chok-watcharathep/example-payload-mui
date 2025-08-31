import { EnvironmentConfig } from '@/environment.config'

export const getPublicEnv = (env: EnvironmentConfig) => {
  const runtimeEnv = Object.keys(env)
    .filter((key) => key.startsWith('NEXT_PUBLIC_'))
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: env?.[key as keyof typeof env],
      }
    }, {}) as EnvironmentConfig

  return runtimeEnv
}

export default getPublicEnv
