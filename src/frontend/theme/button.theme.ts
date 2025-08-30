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
      padding: baseTheme.spacing(0, 1),
    },
    sizeMedium: {
      height: 36,
      padding: baseTheme.spacing(0, 1.5),
    },
    sizeLarge: {
      height: 48,
      padding: baseTheme.spacing(0, 1.5),
    },
  },
}

export default buttonTheme
