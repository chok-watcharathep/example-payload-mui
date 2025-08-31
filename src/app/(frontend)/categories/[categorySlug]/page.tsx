import { Container, Typography } from '@mui/material'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { ProductQueryKey } from '@/frontend/enums'
import { ProductList } from '@/frontend/features/product/components'
import { GetProductListRequest } from '@/frontend/features/product/interfaces'
import { getProductList } from '@/frontend/features/product/services'
import { BaseSearchRequest } from '@/frontend/interfaces'
import { getQueryClient } from '@/frontend/libs'
import { findOneCategoryBySlug } from '@/payload/features/category/services'
import config from '@/payload.config'

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>
  searchParams: Promise<BaseSearchRequest>
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

  const request: GetProductListRequest = {
    categoryId: category.id,
    page: searchParams.page,
    limit: searchParams.limit,
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
