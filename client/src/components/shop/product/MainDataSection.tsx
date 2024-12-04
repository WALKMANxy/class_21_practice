// src/components/product/DatiPrincipaliSection.tsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Product } from '../../../models/Product';

interface MainDataSectionProps {
  product: Product;
}

const MainDataSection: React.FC<MainDataSectionProps> = ({ product }) => {
  return (
    <Box
      sx={{
        mt: 4,
        position: "relative",
        paddingBottom: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Dati Principali
      </Typography>
      <Grid container spacing={2}>
        {/* Brand */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Brand
          </Typography>
          <Typography variant="body1">{product.brand}</Typography>
        </Grid>

        {/* SKU */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            SKU
          </Typography>
          <Typography variant="body1">{product.sku}</Typography>
        </Grid>

        {/* Availability Status */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Stato Disponibilità
          </Typography>
          <Typography variant="body1">
            {product.availabilityStatus}
          </Typography>
        </Grid>

        {/* Barcode */}
        {product.meta.barcode && (
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Barcode
            </Typography>
            <Typography variant="body1">{product.meta.barcode}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MainDataSection;
