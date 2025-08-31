import { Box, Container, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

import useStyles from './TheMainFooter.style'

const TheMainFooter = () => {
  const styles = useStyles()
  const tFooter = useTranslations('footer')

  return (
    <Box component="footer" sx={styles.container}>
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          {tFooter('copyright', { year: new Date().getFullYear() })}
        </Typography>
      </Container>
    </Box>
  )
}

export default TheMainFooter
