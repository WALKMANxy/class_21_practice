// src/components/Header/UserAvatar.tsx
import React, { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import {
    Chat as ChatIcon,
    Settings as SettingsIcon,
  } from '@mui/icons-material';

const UserAvatar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const isLoggedIn = false; // Hardcoded for now

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handlers for logged-in state
  const handleMockChild3Click = () => {
    navigate('/child3');
    handleClose();
  };

  const handleMockChild4Click = () => {
    navigate('/child4');
    handleClose();
  };

  const handleLogoutClick = () => {
    // Mock logout function
    console.log('User logged out');
    navigate('/');
    handleClose();
  };

  // Handlers for logged-out state
  const handleLoginClick = () => {
    navigate('/login');
    handleClose();
  };

  const handleRegisterClick = () => {
    navigate('/register');
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleAvatarClick}
        sx={{ color: isLoggedIn ? 'black' : 'gray' }}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 8,
            padding: 1,
            minWidth: '220px',
            mt: 3,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {isLoggedIn ? (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                User
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {/* Mock Child 3 Link */}
                <ListItem
                  button
                  onClick={handleMockChild3Click}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mock Child 3" />
                </ListItem>
                <Divider />

                {/* Mock Child 4 Link */}
                <ListItem
                  button
                  onClick={handleMockChild4Click}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mock Child 4" />
                </ListItem>
                <Divider />

                {/* Logout Link */}
                <ListItem
                  button
                  onClick={handleLogoutClick}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </>
          ) : (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Welcome!
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {/* Login Link */}
                <ListItem
                  button
                  onClick={handleLoginClick}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    my: 2,
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>

                {/* Register Link */}
                <ListItem
                  button
                  onClick={handleRegisterClick}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    mt: 2,
                  }}
                >
                  <ListItemIcon>
                    <HowToRegIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Popover>
    </>
  );
};



export default React.memo(UserAvatar);
