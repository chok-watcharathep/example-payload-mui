import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'

import environmentConfig from '@/environment.config'
import { Route } from '@/frontend/enums'
import { CategoryDetailPage } from '@/frontend/features/category/pages'
import { ProductQueryKey } from '@/frontend/features/product/enums'
import type { GetProductListRequest } from '@/frontend/features/product/interfaces'
import { getProductList } from '@/frontend/features/product/services'
import type { BaseSearchRequest } from '@/frontend/interfaces'
import { getQueryClient } from '@/frontend/libs'
import { getUrlQueryState } from '@/frontend/utils'
import config from '@/payload.config'
import { findOneCategoryBySlug } from '@/shared/features/category/services'
import { isMedia } from '@/shared/utils'

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>
  searchParams: Promise<BaseSearchRequest>
}

export async function generateMetadata({
  params: paramsPromise,
}: CategoryPageProps): Promise<Metadata> {
  const params = await paramsPromise
  const payload = await getPayload({ config })
  const locale = await getLocale()

  const category = await findOneCategoryBySlug(payload, params.categorySlug, {
    locale,
  })

  if (!category) {
    // use default metadata
    return {}
  }

  return {
    title: category.meta?.title || category.name,
    description: category.meta?.description || category.name,
    keywords: [category.name, 'products', 'shop'],
    openGraph: {
      title: category.meta?.title || category.name,
      description: category.meta?.description || category.name,
      type: 'website',
      url: `${environmentConfig.NEXT_PUBLIC_APP_BASE_URL}/${Route.CATEGORIES}/${category.slug}`,
      images: isMedia(category.meta?.image)
        ? [
            {
              url: category.meta?.image.url || '',
              width: category.meta?.image.width || 800,
              height: category.meta?.image.height || 600,
              alt: category.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.meta?.title || category.name,
      description: category.meta?.description || category.name,
      images: isMedia(category.meta?.image)
        ? [
            {
              url: category.meta?.image.url || '',
              width: category.meta?.image.width || 800,
              height: category.meta?.image.height || 600,
              alt: category.name,
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

const CategoryPage = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: CategoryPageProps) => {
  const params = await paramsPromise
  const payload = await getPayload({ config })
  const locale = await getLocale()

  const category = await findOneCategoryBySlug(payload, decodeURIComponent(params.categorySlug), {
    locale,
  })

  if (!category) {
    notFound()
  }

  const searchParams = await searchParamsPromise
  const queryClient = getQueryClient()

  const urlQueryState = getUrlQueryState(searchParams, {
    defaultPage: '1',
    defaultPageSize: '12',
  })
  const request: GetProductListRequest = {
    categoryId: category.id,
    page: urlQueryState.page,
    limit: urlQueryState.pageSize,
  }

  await queryClient.prefetchQuery({
    queryKey: [ProductQueryKey.GET_PRODUCT_LIST, request],
    queryFn: () => getProductList(request),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryDetailPage category={category} />
    </HydrationBoundary>
  )
}

export default CategoryPage
