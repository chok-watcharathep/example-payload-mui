import { SxProps } from '@mui/material'

const useStyles = () => {
  const image: SxProps = {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
  }

  return {
    image,
  }
}

export default useStyles
