import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'

import { HomeIcon, HomeSolidIcon } from '@/frontend/components'

const DesignSystemPage = () => {
  return (
    <Container>
      <Typography variant="h1">Design System</Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12}>
          <Typography variant="h2">Typography</Typography>
          <Typography variant="h1">H1</Typography>
          <Typography variant="h2">H2</Typography>
          <Typography variant="h3">H3</Typography>
          <Typography variant="h4">H4</Typography>
          <Typography variant="h5">H5</Typography>
          <Typography variant="h6">H6</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="body1">Body 1</Typography>
          <Typography variant="body2">Body 2</Typography>
          <Typography variant="button">Button</Typography>
          <Typography variant="caption">Caption</Typography>
          <Typography variant="overline">Overline</Typography>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h2">Button</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button startIcon={<HomeIcon />} variant="text" color="primary" size="small">
              Small Text
            </Button>
            <Button startIcon={<HomeIcon />} variant="outlined" color="primary" size="small">
              Small Outlined
            </Button>
            <Button startIcon={<HomeSolidIcon />} variant="contained" color="primary" size="small">
              Small Contained
            </Button>
            <Button startIcon={<HomeIcon />} variant="text" color="primary" size="medium">
              Medium Text
            </Button>
            <Button startIcon={<HomeIcon />} variant="outlined" color="primary" size="medium">
              Medium Outlined
            </Button>
            <Button startIcon={<HomeSolidIcon />} variant="contained" color="primary" size="medium">
              Medium Contained
            </Button>
            <Button startIcon={<HomeIcon />} variant="text" color="primary" size="large">
              Large Text
            </Button>
            <Button startIcon={<HomeIcon />} variant="outlined" color="primary" size="large">
              Large Outlined
            </Button>
            <Button startIcon={<HomeSolidIcon />} variant="contained" color="primary" size="large">
              Large Contained
            </Button>
          </Box>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12}>
          <Typography variant="h2">Breakpoints</Typography>
          <Grid size={12} container spacing={2}>
            <Grid size={{ mobile: 12, tablet: 6, desktop: 4 }}>
              <Typography variant="h3">Mobile</Typography>
            </Grid>
            <Grid size={{ mobile: 12, tablet: 6, desktop: 4 }}>
              <Typography variant="h3">Tablet</Typography>
            </Grid>
            <Grid size={{ mobile: 12, tablet: 6, desktop: 4 }}>
              <Typography variant="h3">Desktop</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DesignSystemPage
