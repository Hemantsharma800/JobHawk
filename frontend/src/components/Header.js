import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Badge,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  AutoAwesome as AutoAwesomeIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const menuItems = [
    { text: 'Job Search', icon: <SearchIcon />, path: '/jobs' },
    { text: 'AI Analysis', icon: <AutoAwesomeIcon />, path: '/ai-analysis' },
    { text: 'Resume Builder', icon: <DashboardIcon />, path: '/resume-builder' },
    { text: 'Career Tools', icon: <WorkIcon />, path: '/tools' },
    { text: 'Pricing', icon: <WorkIcon />, path: '/pricing' },
    { text: 'About Us', icon: <PersonIcon />, path: '/about' }
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo and Company Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, mr: 4 }}>
            <Box
              component="div"
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="white">
                G
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="primary" sx={{ lineHeight: 1 }}>
                GLIXTRON
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                AI Career Platform
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && isAuthenticated && (
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: 'text.primary',
                    '&:hover': { bgcolor: 'primary.light', color: 'primary.main' }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isAuthenticated ? (
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ mr: 1 }}
              >
                Sign In
              </Button>
            ) : (
              <>
                {!isMobile && (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<WorkIcon />}
                      onClick={() => navigate('/post-job')}
                      sx={{ mr: 1 }}
                    >
                      Post a Job
                    </Button>
                    <IconButton>
                      <Badge badgeContent={3} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </>
                )}

                {/* User Profile */}
                <IconButton onClick={handleMenuClick}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/subscription'); handleMenuClose(); }}>
                    Subscription
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && isAuthenticated && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 280, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  G
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  GLIXTRON
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  AI Career Platform
                </Typography>
              </Box>
            </Box>
            
            <List>
              {menuItems.map((item) => (
                <ListItem 
                  key={item.text} 
                  button 
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false);
                  }}
                >
                  <Box sx={{ mr: 2 }}>{item.icon}</Box>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              
              <ListItem button onClick={() => navigate('/post-job')}>
                <Box sx={{ mr: 2 }}><WorkIcon /></Box>
                <ListItemText primary="Post a Job" />
              </ListItem>
              
              <ListItem button onClick={() => navigate('/notifications')}>
                <Box sx={{ mr: 2 }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </Box>
                <ListItemText primary="Notifications" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
};

export default Header;
