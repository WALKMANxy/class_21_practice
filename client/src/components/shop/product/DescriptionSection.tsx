// src/components/product/DescriptionSection.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <Box
      sx={{
        mt: 4,
        position: "relative",
        paddingBottom: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Descrizione
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default DescriptionSection;
