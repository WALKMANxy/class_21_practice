// src/components/product/ProductInfo.tsx
import React from "react";
import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import dayjs from "dayjs";
import { Product } from "../../../models/Product";
import { formatCategoryName } from "../../../utils/searchUtils";
import { toast } from "sonner";
import { useAppSelector } from "../../../app/hooks";
import { selectIsLoggedIn } from "../../../store/auth/authSlice";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // Handler for the "Acquista" button click
  const handlePurchase = () => {
    if (!isLoggedIn) {
      toast.info("Prima di procedere all'acquisto, effettuare il log-in.");
      return;
    }

    // Proceed with the purchase process
    // For example, navigate to the checkout page or add the product to the cart
    // navigate('/checkout'); // Uncomment and use if you have routing set up
  };

  return (
    <>
      {/* Category and Favorite Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Category */}
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            padding: "4px 8px",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            {formatCategoryName(product.category)}
          </Typography>
        </Box>

        {/* Favorite Icon */}
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Date and ID */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* Date */}
        <Typography variant="body2" color="textSecondary">
          {dayjs(product.meta.createdAt).format("HH:mm DD/MM/YYYY")}
        </Typography>

        {/* Product ID */}
        <Typography variant="body2" color="textSecondary">
          ID: {product.id}
        </Typography>
      </Box>

      {/* Product Title */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        {product.title}
      </Typography>

      {/* Price and Fast Shipping */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          €{product.price.toFixed(2)}
        </Typography>
        {product.fastShipping && (
          <LocalShippingIcon
            color="action"
            sx={{ ml: 1 }}
            titleAccess="Spedizione Veloce"
          />
        )}
      </Box>

      {/* "Acquista" Button */}
      <Button
        variant="contained"
        sx={{
          borderRadius: "16px",
          px: 10,
          textTransform: "none",
          flexGrow: 1,
          backgroundColor: "#F9423A",
          color: "white",
          fontSize: "1.25rem", // 25% larger text
          "&:hover": {
            backgroundColor: "#d73b33",
          },
        }}
        onClick={handlePurchase} // Attach the click handler
      >
        Acquista
      </Button>
    </>
  );
};

export default ProductInfo;
