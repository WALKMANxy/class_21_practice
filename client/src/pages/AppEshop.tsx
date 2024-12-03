// src/pages/AppEshop.tsx
import React from 'react';
import SearchBar from '../components/shop/homepage/SearchBar';

import Box from '@mui/material/Box';
import UserTips from '../components/shop/homepage/UserTips';
import AppDownloadSection from '../components/shop/homepage/AppDownload';
import QuickSearch from '../components/shop/homepage/QuickSearch';
import { Divider } from '@mui/material';
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
      <UserTips />
      <AppDownloadSection />
      <Divider sx={{ backgroundColor: '#e0e0e0', width: '95%',         maxWidth: '980px', // Restrict content to 980px
 }}/>
      <QuickSearch />
      <Divider sx={{ backgroundColor: '#e0e0e0', width: '95%',         maxWidth: '980px', // Restrict content to 980px
 }}/>
      <FooterEshop />
    </Box>
  );
};

export default AppEshop;
