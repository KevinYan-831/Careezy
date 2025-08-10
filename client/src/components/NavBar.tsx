import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Container,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
// import CareezyLogo from '../assets/Careezy-Logo.png';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
  // Mock authentication state - in production, this would come from context/redux
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
    handleCloseUserMenu();
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            Careezy
          </Typography>
        </Box>

        {/* Spacer to push right-side content to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Links - Right Side */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            component={Link}
            to="/#about"
            color="inherit"
            sx={{
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/pricing"
            color="inherit"
            sx={{
              fontWeight: isActivePage('/pricing') ? 600 : 400,
              textDecoration: isActivePage('/pricing') ? 'underline' : 'none',
              textTransform: 'none',
            }}
          >
            Pricing
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/resume"
                color="inherit"
                sx={{
                  fontWeight: isActivePage('/resume') ? 600 : 400,
                  textDecoration: isActivePage('/resume') ? 'underline' : 'none',
                }}
              >
                Resume Builder
              </Button>
              <Button
                component={Link}
                to="/internships"
                color="inherit"
                sx={{
                  fontWeight: isActivePage('/internships') ? 600 : 400,
                  textDecoration: isActivePage('/internships') ? 'underline' : 'none',
                }}
              >
                Internships
              </Button>
              <Button
                component={Link}
                to="/dashboard"
                color="inherit"
                sx={{
                  fontWeight: isActivePage('/dashboard') ? 600 : 400,
                  textDecoration: isActivePage('/dashboard') ? 'underline' : 'none',
                }}
              >
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="secondary"
                variant="contained"
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        {/* User Menu for Authenticated Users */}
        {isAuthenticated && (
        <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Tooltip title="Open settings">
                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                   <Avatar sx={{ bgcolor: 'secondary.main' }}>
                     {user?.name?.charAt(0) || <AccountCircleIcon />}
                   </Avatar>
                 </IconButton>
               </Tooltip>
               <Menu
                 sx={{ mt: '45px' }}
                 id="menu-appbar"
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
                 <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/dashboard'); }}>
                   <Typography textAlign="center">Dashboard</Typography>
                 </MenuItem>
                 <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/resume'); }}>
                   <Typography textAlign="center">Resume</Typography>
                 </MenuItem>
                 <MenuItem onClick={handleLogout}>
                   <Typography textAlign="center">Logout</Typography>
                 </MenuItem>
               </Menu>
             </Box>
         </Box>
         )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;