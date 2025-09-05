// src/theme.d.ts or similar
import '@mui/material/styles'
import '@mui/material/Button'

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
  }

  // Extend PaletteColor to include numbered shades
  interface PaletteColor {
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
  }

  interface PaletteColorOptions {
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
  }
}

// Our design system breakpoints is using mobile, tablet, laptop, desktop
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    // Keep the default breakpoints to prevent break the existing code
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    desktop: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ghost: true
  }
}
