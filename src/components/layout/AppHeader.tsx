'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';

export function Brand() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, color: '#2F80ED' }}>
      <Typography component="span" variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2, color: 'inherit' }}>
        gler
      </Typography>
      <AutoAwesomeIcon sx={{ color: '#F2C94C' }} />
      <Typography component="span" variant="subtitle2" sx={{ fontWeight: 600, color: 'inherit' }}>
        Admin Panel
      </Typography>
    </Box>
  );
}

const navItems = [
  { label: 'Service Dashboard', href: '/' },
  { label: 'Finance Forecast', href: '#finance' },
  { label: 'Human Resources', href: '/waitlist' },
  { label: 'Users', href: '#users' },
  { label: 'Compliances & Verification', href: '#compliance' },
];

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active tab. We consider Human Resources active on /waitlist
  const currentIndex = React.useMemo(() => {
    const idx = navItems.findIndex((n) => {
      if (n.href === '/waitlist') return pathname?.startsWith('/waitlist');
      return false;
    });
    return idx === -1 ? 0 : idx;
  }, [pathname]);

  const handleChange = (_event: React.SyntheticEvent, value: number) => {
    const item = navItems[value];
    if (!item) return;
    if (item.href.startsWith('#')) return; // placeholder
    router.push(item.href);
  };

  // Menus state
  const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null);
  const [anchorNotif, setAnchorNotif] = React.useState<null | HTMLElement>(null);
  const [anchorMsg, setAnchorMsg] = React.useState<null | HTMLElement>(null);

  const openUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorUser(e.currentTarget);
  const closeUserMenu = () => setAnchorUser(null);
  const openNotifMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorNotif(e.currentTarget);
  const closeNotifMenu = () => setAnchorNotif(null);
  const openMsgMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorMsg(e.currentTarget);
  const closeMsgMenu = () => setAnchorMsg(null);

  return (
    <AppBar color="transparent" position="sticky" elevation={0}
      sx={(theme) => ({
        borderBottom: 1,
        borderColor: 'divider',
        backdropFilter: 'saturate(180%) blur(6px)',
        bgcolor: 'background.paper',
        zIndex: theme.zIndex.appBar + 1,
        maxWidth: '100%',
        overflow: 'hidden',
      })}>
        
      <Toolbar sx={{ gap: 2, minHeight: 72, maxWidth: '100%', overflow: 'hidden' }}>

        <Tabs
          value={currentIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: 'text.secondary' },
            '& .Mui-selected': { color: 'text.primary' },
            '& .MuiTabs-indicator': { bgcolor: 'text.primary' },
          }}
        >
          {navItems.map((item) => (
            <Tab key={item.label} label={item.label} />
          ))}
        </Tabs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton size="small" aria-label="notifications" onClick={openNotifMenu}>
            <Badge color="primary" variant="dot" overlap="circular">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <IconButton size="small" aria-label="messages" onClick={openMsgMenu}>
            <Badge color="secondary" variant="dot" overlap="circular">
              <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
          <IconButton size="small" onClick={openUserMenu} sx={{ p: 0 }} aria-label="account menu">
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="User avatar"
              src="https://tse2.mm.bing.net/th/id/OIP.a--hgqni6ZAZ1SgFlQfMzAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '14px',
                letterSpacing: 0,
                color: 'var(--neutral-300)'
              }}
            >
              Max Smith
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '14px',
                letterSpacing: 0,
                color: 'var(--neutral-300)'
              }}
            >
              London, UK
            </Typography>
          </Box>
        </Box>

        {/* Notifications Menu */}
        <Menu anchorEl={anchorNotif} open={Boolean(anchorNotif)} onClose={closeNotifMenu} keepMounted>
          <MenuItem onClick={() => { console.log('View notifications'); closeNotifMenu(); }}>
            <ListItemIcon>
              <NotificationsNoneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View all notifications" />
          </MenuItem>
          <MenuItem onClick={() => { console.log('Mark all as read'); closeNotifMenu(); }}>
            <ListItemIcon>
              <DoneAllOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mark all as read" />
          </MenuItem>
          <MenuItem onClick={() => { console.log('Notification settings'); closeNotifMenu(); }}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Notification settings" />
          </MenuItem>
        </Menu>

        {/* Messages Menu */}
        <Menu anchorEl={anchorMsg} open={Boolean(anchorMsg)} onClose={closeMsgMenu} keepMounted>
          <MenuItem onClick={() => { console.log('Open messages'); closeMsgMenu(); }}>
            <ListItemIcon>
              <MarkEmailUnreadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Open messages" />
          </MenuItem>
          <MenuItem onClick={() => { console.log('Message settings'); closeMsgMenu(); }}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Message settings" />
          </MenuItem>
        </Menu>

        {/* User Menu */}
        <Menu anchorEl={anchorUser} open={Boolean(anchorUser)} onClose={closeUserMenu} keepMounted>
          <MenuItem onClick={() => { console.log('Profile'); closeUserMenu(); }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={() => { console.log('Account settings'); closeUserMenu(); }}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => { console.log('Sign out'); closeUserMenu(); }}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
