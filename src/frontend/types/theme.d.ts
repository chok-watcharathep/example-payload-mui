// src/theme.d.ts or similar
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
  }
}

// Our design system breakpoints is using mobile, tablet, laptop, desktop
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    // Keep the default breakpoints to prevent break the existing code
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    mobile: true
    tablet: true
    desktop: true
  }
}
