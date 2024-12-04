// src/components/product/BackButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}
      sx={{
        borderRadius: "24px",
        maxWidth: "200px",
        maxHeight: "50px",
        textTransform: "none",
        justifyContent: "flex-start",
        color: "#F9423A",
        borderColor: "#F9423A",
        "&:hover": {
          borderColor: "#F9423A",
          backgroundColor: "rgba(249, 66, 58, 0.04)", // Light red on hover
        },
      }}
    >
      Torna alla ricerca
    </Button>
  );
};

export default BackButton;
