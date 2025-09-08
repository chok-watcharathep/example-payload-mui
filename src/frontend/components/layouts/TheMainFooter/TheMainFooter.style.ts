import { useTheme, type SxProps } from '@mui/material'

const useStyles = () => {
  const theme = useTheme()
  const { palette } = theme

  const footer: SxProps = {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  }

  const footerInfo: SxProps = {
    display: 'grid',
    gridTemplateColumns: {
      mobile: '1fr',
      desktop: '33% auto 20%',
    },
    gridTemplateAreas: {
      mobile: '"social" "navigation" "contact"',
      desktop: '"social navigation contact"',
    },
    gap: { mobile: 1.5, desktop: 9 },
    mb: { mobile: 2, desktop: 6 },
  }

  const footerInfoSocial: SxProps = {
    gridArea: 'social',
  }

  const footerInfoNavigation: SxProps = {
    gridArea: 'navigation',
  }

  const footerInfoContact: SxProps = {
    gridArea: 'contact',
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,

    '& a': {
      textDecoration: 'none',
    },
  }

  const footerCopyright: SxProps = {}

  const footerCopyrightInner: SxProps = {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: { mobile: 'column', desktop: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
    pt: 1.5,
    gap: { mobile: 1.5, desktop: 0 },
  }

  const footerCopyrightInnerLinks: SxProps = {
    display: 'flex',
    flexDirection: { mobile: 'column', desktop: 'row' },
    gap: { mobile: 1.5, desktop: 0 },
    textAlign: { mobile: 'center', desktop: 'left' },

    '& a': {
      color: theme.palette.grey[500],

      '&:before': {
        content: '"|"',
        display: { mobile: 'none', desktop: 'inline-block' },
        mx: 0.5,
      },

      '&:first-child': {
        '&:before': {
          display: 'none',
        },
      },
    },
  }

  const footerInfoLogo: SxProps = {
    mt: { mobile: 2, desktop: 10 },
    mb: { mobile: 2, desktop: 1 },
  }

  const footerInfoSocialList: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    mt: 2,

    '& li': {
      width: 'max-content',
      p: 0,

      '& a': {
        p: 0,
        color: palette.primary.light,

        '&:hover': {
          backgroundColor: 'transparent',
          color: palette.primary.main,
        },
      },
    },
  }

  const logo: SxProps = {
    fontSize: 48,
  }

  const textLogo: SxProps = {
    fontWeight: 400,
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 20,
  }

  const footerInfoNavigationStack: SxProps = {
    display: 'flex',
    flexDirection: { mobile: 'column', tablet: 'row' },
    gap: { mobile: 1.5, tablet: 4 },
  }

  const footerInfoNavigationList: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  }

  const footerInfoNavigationItem: SxProps = {
    py: 0,
    px: 1,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  }

  return {
    footer,
    footerInfo,
    footerInfoSocial,
    footerInfoNavigation,
    footerInfoContact,
    footerCopyright,
    footerCopyrightInner,
    footerCopyrightInnerLinks,
    footerInfoSocialList,
    logo,
    textLogo,
    footerInfoLogo,
    footerInfoNavigationStack,
    footerInfoNavigationList,
    footerInfoNavigationItem,
  }
}

export default useStyles
