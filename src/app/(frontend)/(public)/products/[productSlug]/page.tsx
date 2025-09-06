import { Container, Stack, Typography } from '@mui/material'
import { getTranslations } from 'next-intl/server'

import { ReviewForm } from '@/frontend/features/product/components'

const ProductPage = async () => {
  const tProduct = await getTranslations('product')

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h1">{tProduct('title')}</Typography>
        <ReviewForm />
      </Stack>
    </Container>
  )
}

export default ProductPage
