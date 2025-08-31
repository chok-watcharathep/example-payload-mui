import { SxProps } from '@mui/material'

const useStyles = () => {
  const container: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }

  const main: SxProps = {
    py: 2,
  }

  return {
    container,
    main,
  }
}

export default useStyles
