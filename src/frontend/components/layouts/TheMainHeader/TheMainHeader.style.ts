import type { SxProps } from '@mui/material'

const useStyles = () => {
  const logo: SxProps = {
    mr: 2,
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  const navLinks: SxProps = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  }

  return {
    logo,
    navLinks,
  }
}

export default useStyles
