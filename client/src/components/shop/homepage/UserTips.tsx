import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

const UserTips: React.FC = () => {
  const cards = [
    {
      id: 1,
      title: "Le truffe: come riconoscerle",
      link: "https://info.subito.it/profilo-sicuro.htm#truffe",
      image: "/images/subitocard1.png",
      description: "Scopri di più",
    },
    {
      id: 2,
      title: "Come funziona TuttoSubito?",
      link: "https://gvhgm05dyg7.typeform.com/to/WXuFkWfu?typeform-source=www.subito.it#approfondire=0&sped_fatta=0",
      image: "/images/subitocard2.png",
      description: "Mettilo alla prova",
    },
    {
      id: 3,
      title: "Consigli: i tuoi affari in sicurezza",
      link: "https://info.subito.it/profilo-sicuro.htm#consigli",
      image: "/images/subitocard3.png",
      description: "Scopri di più",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fc",
        py: 2,
        px: 3,
        borderRadius: 10,
        my: 2,
        width: "90vw",
        maxWidth: '980px', // Restrict content to 980px

      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "left" }}
      >
        Diventa un utente esperto
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        sx={{
          flexWrap: { xs: "nowrap", sm: "nowrap" },
          overflowX: { xs: "auto", sm: "auto", md: "hidden" },
        }}
      >
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={card.id}
            sx={{
              py: 2,
              flexShrink: 0,
              minWidth: { xs: "60%", sm: "35%", md: "auto" },
              maxWidth: { xs: "60%", sm: "35%", md: "auto" },
            }}
          >
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardActionArea
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  height="auto"
                  width="auto"
                  image={card.image}
                  alt={card.title}
                  sx={{ borderRadius: "8px 8px 0 0" }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="error">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(UserTips);
