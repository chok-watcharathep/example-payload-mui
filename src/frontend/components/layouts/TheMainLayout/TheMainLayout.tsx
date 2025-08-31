'use client'

import Box from '@mui/material/Box'

import { TheMainFooter, TheMainHeader } from '@/frontend/components'

import useStyles from './TheMainLayout.style'

interface TheMainLayoutProps {
  children: React.ReactNode
}

const TheMainLayout = ({ children }: TheMainLayoutProps) => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <TheMainHeader />
      <Box component="main" sx={styles.main}>
        {children}
      </Box>
      <TheMainFooter />
    </Box>
  )
}

export default TheMainLayout
