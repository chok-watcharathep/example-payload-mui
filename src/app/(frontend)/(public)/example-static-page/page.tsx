import { Container, Typography } from '@mui/material'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'

import environmentConfig from '@/environment.config'
import { Route, RouteSlug } from '@/frontend/enums'
import config from '@/payload.config'
import { findOnePageByIdentifier } from '@/shared/features/page/services'
import { isMedia } from '@/shared/utils'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const locale = await getLocale()

  const page = await findOnePageByIdentifier(payload, RouteSlug.EXAMPLE_STATIC_PAGE, {
    locale,
  })

  if (!page) {
    // use default metadata
    return {}
  }

  return {
    title: page.meta?.title || page.name,
    description: page.meta?.description || page.name,
    keywords: [page.name, 'example', 'static', 'page'],
    openGraph: {
      title: page.meta?.title || page.name,
      description: page.meta?.description || page.name,
      type: 'website',
      url: `${environmentConfig.NEXT_PUBLIC_APP_BASE_URL}/${Route.EXAMPLE_STATIC_PAGE}`,
      images: isMedia(page.meta?.image)
        ? [
            {
              url: page.meta?.image.url || '',
              width: page.meta?.image.width || 800,
              height: page.meta?.image.height || 600,
              alt: page.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta?.title || page.name,
      description: page.meta?.description || page.name,
      images: isMedia(page.meta?.image)
        ? [
            {
              url: page.meta?.image.url || '',
              width: page.meta?.image.width || 800,
              height: page.meta?.image.height || 600,
              alt: page.name,
            },
          ]
        : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

const ExampleStaticPage = () => {
  return (
    <Container>
      <Typography variant="h1">Example Static Page</Typography>
    </Container>
  )
}

export default ExampleStaticPage
