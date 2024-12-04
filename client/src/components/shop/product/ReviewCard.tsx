// src/components/shop/products/ReviewCard.tsx
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { Review } from '../../../models/Product';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        {/* Reviewer Name */}
        <Typography variant="subtitle1" fontWeight="bold">
          {review.reviewerName}
        </Typography>

        {/* Rating */}
        <Typography variant="h6" color="textSecondary">
          {review.rating}/5
        </Typography>
      </Box>

      {/* Comment */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        {review.comment}
      </Typography>

      {/* Review Date */}
      <Typography variant="caption" color="textSecondary">
        {dayjs(review.date).format('DD/MM/YYYY')}
      </Typography>

      {/* Divider */}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default ReviewCard;
