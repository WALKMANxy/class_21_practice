// src/components/eshop/products/ProductsList.tsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import useProducts from "../../../hooks/eshop/useProducts";
import ProductCard from "./ProductCard";
import { IOSSwitch } from "../../../styles/StyledComponents";

const ProductsList: React.FC = () => {
  const { products, fetchProducts, searchProducts, totalProducts } =
    useProducts();
  const [fastShippingOnly, setFastShippingOnly] = useState(false);
  const [promoActiveOnly, setPromoActiveOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const searchQuery = useAppSelector((state) => state.search.query);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const totalPages = Math.ceil(totalProducts / perPage);

  useEffect(() => {
    const skip = (currentPage - 1) * perPage;
    if (searchQuery) {
      searchProducts(searchQuery, perPage, skip);
    } else {
      fetchProducts(perPage, skip);
    }
  }, [searchQuery, currentPage, fetchProducts, searchProducts]);

  useEffect(() => {
    let filtered = products;

    if (fastShippingOnly) {
      filtered = filtered.filter((product) => product.fastShipping);
    }

    if (promoActiveOnly) {
      filtered = filtered.filter((product) => product.promoRibbon);
    }

    setFilteredProducts(filtered);
  }, [fastShippingOnly, promoActiveOnly, products]);

  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    items.push("<");

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        items.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        items.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    items.push(">");

    return items;
  };

  return (
    <Box sx={{ padding: 2, maxWidth: "980px" }}>
      <Divider
        sx={{ backgroundColor: "#f7f8fb", width: "95%", maxWidth: "980px" }}
      />
      <Grid container spacing={2}>
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: "sticky", top: 16, pt: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Filtri ricerca
            </Typography>

            <Box sx={{ pr: 5 }}>
              {/* Spedizione Veloce Switch */}
              <FormControlLabel
                label="Spedizione Veloce"
                labelPlacement="start"
                control={
                  <IOSSwitch
                    checked={fastShippingOnly}
                    onChange={(e) => setFastShippingOnly(e.target.checked)}
                  />
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                }}
              />

              {/* Promo Attiva Switch */}
              <FormControlLabel
                label="Promo Attiva"
                labelPlacement="start"
                control={
                  <IOSSwitch
                    checked={promoActiveOnly}
                    onChange={(e) => setPromoActiveOnly(e.target.checked)}
                  />
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Product Cards */}

        <Grid item xs={12} md={9}>
          <Box
            sx={{
              backgroundImage:
                "linear-gradient(to right, #f7f8fb 0%, #fff 100%)",
              p: 1,
              px: 3,
            }}
          >
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {totalProducts} risultati{" "}
              {searchQuery && `per "${searchQuery}" in tutta Italia`}
            </Typography>

            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => {
                      // Placeholder for onClick action
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
            >
              {getPaginationItems().map((item, index) => {
                if (item === "<" || item === ">") {
                  return (
                    <Button
                      key={index}
                      onClick={() => {
                        if (item === "<" && currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        } else if (item === ">" && currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      sx={{
                        color: "gray",
                        minWidth: "auto",
                        padding: "6px 8px",
                      }}
                      disabled={
                        (item === "<" && currentPage === 1) ||
                        (item === ">" && currentPage === totalPages)
                      }
                    >
                      {item}
                    </Button>
                  );
                } else if (item === "...") {
                  return (
                    <Typography
                      key={index}
                      sx={{ margin: "0 8px", color: "gray" }}
                    >
                      {item}
                    </Typography>
                  );
                } else {
                  return (
                    <Button
                      key={index}
                      onClick={() => setCurrentPage(Number(item))}
                      sx={{
                        color: currentPage === item ? "red" : "gray",
                        minWidth: "auto",
                        padding: "6px 8px",
                      }}
                    >
                      {item}
                    </Button>
                  );
                }
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsList;
