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
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSearchQuery } from '../../../store/search/searchSlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state: RootState) => state.search.query);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/eshop/result?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
    if (location.pathname !== '/eshop') {
      navigate('/eshop');
    }
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
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch}>
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
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "regular" }}>
            In quale categoria?
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textTransform: "none",
              color: "inherit",
              border: "1px solid rgba(0, 0, 0, 0.20)",
              backgroundColor: "white",
              height: "45px", // Match the height of other inputs
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SearchIcon />
              <Typography
                fontWeight={"light"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Tutte le categorie
              </Typography>
            </Box>
          </Button>
        </Grid>

        {/* Region Selector */}
        <Grid item xs={13} sm={3.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "regular" }}>
            Dove?
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RoomIcon />
                </InputAdornment>
              ),
            }}
            placeholder="City, Region, or State"
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
