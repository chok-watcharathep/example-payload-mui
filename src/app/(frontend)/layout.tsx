import React from 'react'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Noto_Sans_Thai } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'

import theme from '@/frontend/theme'

import './styles.scss'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={notoSansThai.className} suppressHydrationWarning>
        <main>
          <NextIntlClientProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  )
}
