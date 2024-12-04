// src/components/product/ImageGallery.tsx
import React, { useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handlePrevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setImageLoaded(false); // Reset imageLoaded when changing image
    }
  };

  const handleNextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setImageLoaded(false); // Reset imageLoaded when changing image
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingTop: "75%", // 4:3 Aspect Ratio
        border: "1px solid #f5f5f5", // Faint border
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Counter */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "0.875rem",
        }}
      >
        {currentImageIndex + 1}/{images.length}
      </Box>

      {/* Image and Spinner */}
      <img
        src={images[currentImageIndex]}
        alt={`${title} - Image ${currentImageIndex + 1}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress sx={{ color: "#F9423A" }} />
        </Box>
      )}

      {/* Navigation Arrows */}
      {isHovered && images.length > 1 && (
        <>
          {/* Previous Arrow */}
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            aria-label="previous image"
          >
            <ArrowLeftIcon />
          </IconButton>

          {/* Next Arrow */}
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            aria-label="next image"
          >
            <ArrowRightIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImageGallery;
