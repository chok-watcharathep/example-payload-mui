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
  const pathname = usePathname()

  const pages = ['home', 'profile', 'career', 'e-learning', 'jobs', 'e-portfolio', 'files']
  const settings = ['profile', 'settings', 'logout']
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
    <AppBar elevation={0} color="transparent" sx={{ py: 1 }} position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LogoDevIcon sx={styles.logo} />
          <Typography component={Link} href="/" sx={styles.textLogo}>
            {tCommon('logo')}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                const pageRoute = `/${page.toLowerCase().replace(/\s+/g, '-')}`
                return (
                  <MenuItem
                    LinkComponent={Link}
                    href={pageRoute}
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography>
                      {tMenu(
                        page as
                          | 'home'
                          | 'profile'
                          | 'career'
                          | 'e-learning'
                          | 'jobs'
                          | 'e-portfolio'
                          | 'files',
                      )}
                    </Typography>
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>
          <LogoDevIcon sx={{ ...styles.logo, display: { xs: 'flex', md: 'none' } }} />
          <Typography
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              ...styles.textLogo,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            {tCommon('logo')}
          </Typography>
          <List sx={styles.navLinks}>
            {pages.map((page) => {
              const pageRoute = `/${page.toLowerCase().replace(/\s+/g, '-')}`
              const isActive = decodeURIComponent(pathname) === pageRoute

              return (
                <ListItem key={page} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    component={Link}
                    href={pageRoute}
                    sx={styles.navLink(isActive)}
                  >
                    {tMenu(
                      page as
                        | 'home'
                        | 'profile'
                        | 'career'
                        | 'e-learning'
                        | 'jobs'
                        | 'e-portfolio'
                        | 'files',
                    )}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
          <Box sx={{ flexGrow: 0, alignItems: 'center', display: 'flex', gap: 1 }}>
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
              sx={{ mt: '45px' }}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
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
