import { Button, Container } from '@mui/material'
import { getTranslations } from 'next-intl/server'

import { ExampleLanguage } from '@/frontend/components'
import config from '@/payload.config'

import './styles.scss'

export default async function HomePage() {
  const payloadConfig = await config
  const t = await getTranslations('home')

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        href={payloadConfig.routes.admin}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('goToAdminPanel')}
      </Button>
      <ExampleLanguage />
    </Container>
  )
}
