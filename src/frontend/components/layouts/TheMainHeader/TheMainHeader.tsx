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

  return (
    <AppBar elevation={0} position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography component={Link} variant="h6" href="/" noWrap sx={styles.logo}>
            {tCommon('logo')}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TheMainHeader
