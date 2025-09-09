import environmentConfig from '@/environment.config'
import type { Route } from '@/frontend/enums'
import type { Page } from '@/payload-types'
import { isMedia } from '@/shared/utils'

export const generatePageMetadata = (routeName: Route, page?: Page) => {
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
      url: `${environmentConfig.NEXT_PUBLIC_APP_BASE_URL}${routeName}`,
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
