// src/components/Header/Header.tsx
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import NotificationBell from './NotificationBell';
import UserAvatar from './UserAvatar';

interface HeaderProps {
  headerProp?: 'shop' | 'trains';
}

const Header: React.FC<HeaderProps> = ({ headerProp }) => {
  const [showAppBar, setShowAppBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const isUserLoggedIn = false;

  // Function to handle logo click
  const handleLogoClick = () => {
    if (headerProp === 'shop') {
      navigate('/');
    } else if (headerProp === 'trains') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  // Hide or show the AppBar based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowAppBar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowAppBar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
          width: '90vw',
          margin: '10px auto',
          borderRadius: '16px',
          transition: 'top 0.3s ease-in-out',
          top: showAppBar ? '0' : '-80px',
          left: 0,
          right: 0,
        }}
        className="animate__animated animate__fadeInDown"
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Removed the Drawer toggle button */}
            <img
              src={
                headerProp === 'shop'
                  ? '/images/logo-page1.svg'
                  : headerProp === 'trains'
                  ? '/images/logo-page2.png'
                  : '/images/logo-appbar.png'
              }
              alt="Logo"
              style={{ height: '40px', marginLeft: '-3px', cursor: 'pointer' }}
              onClick={handleLogoClick}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Notification Bell */}
            {isUserLoggedIn && <NotificationBell />}
            {/* User Avatar */}
            <UserAvatar />
          </Box>
        </Toolbar>
      </AppBar>
      {/* Spacer to avoid content being hidden under the AppBar */}
      <Toolbar />
    </>
  );
};

export default React.memo(Header);
