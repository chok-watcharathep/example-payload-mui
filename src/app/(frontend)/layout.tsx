import React from 'react'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Noto_Sans_Thai } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import { TheMainLayout, QueryClientProvider, RuntimeEnv } from '@/frontend/components'
import theme from '@/frontend/theme'
import { getPublicEnv } from '@/utils'

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
  const locale = await getLocale()
  const publicEnv = getPublicEnv(process.env)

  return (
    <html lang={locale}>
      <head>
        <RuntimeEnv env={publicEnv} />
      </head>
      <body className={notoSansThai.className} suppressHydrationWarning>
        <main>
          <NextIntlClientProvider>
            <QueryClientProvider>
              <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                  <TheMainLayout>{children}</TheMainLayout>
                </ThemeProvider>
              </AppRouterCacheProvider>
            </QueryClientProvider>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  )
}
