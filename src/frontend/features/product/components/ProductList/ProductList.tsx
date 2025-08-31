'use client'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

import ProductCard from '@/frontend/features/product/components/ProductCard'
import { useGetProductList } from '@/frontend/features/product/hooks'
import { useUrlQueryState } from '@/frontend/hooks'
import { isMedia } from '@/utils'

interface ProductListProps {
  categoryId?: number
}

const ProductList = ({ categoryId }: ProductListProps) => {
  const urlQueryStateHook = useUrlQueryState()
  const tCommon = useTranslations('common')

  const getProductListHook = useGetProductList({
    categoryId,
    page: urlQueryStateHook.pagination.page,
    limit: urlQueryStateHook.pagination.limit,
  })
  const productList = getProductListHook.data?.docs ?? []

  return (
    <Box>
      <Typography variant="h1">{tCommon('products')}</Typography>
      <Grid container spacing={2}>
        {productList.map((product) => (
          <Grid
            key={product.id}
            size={{
              mobile: 12,
              tablet: 6,
              desktop: 4,
            }}
          >
            <ProductCard
              {...product}
              imageUrl={isMedia(product.image) ? (product.image.url ?? '') : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList
