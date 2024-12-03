import React from "react";
import { Box, Typography, ButtonBase } from "@mui/material";

const AppDownloadSection: React.FC = () => {
  const downloads = [
    {
      id: 1,
      image: "/images/downloadAndroid.png",
      link: "https://play.google.com/store/apps/details?id=it.subito",
      alt: "Download on Google Play",
    },
    {
      id: 2,
      image: "/images/downloadIOS.svg",
      link: "https://apps.apple.com/it/app/subito-it-vendi-di-tutto/id450775137",
      alt: "Download on App Store",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fc",
        py: 4,
        px: 2,
        textAlign: "center",
        borderRadius: 10,
        width: "90vw",
        my: 2,
        maxWidth: '980px', // Restrict content to 980px
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Scarica l'App ufficiale di Subito.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Cerca tra migliaia di annunci e inserisci i tuoi, ovunque tu sia.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {downloads.map((download) => (
          <ButtonBase
            key={download.id}
            component="a"
            href={download.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "block",
              borderRadius: 2,
              overflow: "hidden",
              width: "150px",
              height: "auto",
            }}
          >
            <img
              src={download.image}
              alt={download.alt}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(AppDownloadSection);
