// src/components/eshop/products/ProductCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Product } from '../../../models/Product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        py:1
      }}
      onClick={onClick}
    >
      {/* Product Thumbnail */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ width: 200, height: 200 }}
        />
        {product.promoRibbon && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: 'red',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
            }}
          >
            PROMO
          </Box>
        )}
        {product.images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              borderRadius: 1,
              padding: '2px 4px',
            }}
          >
            <CameraAltOutlinedIcon sx={{ fontSize: '16px' }} />
            <Typography sx={{ marginLeft: 1, fontSize: '12px' }}>
              {product.images.length}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Product Details */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '16px',
          mb: 10
        }}
      >
        <Typography variant="h6">{product.title}</Typography>
        <Typography
          variant="body2"
          sx={{
            color:
              product.availabilityStatus === 'In Stock' ? 'red' : 'gray',
          }}
        >
          {product.availabilityStatus === 'In Stock'
            ? 'Disponibile'
            : 'Non Disponibile'}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'red', display: 'flex', alignItems: 'center' }}
        >
          {product.price} €
          {product.fastShipping && (
            <LocalShippingIcon sx={{ marginLeft: 1 }} />
          )}
        </Typography>
      </CardContent>

      {/* Favorite Icon */}
      <Box sx={{ padding: 1, mb: 18 }}>
        <IconButton>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductCard;
