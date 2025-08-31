import { SxProps } from '@mui/material'

const useStyles = () => {
  const logo: SxProps = {
    mr: 2,
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  return {
    logo,
  }
}

export default useStyles
