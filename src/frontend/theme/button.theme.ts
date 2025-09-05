import type { Components } from '@mui/material'

import baseTheme from './base.theme'

const buttonTheme: Components['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
    disableRipple: true, // disabled click overlay effect
  },
  variants: [
    {
      props: { variant: 'ghost', color: 'primary' },
      style: {
        backgroundColor: 'transparent',
        color: baseTheme.palette.primary[600],
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: baseTheme.palette.primary[100],
        },
        '&:active': {
          backgroundColor: 'transparent',
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          color: baseTheme.palette.primary[600],
          opacity: 0.4,
        },
      },
    },
    {
      props: { variant: 'ghost', color: 'error' },
      style: {
        backgroundColor: 'transparent',
        color: baseTheme.palette.error.main,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: baseTheme.palette.error.light,
        },
        '&:active': {
          backgroundColor: 'transparent',
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          color: baseTheme.palette.error.main,
          opacity: 0.4,
        },
      },
    },
  ],
  styleOverrides: {
    root: {
      minWidth: 80,
      textTransform: 'none',
      '&.Mui-focusVisible': {
        position: 'relative',
        zIndex: 1,
        outline: 'none',
        boxShadow: `0 0 0 2px ${baseTheme.palette.common.white}, 0 0 0 3px ${baseTheme.palette.primary.dark}`,
      },
      '&:focus:not(.Mui-focusVisible)': {
        outline: 'none',
        boxShadow: 'none',
      },
      '&.Mui-disabled': {
        opacity: 0.4,
      },
    },
    sizeSmall: {
      height: 36,
      fontSize: 16,
      padding: baseTheme.spacing(0, 1.5),
    },
    sizeMedium: {
      height: 48,
      fontSize: 18,
      padding: baseTheme.spacing(0, 1.5),
    },
    sizeLarge: {
      height: 56,
      fontSize: 18,
      padding: baseTheme.spacing(0, 1.5),
    },

    // Primary
    textPrimary: {
      color: baseTheme.palette.primary.main,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:active': {
        backgroundColor: 'transparent',
      },
      '&.Mui-disabled': {
        backgroundColor: 'transparent',
        color: baseTheme.palette.primary.main,
      },
    },
    containedPrimary: {
      backgroundColor: baseTheme.palette.primary.main,
      color: baseTheme.palette.common.white,
      '&:hover': {
        backgroundColor: baseTheme.palette.primary.light,
      },
      '&:active': {
        backgroundColor: baseTheme.palette.primary.main,
      },
      '&.Mui-disabled': {
        backgroundColor: baseTheme.palette.primary.main,
        color: baseTheme.palette.common.white,
      },
    },
    outlinedPrimary: {
      color: baseTheme.palette.primary[600],
      borderColor: baseTheme.palette.primary[600],
      '&:hover': {
        backgroundColor: baseTheme.palette.primary[100],
        borderColor: baseTheme.palette.primary[300],
      },
      '&:active': {
        color: baseTheme.palette.primary[600],
        backgroundColor: 'transparent',
      },
      '&.Mui-disabled': {
        color: baseTheme.palette.primary[600],
        borderColor: baseTheme.palette.primary[600],
      },
    },

    // Error
    containedError: {
      backgroundColor: baseTheme.palette.error.main,
      color: baseTheme.palette.common.white,
      '&:hover': {
        backgroundColor: baseTheme.palette.error[500],
      },
      '&:active': {
        backgroundColor: baseTheme.palette.error.main,
      },
      '&.Mui-disabled': {
        backgroundColor: baseTheme.palette.error.main,
        color: baseTheme.palette.common.white,
      },
    },
    outlinedError: {
      color: baseTheme.palette.error.main,
      borderColor: baseTheme.palette.error[600],
      '&:hover': {
        backgroundColor: baseTheme.palette.error.light,
        borderColor: baseTheme.palette.error[400],
      },
      '&:active': {
        color: baseTheme.palette.error.main,
        borderColor: baseTheme.palette.error[500],
        backgroundColor: 'transparent',
      },
      '&.Mui-disabled': {
        color: baseTheme.palette.error[600],
        borderColor: baseTheme.palette.error[600],
      },
    },
  },
}

export default buttonTheme
