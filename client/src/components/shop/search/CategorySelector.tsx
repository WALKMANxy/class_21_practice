import React from "react";
import {
  Modal,
  Box,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../../styles/theme";

interface CategorySelectorProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  onSelect: (category: string) => void;
}

const formatCategoryName = (category: string): string => {
  const replaced = category.replace(/-/g, " ");
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  open,
  onClose,
  categories,
  categoriesLoading,
  categoriesError,
  onSelect,
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="category-selector-title"
      aria-describedby="category-selector-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isSmallScreen ? "95%" : "80%",
          maxWidth: "780px",
          maxHeight: "500px",
          bgcolor: "background.paper",
          boxShadow: 24,
            
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Grid container spacing={2} >
          {/* Left Section */}
          <Grid item xs={3.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                backgroundColor: "#f8f9fc",
                py: 2,
                px: 2,
                pb: 5,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: 10,
                  backgroundColor: "#F2A700",
                  fontWeight: "bold",
                  textTransform: "none",
                  textAlign: "left",
                  padding: "8px 16px",
                  display: "flex",              
                  justifyContent: "flex-start",  
                  "&:hover": {
                    backgroundColor: "#cc8700",
                  },
                }}
              >
                Market
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  onSelect(""); // Clear selection
                  onClose();
                }}
                sx={{
                  marginTop: 2,
                  textTransform: "none",
                  borderColor: "#ccc",
                  color: "#666",
                  backgroundColor: "#fff",

                  "&:hover": {
                    borderColor: "#aaa",
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                Cerca in tutte le categorie
              </Button>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={8.5}>
            <Box sx={{ px: 4}}>
              <Typography
                id="category-selector-title"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2, pt: 2 }}
              >
                Categoria
              </Typography>
              <Box
                sx={{
                  maxHeight: "450px",
                  overflowY: "auto",
                  paddingRight: 1,
                }}
              >
                <Box
                  component="img"
                  src="/public/images/market.svg" // Update with correct path
                  alt="Market Icon"
                  sx={{ height: "32px" }}
                />

                {categoriesLoading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : categoriesError ? (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {categoriesError}
                  </Typography>
                ) : (
                  <List sx={{mb: 3}}>
                    {categories.map((category) => (
                      <ListItem key={category} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            onSelect(category);
                            onClose();
                          }}
                        >
                          <ListItemText
                            primary={formatCategoryName(category)}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CategorySelector;
