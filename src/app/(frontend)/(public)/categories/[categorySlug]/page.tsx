import { Container, Typography } from '@mui/material'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import environmentConfig from '@/environment.config'
import { Route } from '@/frontend/enums'
import { ProductList } from '@/frontend/features/product/components'
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

  const category = await findOneCategoryBySlug(payload, params.categorySlug)

  if (!category) {
    // use default metadata
    return {}
  }

  return {
    title: category.meta?.title || category.name,
    description: category.meta?.description || category.name,
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
  }
}

const CategoryPage = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: CategoryPageProps) => {
  const params = await paramsPromise
  const payload = await getPayload({ config })

  const category = await findOneCategoryBySlug(payload, decodeURIComponent(params.categorySlug))

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
    <Container>
      <Typography variant="h1">{category.name}</Typography>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList categoryId={category.id} />
      </HydrationBoundary>
    </Container>
  )
}

export default CategoryPage
