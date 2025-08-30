import { Components } from '@mui/material'

import baseTheme from './base.theme'

const buttonTheme: Components['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      minWidth: 80,
    },
    sizeSmall: {
      height: 28,
      fontSize: 14,
      padding: baseTheme.spacing(0, 1),
    },
    sizeMedium: {
      height: 36,
      fontSize: 16,
      padding: baseTheme.spacing(0, 1.5),
    },
    sizeLarge: {
      height: 48,
      fontSize: 18,
      padding: baseTheme.spacing(0, 1.5),
    },
  },
}

export default buttonTheme
