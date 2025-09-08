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

import { Route } from '@/frontend/enums/route.enum'
import { socialUrl } from '@/payload/constants/url.constant'

import useStyles from './TheMainFooter.style'

const TheMainFooter = () => {
  const styles = useStyles()
  const tFooter = useTranslations('footer')
  const tCommon = useTranslations('common')

  const pages = [
    { title: tFooter('nav.features'), href: Route.FEATURES },
    { title: tFooter('nav.pricing'), href: Route.PRICING },
    { title: tFooter('nav.caseStudies'), href: Route.CASE_STUDIES },
    { title: tFooter('nav.reviews'), href: Route.REVIEWS },
    { title: tFooter('nav.updates'), href: Route.UPDATES },
    { title: tFooter('nav.about'), href: Route.ABOUT },
    { title: tFooter('nav.contactUs'), href: Route.CONTACT_US },
    { title: tFooter('nav.careers'), href: Route.CAREERS },
    { title: tFooter('nav.culture'), href: Route.CULTURE },
    { title: tFooter('nav.blog'), href: Route.BLOG },
    { title: tFooter('nav.gettingStarted'), href: Route.GETTING_STARTED },
    { title: tFooter('nav.helpCenter'), href: Route.HELP_CENTER },
    { title: tFooter('nav.serverStatus'), href: Route.SERVER_STATUS },
    { title: tFooter('nav.reportBug'), href: Route.REPORT_BUG },
    { title: tFooter('nav.chatSupport'), href: Route.CHAT_SUPPORT },
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
              <ListItemButton component={Link} href={socialUrl.facebook} target="_blank">
                <FacebookIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={socialUrl.twitter} target="_blank">
                <TwitterIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={socialUrl.instagram} target="_blank">
                <InstagramIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={socialUrl.linkedin} target="_blank">
                <LinkedInIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href={socialUrl.youtube} target="_blank">
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
      <Container disableGutters={true} maxWidth="desktop">
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
              href={Route.TERMS_AND_CONDITIONS}
            >
              {tFooter('termsAndConditions')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              component={Link}
              href={Route.PRIVACY_POLICY}
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
