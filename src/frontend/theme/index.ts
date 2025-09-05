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

      // Try to use mobile first
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
    // *Note: h4, h5, h6 are not included in our design system
    h4: {
      lineHeight: 1.5,
      fontWeight: 600,

      [baseTheme.breakpoints.up('mobile')]: {
        fontSize: 16,
      },
      [baseTheme.breakpoints.up('tablet')]: {
        fontSize: 18,
      },
    },
    h5: {
      lineHeight: 1.5,
      fontWeight: 600,

      [baseTheme.breakpoints.up('mobile')]: {
        fontSize: 14,
      },
      [baseTheme.breakpoints.up('tablet')]: {
        fontSize: 16,
      },
    },
    h6: {
      lineHeight: 1.5,
      fontWeight: 600,

      [baseTheme.breakpoints.up('mobile')]: {
        fontSize: 12,
      },
      [baseTheme.breakpoints.up('tablet')]: {
        fontSize: 14,
      },
    },
    subtitle1: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 20,
    },
    // subtitle 2 is not included in our design system
    subtitle2: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 14,
    },
    // body m
    body1: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 16,
    },
    // body s
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
      textTransform: 'none',
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
