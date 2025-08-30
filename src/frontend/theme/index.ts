'use client'

import { createTheme } from '@mui/material'
import { Noto_Sans_Thai } from 'next/font/google'

import baseTheme from './base.theme'
import buttonTheme from './button.theme'
import containerTheme from './container.theme'

// TODO: Change to real font
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
})

const theme = createTheme({
  typography: {
    fontFamily: notoSansThai.style.fontFamily,
    h1: {},
  },
  breakpoints: baseTheme.breakpoints,
  palette: baseTheme.palette,
  shape: baseTheme.shape,
  spacing: baseTheme.spacing,
})

theme.components = {
  MuiContainer: containerTheme,
  MuiButton: buttonTheme,
}

export default theme
