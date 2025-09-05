'use client'

import { useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import MenuIcon from '@mui/icons-material/Menu'
import {
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  Box,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import useStyles from './TheMainHeader.style'

const TheMainHeader = () => {
  const styles = useStyles()
  const tCommon = useTranslations('common')
  const tMenu = useTranslations('menu')
  const tProfileSettings = useTranslations('profileSettings')
  const pathname = usePathname()

  const pages = [
    { title: tMenu('home'), href: '/' },
    { title: tMenu('profile'), href: '/profile', isAuthenticated: true },
    { title: tMenu('career'), href: '/career' },
    { title: tMenu('e-learning'), href: '/e-learning' },
    { title: tMenu('jobs'), href: '/jobs' },
    { title: tMenu('e-portfolio'), href: '/e-portfolio' },
    { title: tMenu('files'), href: '/files' },
  ]
  const settings = [
    { title: tProfileSettings('profile'), href: '/profile' },
    { title: tProfileSettings('settings'), href: '/settings' },
    { title: tProfileSettings('logout'), href: '/logout' },
  ]
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null)
  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget)
    setIsUserMenuOpen(true)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
    setIsUserMenuOpen(false)
  }

  return (
    <AppBar elevation={0} color="transparent" sx={{ py: 1 }} position="static" component="div">
      <Container maxWidth="desktop">
        <Toolbar disableGutters>
          <LogoDevIcon sx={styles.logo} />
          <Typography component={Link} href="/" sx={styles.textLogo}>
            {tCommon('logo')}
          </Typography>
          <Box sx={styles.menuMobile}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={styles.menu}
            >
              {pages.map((page) => {
                return (
                  <MenuItem
                    LinkComponent={Link}
                    href={page.href}
                    key={page.title}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography>{page.title}</Typography>
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>
          <LogoDevIcon sx={styles.logoMobile} />
          <Typography
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={styles.textLogoMobile}
          >
            {tCommon('logo')}
          </Typography>
          <List sx={styles.navLinks}>
            {pages.map((page) => {
              const isActive = decodeURIComponent(pathname) === page.href

              return (
                <ListItem key={page.title} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    component={Link}
                    href={page.href}
                    sx={styles.navLink(isActive)}
                  >
                    {page.title}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
          <Box sx={styles.settings}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={styles.avatar} alt="Remy Sharp" src="/images/avatar/2.png" />
                <KeyboardArrowDownIcon
                  sx={{
                    ...styles.settingsArrow,
                    transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 5.5 }}
              id="menu-settings"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TheMainHeader
