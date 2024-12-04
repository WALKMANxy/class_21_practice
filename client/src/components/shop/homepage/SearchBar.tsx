// src/components/eshop/homepage/SearchBar.tsx
import React from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '../../../styles/theme';
import useSearch from '../../../hooks/eshop/useSearch';
import useProducts from '../../../hooks/eshop/useProducts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { setCategory } from '../../../store/search/searchSlice';
import { formatCategoryName } from '../../../utils/searchUtils';
import CategorySelector from '../search/CategorySelector';

const SearchBar: React.FC = () => {
  const {
    search,
    setSearch,
    handleSearch,
    handleKeyPress,
    handleClearSearch,
  } = useSearch();

  const {
    categories,
    categoriesLoading,
    categoriesError,
    fetchProductsByCategory,
  } = useProducts();

  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector((state: RootState) => state.search.category);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState<boolean>(false);

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setCategory(category));
    // Optionally, fetch products by category immediately
     fetchProductsByCategory(category);
  };


  return (
    <Paper
      elevation={10}
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '90vw',
        mx: 'auto',
        mt: 5,
        mb: 2,
        maxWidth: '980px',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Search Item */}
        <Grid item xs={12} sm={3.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'regular' }}>
            Cosa cerchi?
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} aria-label="clear search">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              '& .MuiInputBase-root': {
                height: '45px',
              },
              '& .MuiOutlinedInput-root': {
                borderWidth: '1px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '& fieldset': {
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderWidth: '1px',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: '1px',
                },
              },
            }}
          />
        </Grid>

        {/* Category Selector */}
        <Grid item xs={12} sm={3.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'regular' }}>
            In quale categoria?
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleOpenCategoryModal}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textTransform: 'none',
              color: 'inherit',
              border: '1px solid rgba(0, 0, 0, 0.20)',
              backgroundColor: 'white',
              height: '45px', // Match the height of other inputs
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon />
              <Typography
                fontWeight={'light'}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedCategory
                  ? formatCategoryName(selectedCategory)
                  : 'Tutte le categorie'}
              </Typography>
            </Box>
          </Button>

          {/* Category Selector Modal */}
          <CategorySelector
            open={isCategoryModalOpen}
            onClose={handleCloseCategoryModal}
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoriesError={categoriesError}
            onSelect={handleCategorySelect}
          />
        </Grid>

        {/* Region Selector */}
        <Grid item xs={12} sm={3.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "regular" }}>
            Dove?
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value="Tutta Italia" // Set the fixed value

            disabled // Disable the TextField to gray it out and prevent interaction
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RoomIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              "& .MuiInputBase-root": {
                height: "45px", // Ensure consistent height
              },
              "& .MuiOutlinedInput-root": {
                borderWidth: "1px", // Set border width
                borderColor: "rgba(0, 0, 0, 0.23)", // Optional: set border color
                "& fieldset": {
                  borderWidth: "1px", // Apply thin border width
                },
                "&:hover fieldset": {
                  borderWidth: "1px", // Keep it consistent on hover
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "1px", // Thin border on focus
                },
              },
            }}
          />
        </Grid>

        {/* Search Button */}
        <Grid
          item
          xs={12}
          sm={1}
          sx={{ flexGrow: 1, minWidth: 0, mt: 4, ml: isSmallScreen ? 0 : 2 }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearch}
            sx={{
              height: "45px", // Match the height of other inputs
              borderRadius: 2,
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9423a",
              "&:hover": {
                backgroundColor: "#d73b33", // Slightly darker shade for hover effect
              },
            }}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchBar;
