import type { SxProps } from '@mui/material'
import { useTheme } from '@mui/material'

const useStyles = () => {
  const theme = useTheme()
  const { palette } = theme

  const logo: SxProps = {
    display: { mobile: 'none', desktop: 'flex' },
    mr: 1,
    fontSize: 48,
  }

  const logoMobile: SxProps = {
    ...logo,
    display: { mobile: 'flex', desktop: 'none' },
  }

  const textLogo: SxProps = {
    fontWeight: 400,
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 20,
    display: { mobile: 'none', desktop: 'flex' },
  }

  const textLogoMobile: SxProps = {
    ...textLogo,
    display: { mobile: 'flex', desktop: 'none' },
    flexGrow: 1,
  }

  const menu: SxProps = {
    display: { mobile: 'block', desktop: 'none' },
  }

  const menuMobile: SxProps = {
    display: { mobile: 'flex', desktop: 'none' },
    flexGrow: 1,
  }

  const navLinks: SxProps = {
    display: 'flex',
    gap: 1.5,
    p: 0,
    mx: 'auto',
  }

  const navLink = (isActive: boolean): SxProps => {
    return {
      display: { mobile: 'none', desktop: 'flex' },
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

  const settings: SxProps = {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 0,
    gap: 1,
  }

  const settingsArrow: SxProps = {
    color: palette.grey[900],
  }

  return {
    logo,
    logoMobile,
    textLogo,
    textLogoMobile,
    menu,
    menuMobile,
    navLinks,
    navLink,
    avatar,
    settings,
    settingsArrow,
  }
}

export default useStyles
