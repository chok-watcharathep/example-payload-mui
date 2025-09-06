'use client'
import { Container, Typography } from '@mui/material'

import { ProductList } from '@/frontend/features/product/components'
import type { Category } from '@/payload-types'

interface CategoryDetailPageProps {
  // * Received from server component so still good for SEO if not render loading state before render
  category: Category
}

const CategoryDetailPage = ({ category }: CategoryDetailPageProps) => {
  /**
   * *Note: Do not return loading state if not use react-query prefetching data from server component
   * *because it will be rendered by the client component that is not good for SEO
   */
  return (
    <Container>
      <Typography variant="h1">{category.name}</Typography>
      <ProductList categoryId={category.id} />
    </Container>
  )
}

export default CategoryDetailPage
