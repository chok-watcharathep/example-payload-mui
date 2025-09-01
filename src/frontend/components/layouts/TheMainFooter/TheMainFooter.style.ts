import { useTheme, type SxProps } from '@mui/material'

const useStyles = () => {
  const theme = useTheme()

  const container: SxProps = {
    py: 2,
    mt: 'auto',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  }

  return {
    container,
  }
}

export default useStyles
