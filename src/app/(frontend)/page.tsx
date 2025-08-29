import { Button } from '@mui/material'

import config from '@/payload.config'
import './styles.scss'

export default async function HomePage() {
  const payloadConfig = await config

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        href={payloadConfig.routes.admin}
        rel="noopener noreferrer"
        target="_blank"
      >
        Go to admin panel
      </Button>
    </div>
  )
}
