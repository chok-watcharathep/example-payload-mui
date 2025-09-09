import { Container, Typography } from '@mui/material'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'

import { Route, RouteSlug } from '@/frontend/enums'
import { generatePageMetadata } from '@/frontend/utils'
import config from '@/payload.config'
import { findOnePageByIdentifier } from '@/shared/features/page/services'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const locale = await getLocale()

  const page = await findOnePageByIdentifier(payload, RouteSlug.EXAMPLE_STATIC_PAGE, {
    locale,
  })

  return generatePageMetadata(Route.EXAMPLE_STATIC_PAGE, page)
}

const ExampleStaticPage = () => {
  return (
    <Container>
      <Typography variant="h1">Example Static Page</Typography>
    </Container>
  )
}

export default ExampleStaticPage
