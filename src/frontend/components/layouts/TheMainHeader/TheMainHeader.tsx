'use client'

import { List, ListItem, ListItemButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Route } from '@/frontend/enums'
import { useGetCategoryList } from '@/frontend/features/category/hooks'

import useStyles from './TheMainHeader.style'

const TheMainHeader = () => {
  const styles = useStyles()
  const tCommon = useTranslations('common')
  // TODO: Use menu config instead of category list
  const pathname = usePathname()
  const getCategoryListHook = useGetCategoryList({
    page: 1,
    limit: 50,
  })
  const categoryList = getCategoryListHook.data?.docs ?? []

  return (
    <AppBar elevation={0} color="transparent" position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography component={Link} href="/" variant="h3" sx={styles.logo}>
            {tCommon('logo')}
          </Typography>
          <List sx={styles.navLinks}>
            {categoryList.map((category) => {
              const isActive =
                decodeURIComponent(pathname) === `${Route.CATEGORIES}/${category.slug}`

              return (
                <ListItem key={category.slug} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    component={Link}
                    href={`${Route.CATEGORIES}/${category.slug}`}
                    sx={styles.navLink(isActive)}
                  >
                    {category.name}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TheMainHeader
