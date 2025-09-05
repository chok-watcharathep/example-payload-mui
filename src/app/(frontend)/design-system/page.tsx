import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'

import { HomeIcon, HomeSolidIcon } from '@/frontend/components'

const elementBox = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
  flexWrap: 'wrap',
  border: '1px solid #ccc',
  padding: 3,
  marginBottom: 1,
  borderRadius: 1,
}

const buttonBox = {
  ...elementBox,
  border: 'none',
  padding: 1,
}

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
          <br />
          <Typography variant="caption">Caption</Typography>
          <br />
          <Typography variant="overline">Overline</Typography>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h2">Button</Typography>
          <Typography variant="h4" color="primary">
            Primary
          </Typography>

          {/* small primary */}
          <Box sx={elementBox}>
            <Box sx={buttonBox}>
              <Typography variant="h5">normal:</Typography>
              <Button variant="text" color="primary" size="small">
                Small Text
              </Button>
              <Button startIcon={<HomeIcon />} variant="ghost" color="primary" size="small">
                Small Ghost
              </Button>
              <Button startIcon={<HomeIcon />} variant="outlined" color="primary" size="small">
                Small Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="primary"
                size="small"
              >
                Small Contained
              </Button>
            </Box>

            <Box sx={buttonBox}>
              <Typography variant="h5">disabled:</Typography>
              <Button variant="text" color="primary" size="small" disabled>
                Small Text
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="ghost"
                color="primary"
                size="small"
                disabled
              >
                Small Ghost
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="outlined"
                color="primary"
                size="small"
                disabled
              >
                Small Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="primary"
                size="small"
                disabled
              >
                Small Contained
              </Button>
            </Box>
          </Box>

          {/* medium primary */}
          <Box sx={elementBox}>
            <Box sx={buttonBox}>
              <Typography variant="h5">normal:</Typography>
              <Button variant="text" color="primary" size="medium">
                Medium Text
              </Button>
              <Button startIcon={<HomeIcon />} variant="ghost" color="primary" size="medium">
                Medium Ghost
              </Button>
              <Button startIcon={<HomeIcon />} variant="outlined" color="primary" size="medium">
                Medium Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="primary"
                size="medium"
              >
                Medium Contained
              </Button>
            </Box>

            <Box sx={buttonBox}>
              <Typography variant="h5">disabled:</Typography>
              <Button variant="text" color="primary" size="medium" disabled>
                Medium Text
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="ghost"
                color="primary"
                size="medium"
                disabled
              >
                Medium Ghost
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="outlined"
                color="primary"
                size="medium"
                disabled
              >
                Medium Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="primary"
                size="medium"
                disabled
              >
                Medium Contained
              </Button>
            </Box>
          </Box>

          {/* large primary */}
          <Box sx={elementBox}>
            <Box sx={buttonBox}>
              <Typography variant="h5">normal:</Typography>
              <Button variant="text" color="primary" size="large">
                Large Text
              </Button>
              <Button startIcon={<HomeIcon />} variant="ghost" color="primary" size="large">
                Large Ghost
              </Button>
              <Button startIcon={<HomeIcon />} variant="outlined" color="primary" size="large">
                Large Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="primary"
                size="large"
              >
                Large Contained
              </Button>
            </Box>

            <Box sx={buttonBox}>
              <Typography variant="h5">disabled:</Typography>
              <Button variant="text" color="primary" size="large" disabled>
                Large Text
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="ghost"
                color="primary"
                size="large"
                disabled
              >
                Large Ghost
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="outlined"
                color="primary"
                size="large"
                disabled
              >
                Large Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="primary"
                size="large"
                disabled
              >
                Large Contained
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h4" color="error">
            Error
          </Typography>

          {/* small error */}
          <Box sx={elementBox}>
            <Box sx={buttonBox}>
              <Typography variant="h5">normal:</Typography>
              <Button startIcon={<HomeIcon />} variant="ghost" color="error" size="small">
                Small Ghost
              </Button>
              <Button startIcon={<HomeIcon />} variant="outlined" color="error" size="small">
                Small Outlined
              </Button>
              <Button startIcon={<HomeSolidIcon />} variant="contained" color="error" size="small">
                Small Contained
              </Button>
            </Box>

            <Box sx={buttonBox}>
              <Typography variant="h5">disabled:</Typography>
              <Button startIcon={<HomeIcon />} variant="ghost" color="error" size="small" disabled>
                Small Ghost
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="outlined"
                color="error"
                size="small"
                disabled
              >
                Small Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="error"
                size="small"
                disabled
              >
                Small Contained
              </Button>
            </Box>
          </Box>

          {/* medium error */}
          <Box sx={elementBox}>
            <Box sx={buttonBox}>
              <Typography variant="h5">normal:</Typography>
              <Button startIcon={<HomeIcon />} variant="ghost" color="error" size="medium">
                Medium Ghost
              </Button>
              <Button startIcon={<HomeIcon />} variant="outlined" color="error" size="medium">
                Medium Outlined
              </Button>
              <Button startIcon={<HomeSolidIcon />} variant="contained" color="error" size="medium">
                Medium Contained
              </Button>
            </Box>

            <Box sx={buttonBox}>
              <Typography variant="h5">disabled:</Typography>
              <Button startIcon={<HomeIcon />} variant="ghost" color="error" size="medium" disabled>
                Medium Ghost
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="outlined"
                color="error"
                size="medium"
                disabled
              >
                Medium Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="error"
                size="medium"
                disabled
              >
                Medium Contained
              </Button>
            </Box>
          </Box>

          {/* large error */}
          <Box sx={elementBox}>
            <Box sx={buttonBox}>
              <Typography variant="h5">normal:</Typography>
              <Button startIcon={<HomeIcon />} variant="ghost" color="error" size="large">
                Large Ghost
              </Button>
              <Button startIcon={<HomeIcon />} variant="outlined" color="error" size="large">
                Large Outlined
              </Button>
              <Button startIcon={<HomeSolidIcon />} variant="contained" color="error" size="large">
                Large Contained
              </Button>
            </Box>

            <Box sx={buttonBox}>
              <Typography variant="h5">disabled:</Typography>
              <Button startIcon={<HomeIcon />} variant="ghost" color="error" size="large" disabled>
                Large Ghost
              </Button>
              <Button
                startIcon={<HomeIcon />}
                variant="outlined"
                color="error"
                size="large"
                disabled
              >
                Large Outlined
              </Button>
              <Button
                startIcon={<HomeSolidIcon />}
                variant="contained"
                color="error"
                size="large"
                disabled
              >
                Large Contained
              </Button>
            </Box>
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
