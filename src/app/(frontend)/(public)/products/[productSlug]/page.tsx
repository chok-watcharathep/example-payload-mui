import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'

import environmentConfig from '@/environment.config'
import { Route } from '@/frontend/enums'
import { ProductDetailPage } from '@/frontend/features/product/pages'
import type { BaseSearchRequest } from '@/frontend/interfaces'
import config from '@/payload.config'
import { findOneProductIdentifier } from '@/shared/features/product/services'
import { isMedia } from '@/shared/utils'

interface ProductPageProps {
  params: Promise<{ productSlug: string }>
  searchParams: Promise<BaseSearchRequest>
}

export async function generateMetadata({
  params: paramsPromise,
}: ProductPageProps): Promise<Metadata> {
  const params = await paramsPromise
  const payload = await getPayload({ config })
  const locale = await getLocale()

  const product = await findOneProductIdentifier(payload, params.productSlug, {
    locale,
  })

  if (!product) {
    // use default metadata
    return {}
  }

  return {
    title: product.meta?.title || product.name,
    description: product.meta?.description || product.name,
    keywords: [product.name, 'products', 'shop'],
    openGraph: {
      title: product.meta?.title || product.name,
      description: product.meta?.description || product.name,
      type: 'website',
      url: `${environmentConfig.NEXT_PUBLIC_APP_BASE_URL}/${Route.CATEGORIES}/${product.slug}`,
      images: isMedia(product.meta?.image)
        ? [
            {
              url: product.meta?.image.url || '',
              width: product.meta?.image.width || 800,
              height: product.meta?.image.height || 600,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.meta?.title || product.name,
      description: product.meta?.description || product.name,
      images: isMedia(product.meta?.image)
        ? [
            {
              url: product.meta?.image.url || '',
              width: product.meta?.image.width || 800,
              height: product.meta?.image.height || 600,
              alt: product.name,
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

const ProductPage = async ({ params: paramsPromise }: ProductPageProps) => {
  const params = await paramsPromise
  const payload = await getPayload({ config })
  const locale = await getLocale()

  const product = await findOneProductIdentifier(payload, decodeURIComponent(params.productSlug), {
    locale,
  })

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}

export default ProductPage
