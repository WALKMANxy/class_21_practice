// src/components/product/RecensioniSection.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Review } from '../../../models/Product';
import ReviewCard from './ReviewCard'; // Adjust the path if needed

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <Box
      sx={{
        mt: 4,
        position: "relative",
        paddingBottom: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Recensioni
      </Typography>
      {reviews.length === 0 ? (
        <Typography variant="body1">
          Nessuna recensione disponibile.
        </Typography>
      ) : (
        reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      )}
    </Box>
  );
};

export default ReviewsSection;
