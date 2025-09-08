import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FacebookIcon from '@mui/icons-material/Facebook'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import YoutubeIcon from '@mui/icons-material/YouTube'
import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'

import useStyles from './TheMainFooter.style'

const TheMainFooter = () => {
  const styles = useStyles()
  const tFooter = useTranslations('footer')
  const tCommon = useTranslations('common')

  const pages = [
    { title: tFooter('nav.features'), href: '/' },
    { title: tFooter('nav.pricing'), href: '/pricing' },
    { title: tFooter('nav.caseStudies'), href: '/case-studies' },
    { title: tFooter('nav.reviews'), href: '/reviews' },
    { title: tFooter('nav.updates'), href: '/updates' },
    { title: tFooter('nav.about'), href: '/about' },
    { title: tFooter('nav.contactUs'), href: '/contact-us' },
    { title: tFooter('nav.careers'), href: '/careers' },
    { title: tFooter('nav.culture'), href: '/culture' },
    { title: tFooter('nav.blog'), href: '/blog' },
    { title: tFooter('nav.gettingStarted'), href: '/getting-started' },
    { title: tFooter('nav.helpCenter'), href: '/help-center' },
    { title: tFooter('nav.serverStatus'), href: '/server-status' },
    { title: tFooter('nav.reportBug'), href: '/report-bug' },
    { title: tFooter('nav.chatSupport'), href: '/chat-support' },
  ]

  return (
    <Box component="footer" sx={styles.footer}>
      <Container disableGutters={true} maxWidth="desktop">
        <Stack direction="row" alignItems="center" gap={1} sx={styles.footerInfoLogo}>
          <LogoDevIcon sx={styles.logo} />
          <Typography component={Link} href="/" sx={styles.textLogo}>
            {tCommon('logo')}
          </Typography>
        </Stack>
      </Container>
      <Container sx={styles.footerInfo} disableGutters={true} maxWidth="desktop">
        <Box sx={styles.footerInfoSocial}>
          <Typography variant="body1" color="text.secondary">
            {tFooter('social')}
          </Typography>
          <List sx={styles.footerInfoSocialList} disablePadding>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={'https://www.facebook.com/'} target="_blank">
                <FacebookIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={'https://www.twitter.com/'} target="_blank">
                <TwitterIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={'https://www.instagram.com/'} target="_blank">
                <InstagramIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={'https://www.linkedin.com/'} target="_blank">
                <LinkedInIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={'https://www.youtube.com/'} target="_blank">
                <YoutubeIcon />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box sx={styles.footerInfoNavigation}>
          <Stack direction="row" gap={4} sx={styles.footerInfoNavigationStack}>
            {[0, 1, 2].map((columnIndex) => (
              <Box key={columnIndex}>
                <List sx={styles.footerInfoNavigationList} disablePadding>
                  {pages.slice(columnIndex * 5, (columnIndex + 1) * 5).map((page, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        sx={styles.footerInfoNavigationItem}
                        component={Link}
                        href={page.href}
                      >
                        <Typography variant="body1" color="text.secondary">
                          {page.title}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box sx={styles.footerInfoContact}>
          <Stack direction="row" alignItems="center" gap={1}>
            <EmailOutlinedIcon />
            <Typography
              variant="body1"
              color="text.secondary"
              component={Link}
              href="mailto:contact@company.com"
            >
              {tFooter('contact.email')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <PhoneOutlinedIcon />
            <Typography
              variant="body1"
              color="text.secondary"
              component={Link}
              href="tel:(414) 687 - 5892"
            >
              {tFooter('contact.phone')}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <FmdGoodOutlinedIcon />
            <Typography variant="body1" color="text.secondary">
              {tFooter('contact.address')}
            </Typography>
          </Stack>
        </Box>
      </Container>
      <Container sx={styles.footerCopyright} disableGutters={true} maxWidth="desktop">
        <Stack sx={styles.footerCopyrightInner} direction="row">
          <Box>
            {' '}
            <Typography variant="body1" color="text.secondary">
              {tFooter('copyright', { year: new Date().getFullYear() })}
            </Typography>
          </Box>
          <Box sx={styles.footerCopyrightInnerLinks}>
            <Typography variant="body1" color="text.secondary">
              {tFooter('allRightsReserved')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              component={Link}
              href="/terms-and-conditions"
            >
              {tFooter('termsAndConditions')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              component={Link}
              href="/privacy-policy"
            >
              {tFooter('privacyPolicy')}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default TheMainFooter
