// src/pages/AppEshop.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchBar from '../components/shop/homepage/SearchBar';
import FooterEshop from '../components/shop/homepage/FooterEshop';

const AppEshop: React.FC = () => {
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
      <SearchBar />
      <Outlet />
      <FooterEshop />
    </Box>
  );
};

export default AppEshop;
