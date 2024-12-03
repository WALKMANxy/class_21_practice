// src/components/Header/UserAvatar.tsx
import React, { useState } from "react";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn, selectUsername } from "../../store/auth/authSlice";
import { handleLogout } from "../../store/auth/authThunks";
import AuthenticationModal from "../common/AuthenticationModal";

const UserAvatar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false); // State to control AuthenticationModal
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const username = useAppSelector(selectUsername);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handlers for logged-in state
  const handleSettingsClick = () => {
    navigate("/eshop/settings");
    handleClose();
  };

  const handleLogoutClick = () => {
    handleClose();
    dispatch(handleLogout());
  };

  // Handler for logged-out state
  const handleSignInClick = () => {
    setAuthModalOpen(true); // Open the AuthenticationModal
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleAvatarClick}
        sx={{ color: isLoggedIn ? "black" : "gray" }}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 8,
            padding: 1,
            minWidth: "220px",
            mt: 3,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {isLoggedIn && username ? (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {username}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem
                  button
                  onClick={handleSettingsClick}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Impostazioni" />
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
                Benvenuto!
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {/* Login Link */}
                <ListItem
                  button
                  onClick={handleSignInClick}
                  sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    my: 2,
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accedi" />
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Popover>

      {/* Authentication Modal */}
      <AuthenticationModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default React.memo(UserAvatar);
