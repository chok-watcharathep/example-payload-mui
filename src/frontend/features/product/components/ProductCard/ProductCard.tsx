import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'

import { RichText } from '@/frontend/components'
import { Route } from '@/frontend/enums/route.enum'
import { Product } from '@/payload-types'

interface ProductCardProps {
  name: string
  slug: string
  description?: Product['description']
  price: number
  imageUrl?: string
}

const ProductCard = ({ name, slug, description, price, imageUrl }: ProductCardProps) => {
  return (
    <Card>
      <CardActionArea component={Link} href={`${Route.PRODUCTS}/${slug}`}>
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
          }}
          image={imageUrl || '/images/placeholder.png'}
          alt={name}
        />
        <Box width="100%">
          <CardContent>
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ${price.toFixed(2)}
            </Typography>
            {description && <RichText data={description as SerializedEditorState} />}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
