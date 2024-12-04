// src/components/product/TagsSection.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatTags } from '../../../utils/searchUtils';

interface TagsSectionProps {
  tags: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ tags }) => {
  return (
    <Box
      sx={{
        mt: 4,
        position: "relative",
        paddingBottom: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Tags
      </Typography>
      <Typography variant="body1">{formatTags(tags)}</Typography>
    </Box>
  );
};

export default TagsSection;
