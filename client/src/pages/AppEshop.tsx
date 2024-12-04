// src/pages/AppEshop.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchBar from '../components/shop/homepage/SearchBar';
import FooterEshop from '../components/shop/homepage/FooterEshop';

const AppEshop: React.FC = () => {

  const location = useLocation();

  const showSearchBar = !location.pathname.includes('/eshop/product/');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {showSearchBar && <SearchBar />}
      <Outlet />
      <FooterEshop />
    </Box>
    
  );
};

export default AppEshop;
