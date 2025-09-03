import type { Components } from '@mui/material'

import baseTheme from './base.theme'

const containerTheme: Components['MuiContainer'] = {
  styleOverrides: {
    root: {
      [baseTheme.breakpoints.up('mobile')]: {
        padding: baseTheme.spacing(0, 2),
      },
      [baseTheme.breakpoints.up('tablet')]: {
        padding: baseTheme.spacing(0, 3),
      },
      [baseTheme.breakpoints.up('desktop')]: {
        padding: baseTheme.spacing(0, 6),
        maxWidth: 1344,
      },
    },
  },
}

export default containerTheme
