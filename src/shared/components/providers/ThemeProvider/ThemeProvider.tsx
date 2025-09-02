import { ThemeProvider as MuiThemeProvider } from '@mui/material'

import theme from '@/shared/theme'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default ThemeProvider
