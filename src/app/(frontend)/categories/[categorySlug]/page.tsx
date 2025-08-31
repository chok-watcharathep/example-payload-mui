import { Container, Typography } from '@mui/material'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'

import environmentConfig from '@/environment.config'
import { ProductQueryKey } from '@/frontend/enums'
import { Route } from '@/frontend/enums/route.enum'
import { ProductList } from '@/frontend/features/product/components'
import { GetProductListRequest } from '@/frontend/features/product/interfaces'
import { getProductList } from '@/frontend/features/product/services'
import { BaseSearchRequest } from '@/frontend/interfaces'
import { getQueryClient } from '@/frontend/libs'
import { getUrlQueryState } from '@/frontend/utils'
import { findOneCategoryBySlug } from '@/payload/features/category/services'
import config from '@/payload.config'
import { isMedia } from '@/utils'

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
  const tCategory = await getTranslations('category')

  if (!category) {
    return { title: 'Category Not Found' }
  }

  // TODO: Confirm with the team will use meta title and description from payload or not
  return {
    title: tCategory('metadata.title', { name: category.name }),
    description: tCategory('metadata.description', { name: category.name }),
    openGraph: {
      title: tCategory('metadata.title', { name: category.name }),
      description: tCategory('metadata.description', { name: category.name }),
      type: 'website',
      url: `${environmentConfig.NEXT_PUBLIC_APP_BASE_URL}/${Route.CATEGORIES}/${category.slug}`,
      images: isMedia(category.image)
        ? [
            {
              url: category.image.url || '',
              width: category.image.width || 800,
              height: category.image.height || 600,
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

  const category = await findOneCategoryBySlug(payload, params.categorySlug)

  if (!category) {
    notFound()
  }

  const searchParams = await searchParamsPromise
  const queryClient = getQueryClient()

  const urlQueryState = getUrlQueryState(searchParams)
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
