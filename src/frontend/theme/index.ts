'use client'

import { createTheme } from '@mui/material'
import { Noto_Sans_Thai } from 'next/font/google'

import baseTheme from './base.theme'
import buttonTheme from './button.theme'
import containerTheme from './container.theme'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
})

const theme = createTheme({
  typography: {
    fontFamily: notoSansThai.style.fontFamily,
    h1: {
      lineHeight: 1.5,
      fontWeight: 600,

      [baseTheme.breakpoints.up('mobile')]: {
        fontSize: 28,
      },
      [baseTheme.breakpoints.up('tablet')]: {
        fontSize: 32,
      },
    },
    h2: {
      lineHeight: 1.5,
      fontWeight: 600,

      [baseTheme.breakpoints.up('mobile')]: {
        fontSize: 22,
      },
      [baseTheme.breakpoints.up('tablet')]: {
        fontSize: 24,
      },
    },
    h3: {
      lineHeight: 1.5,
      fontWeight: 600,

      [baseTheme.breakpoints.up('mobile')]: {
        fontSize: 18,
      },
      [baseTheme.breakpoints.up('tablet')]: {
        fontSize: 20,
      },
    },
    subtitle1: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 16,
    },
    subtitle2: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 14,
    },
    body1: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 16,
    },
    body2: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      lineHeight: 1.75,
      fontWeight: 400,
      fontSize: 12,
    },
    overline: {
      lineHeight: 1.75,
      fontWeight: 400,
      fontSize: 12,
    },
    button: {
      lineHeight: 1.5,
      fontWeight: 600,
      fontSize: 16,
    },
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
