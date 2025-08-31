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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`${Route.PRODUCTS}/${slug}`}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
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
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              ${price.toFixed(2)}
            </Typography>
            {description && (
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <RichText data={description as SerializedEditorState} />
              </Box>
            )}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
