// src/layout/Layout.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import 'animate.css';
import Header from '../components/header/Header';

const Layout: React.FC = () => {
  const location = useLocation();

  // Determine which prop to pass to Header based on location
  let headerProp: 'shop' | 'trains' | undefined;
  if (location.pathname.startsWith('/eshop')) {
    headerProp = 'shop';
  } else if (location.pathname.startsWith('/trains')) {
    headerProp = 'trains';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        m: 0,
      }}
    >
      <Header headerProp={headerProp} />
      <Box
        component="main"
        key={location.pathname}
        className="animate__animated animate__fadeIn"
        sx={{ flex: 1, overflowY: 'auto', m: 0 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
