'use client'

import { Box, Button, Skeleton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Route } from '@/frontend/enums'
import { useGetCategoryList } from '@/frontend/features/category/hooks'

import useStyles from './TheMainHeader.style'

const TheMainHeader = () => {
  const styles = useStyles()
  const tCommon = useTranslations('common')
  const getCategoryListHook = useGetCategoryList({
    page: 1,
    limit: 50,
  })
  const categoryList = getCategoryListHook.data?.docs ?? []
  const isLoading = getCategoryListHook.isLoading

  return (
    <AppBar elevation={0} position="static" variant="outlined">
      <Container>
        <Toolbar disableGutters>
          <Typography component={Link} href="/" variant="h3" sx={styles.logo}>
            {tCommon('logo')}
          </Typography>
          <Box sx={styles.navLinks}>
            {isLoading && (
              <Box display="flex" gap={1}>
                {new Array(2).fill(null).map((_, index) => (
                  <Skeleton key={index} variant="text">
                    <Button />
                  </Skeleton>
                ))}
              </Box>
            )}
            {categoryList.map((category) => (
              <Button
                key={category.slug}
                LinkComponent={Link}
                href={`${Route.CATEGORIES}/${category.slug}`}
                variant="text"
                color="inherit"
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TheMainHeader
