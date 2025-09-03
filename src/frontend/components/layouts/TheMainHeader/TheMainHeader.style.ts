import type { SxProps } from '@mui/material'
import { useTheme } from '@mui/material'

const useStyles = () => {
  const theme = useTheme()

  const logo: SxProps = {
    fontWeight: 700,
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  const navLinks: SxProps = {
    display: 'flex',
    gap: 1.5,
    ml: 'auto',
  }

  const navLink = (isActive: boolean): SxProps => {
    return {
      fontWeight: 400,
      color: 'text.primary',
      textAlign: 'center',
      borderRadius: 1.5,
      justifyContent: 'center',
      padding: theme.spacing(1, 1.5),
      whiteSpace: 'nowrap',

      ...(isActive
        ? {
            fontWeight: 600,
            color: 'primary.main',
            backgroundColor: `${theme.palette.primary.light} !important`,
          }
        : {}),
    }
  }

  return {
    logo,
    navLinks,
    navLink,
  }
}

export default useStyles
