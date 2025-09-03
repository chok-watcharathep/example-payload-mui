import { PUBLIC_ENV_KEY } from '@/shared/constants'
import { getPublicEnv } from '@/shared/utils'

export const RuntimeEnv = () => {
  const publicEnv = getPublicEnv(process.env)

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window['${PUBLIC_ENV_KEY}']=${JSON.stringify(publicEnv)}`,
      }}
      id="runtime-env"
    />
  )
}

export default RuntimeEnv
