// src/components/common/UnderConstruction.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderConstruction: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Under Construction
      </Typography>
      <ConstructionIcon sx={{ fontSize: 100 }} />
    </Box>
  );
};

export default UnderConstruction;
