import type { SxProps } from '@mui/material'
import { useTheme } from '@mui/material'

const useStyles = () => {
  const theme = useTheme()
  const { palette } = theme

  const logo: SxProps = {
    display: { xs: 'none', md: 'flex' },
    mr: 1,
    fontSize: 48,
  }

  const textLogo: SxProps = {
    fontWeight: 400,
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 20,
    display: { xs: 'none', md: 'flex' },
  }

  const menu: SxProps = {
    display: { xs: 'block', md: 'none' },
  }

  const navLinks: SxProps = {
    display: 'flex',
    gap: 1.5,
    p: 0,
    mx: 'auto',
  }

  const navLink = (isActive: boolean): SxProps => {
    return {
      display: { xs: 'none', md: 'flex' },
      fontWeight: 400,
      color: palette.grey[900],
      textAlign: 'center',
      borderRadius: 1.5,
      padding: theme.spacing(1, 1.5),
      whiteSpace: 'nowrap',

      '&:hover': {
        backgroundColor: palette.primary.light,
        color: palette.primary.main,
      },

      ...(isActive
        ? {
            backgroundColor: palette.primary.light,
            color: palette.primary.main,
          }
        : {}),
    }
  }

  const avatar: SxProps = {
    width: 24,
    height: 24,
  }

  const settingsArrow: SxProps = {
    color: palette.grey[900],
  }

  return {
    logo,
    textLogo,
    navLinks,
    navLink,
    menu,
    avatar,
    settingsArrow,
  }
}

export default useStyles
