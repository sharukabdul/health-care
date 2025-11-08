import { NavLink, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveSidebar({ drawerWidth = 230, mobileOpen, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/user/dashboard' },
    { text: 'My Profile', icon: <PersonIcon />, path: '/user/my-profile' },
    { text: 'Wellness Goals', icon: <TrackChangesIcon />, path: '/user/welness-goals' },
    { text: 'Messages', icon: <MessageIcon />, path: '/user/messages' }
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
          Health Care
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={() => { if (!isMdUp && onClose) onClose(); }}
              sx={{
                color: '#fff',
                '&.active': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)'
                }
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 0 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate('/dashboard');
                if (!isMdUp && onClose) onClose();
              }}
              sx={{ color: '#fff' }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Temporary Drawer for small screens */}
      <Drawer
        variant="temporary"
        open={!!mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#00b0ff',
            color: '#fff',
            borderRight: 'none'
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent Drawer for md and up */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            top: 0,
            height: '100vh',
            backgroundColor: '#00b0ff',
            color: '#fff',
            borderRight: 'none'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
