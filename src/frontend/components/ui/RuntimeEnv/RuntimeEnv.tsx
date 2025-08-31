import { PUBLIC_ENV_KEY } from '@/constants'
import { EnvironmentConfig } from '@/environment.config'

interface RuntimeEnvProps {
  env: EnvironmentConfig
}

export const RuntimeEnv = ({ env }: RuntimeEnvProps) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window['${PUBLIC_ENV_KEY}']=${JSON.stringify(env)}`,
      }}
      id="runtime-env"
    />
  )
}

export default RuntimeEnv
