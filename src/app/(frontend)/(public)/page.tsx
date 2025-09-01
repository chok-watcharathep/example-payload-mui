import { Button, Container } from '@mui/material'
import { getTranslations } from 'next-intl/server'

import config from '@/payload.config'

export default async function HomePage() {
  const payloadConfig = await config
  const tHome = await getTranslations('home')

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        href={payloadConfig.routes.admin}
        rel="noopener noreferrer"
        target="_blank"
      >
        {tHome('goToAdminPanel')}
      </Button>
    </Container>
  )
}
