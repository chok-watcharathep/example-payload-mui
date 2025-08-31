import { Container, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { findOneCategoryBySlug } from '@/payload/features/category/services'
import config from '@/payload.config'

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>
}

const CategoryPage = async ({ params: paramsPromise }: CategoryPageProps) => {
  const params = await paramsPromise
  const payload = await getPayload({ config })

  const category = await findOneCategoryBySlug(payload, params.categorySlug)

  if (!category) {
    notFound()
  }

  return (
    <Container>
      <Typography variant="h1">{category.name}</Typography>
    </Container>
  )
}

export default CategoryPage
