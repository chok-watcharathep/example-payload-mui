import React from 'react'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import './styles.scss'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            {children}
          </AppRouterCacheProvider>
        </main>
      </body>
    </html>
  )
}
