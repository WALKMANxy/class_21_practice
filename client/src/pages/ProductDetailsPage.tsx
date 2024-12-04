// src/pages/ProductDetailsPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import useProducts from "../hooks/eshop/useProducts";
import { Product } from "../models/Product";
import BackButton from "../components/shop/product/BackButton";
import ImageGallery from "../components/shop/product/ImageGallery";
import ProductInfo from "../components/shop/product/ProductInfo";
import DescriptionSection from "../components/shop/product/DescriptionSection";
import MainDataSection from "../components/shop/product/MainDataSection";
import TagsSection from "../components/shop/product/TagsSection";
import ReviewsSection from "../components/shop/product/ReviewsSection";


const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchProductById } = useProducts();

  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const productId = parseInt(id, 10);
        try {
          const fetchedProduct = await fetchProductById(productId);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            setError("Product not found");
          }
        } catch (err) {
          setError("Failed to load product");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return null; // Or some fallback UI
  }

  return (
    <Box
      sx={{
        maxWidth: "980px",
        p: 2,
        pt: 6,
        borderBottom: "1px solid #e0e0e0",
        borderLeft: "1px solid transparent",
        borderRight: "1px solid transparent",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "100%",
          background: "linear-gradient(to top, #e0e0e0, transparent)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "1px",
          height: "100%",
          background: "linear-gradient(to top, #e0e0e0, transparent)",
        },
      }}
    >
      {/* Back Button */}
      <BackButton />

      {/* Main Content */}
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {/* Left Side - Image Gallery */}
        <Grid item xs={12} md={8}>
          <ImageGallery images={product.images} title={product.title} />
        </Grid>

        {/* Right Side - Product Information */}
        <Grid item xs={12} md={4}>
          <ProductInfo product={product} />
        </Grid>
      </Grid>

      {/* Description Section */}
      <DescriptionSection description={product.description} />

      {/* Dati Principali Section */}
      <MainDataSection product={product} />

      {/* Tags Section */}
      <TagsSection tags={product.tags} />

      {/* Recensioni Section */}
      <ReviewsSection reviews={product.reviews} />
    </Box>
  );
};

export default ProductDetailsPage;
