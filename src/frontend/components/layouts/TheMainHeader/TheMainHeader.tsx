import { Box, Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import useStyles from './TheMainHeader.style'

const TheMainHeader = () => {
  const styles = useStyles()
  const tCommon = useTranslations('common')

  const navLinks = [
    { title: tCommon('products'), path: '/products' },
    { title: tCommon('about'), path: '/about' },
    { title: tCommon('contact'), path: '/contact' },
  ]

  return (
    <AppBar elevation={0} position="static" variant="outlined">
      <Container>
        <Toolbar disableGutters>
          <Typography component={Link} href="/" variant="h3" sx={styles.logo}>
            {tCommon('logo')}
          </Typography>
          <Box sx={styles.navLinks}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                LinkComponent={Link}
                href={link.path}
                variant="text"
                color="inherit"
              >
                {link.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TheMainHeader
