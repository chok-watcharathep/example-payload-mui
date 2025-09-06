'use client'
import { Container, Stack, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

import { RichText } from '@/frontend/components'
import { ReviewForm } from '@/frontend/features/product/components'
import type { ReviewFormFields } from '@/frontend/features/product/interfaces'
import type { Product } from '@/payload-types'

interface ProductDetailPageProps {
  // * Received from server component so still good for SEO if not render loading state before render
  product: Product
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const tProduct = useTranslations('product')

  const handleSubmitReview = (formFields: ReviewFormFields) => {
    // eslint-disable-next-line no-console
    console.log('submit review', formFields)
  }

  /**
   * *Note: Do not return loading state if not use react-query prefetching data from server component
   * *because it will be rendered by the client component that is not good for SEO
   */
  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h1">{tProduct('title')}</Typography>
        <Typography variant="h2">{product.name}</Typography>
        {product.description && <RichText data={product.description} />}
        <ReviewForm onSubmit={handleSubmitReview} />
      </Stack>
    </Container>
  )
}

export default ProductDetailPage
