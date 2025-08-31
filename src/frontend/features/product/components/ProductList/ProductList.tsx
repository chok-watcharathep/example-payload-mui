'use client'

import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

import ProductCard from '@/frontend/features/product/components/ProductCard'
import { useGetProductList } from '@/frontend/features/product/hooks'
import { useUrlQueryState } from '@/frontend/hooks'
import { isMedia } from '@/utils'

interface ProductListProps {
  categoryId?: number
}

const ProductList = ({ categoryId }: ProductListProps) => {
  const urlQueryStateHook = useUrlQueryState({
    defaultPage: '1',
    defaultLimit: '12',
  })
  const tCommon = useTranslations('common')

  const getProductListHook = useGetProductList({
    categoryId,
    page: urlQueryStateHook.pagination.page,
    limit: urlQueryStateHook.pagination.limit,
  })
  const productList = getProductListHook.data?.docs ?? []
  const totalPages = getProductListHook.data?.totalPages ?? 1
  const isLoading = getProductListHook.isLoading

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    urlQueryStateHook.pagination.onPageChange(newPage)
  }

  return (
    <Box>
      <Typography variant="h1">{tCommon('products')}</Typography>
      <Grid container spacing={2}>
        {isLoading && <CircularProgress />}
        {productList.map((product) => (
          <Grid
            key={product.id}
            size={{
              mobile: 12,
              tablet: 4,
              desktop: 3,
            }}
          >
            <ProductCard
              {...product}
              imageUrl={isMedia(product.image) ? (product.image.url ?? '') : undefined}
            />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Stack mt={2} alignItems="flex-end">
          <Pagination
            count={totalPages}
            page={urlQueryStateHook.pagination.page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            size="large"
          />
        </Stack>
      )}
    </Box>
  )
}

export default ProductList
