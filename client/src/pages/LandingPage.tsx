// src/pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import "animate.css";
import Footer from "../components/landing/Footer";
import AnimateButton from "../components/landing/AnimateButton";
import Loader from "../components/common/Loader";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [showLoader, setShowLoader] = useState(true);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? 188 : 250;

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        
      }}
    >
      {showLoader && <Loader fadeout={!showLoader} />}

      {/* Main Content */}
      <Box
        sx={{
          flex: "1 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: 2,
          opacity: showLoader ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
          }}
        >
          {/* First Button */}
          <AnimateButton
            imageSrc="/images/logo-page1.png"
            altText="Logo for Page 1"
            path="/eshop"
            buttonSize={buttonSize}
          />

          {/* Divider */}
          <Divider
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            flexItem
            sx={{ alignSelf: "stretch" }}
          />

          {/* Second Button */}
          <AnimateButton
            imageSrc="/images/logo-page2.png"
            altText="Logo for Page 2"
            path="/trains"
            buttonSize={buttonSize}
          />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default LandingPage;
