// src/components/Header/NotificationBell.tsx
import React, { useState } from 'react';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import {
  Badge,
  Box,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import { shakeAnimation } from '../../utils/constants';

const NotificationBell: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Anchor the popover to the bell icon
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleBellClick}
        sx={{
            color: "gray",
            "&:hover": {
              animation: `${shakeAnimation} 0.3s ease-in-out`,
            },
          }}
      >
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '8px',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="h2">
            Notifications
          </Typography>
          <Typography sx={{ mt: 2 }}>No notifications</Typography>
        </Box>
      </Popover>
    </>
  );
};

export default React.memo(NotificationBell);
