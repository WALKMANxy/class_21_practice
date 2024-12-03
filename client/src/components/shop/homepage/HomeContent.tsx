// src/components/eshop/homepage/HomeContent.tsx
import React from 'react';
import UserTips from './UserTips';
import AppDownloadSection from './AppDownload';
import QuickSearch from './QuickSearch';
import { Divider } from '@mui/material';

const HomeContent: React.FC = () => {
  return (
    <>
      <UserTips />
      <AppDownloadSection />
      <Divider
        sx={{
          backgroundColor: '#e0e0e0',
          width: '95%',
          maxWidth: '980px',
        }}
      />
      <QuickSearch />
      <Divider
        sx={{
          backgroundColor: '#e0e0e0',
          width: '95%',
          maxWidth: '980px',
        }}
      />
      {/* ... any other components ... */}
    </>
  );
};

export default HomeContent;
