import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

const QuickSearch: React.FC = () => {
  const categories = [
    {
      title: "MOTORI",
      color: "#2650ff",
      links: [
        "Auto usate",
        "Moto usate",
        "Auto elettriche usate",
        "Auto ibride usate",
        "Auto diesel usate",
        "Ford",
        "Mercedes",
        "Opel",
        "Alfa Romeo",
        "Jeep",
        "Hyundai",
        "Toyota",
        "Ducati",
        "Harley Davidson",
        "Honda",
        "Kawasaki",
        "KTM",
        "Piaggio",
        "Suzuki",
        "Aprilia",
      ],
      brands: [
        {
          brand: "Fiat",
          models: [
            "Fiat 500",
            "Fiat Panda",
            "Fiat Doblo",
            "Fiat Punto",
            "Fiat 600",
            "Fiat Tipo",
            "Fiat 500L",
            "Fiat Panda 4x4",
            "Fiat Scudo",
            "Fiat Ducato",
          ],
        },
        {
          brand: "Renault",
          models: [
            "Renault Captur",
            "Renault Clio",
            "Renault Kadjar",
            "Renault Trafic",
            "Renault Twingo",
            "Renault Kangoo",
            "Renault Scenic",
            "Renault Megane",
            "Renault Zoe",
          ],
        },
        {
          brand: "Peugeot",
          models: [
            "Peugeot 3008",
            "Peugeot 208",
            "Peugeot 2008",
            "Peugeot 308",
            "Peugeot 5008",
            "Peugeot Rifter",
            "Peugeot Partner",
            "Peugeot 207",
            "Peugeot Traveller",
          ],
        },
        {
          brand: "BMW",
          models: [
            "Bmw x1",
            "Bmw serie 1",
            "Bmw x3",
            "Bmw Motorrad",
            "Bmw z4",
            "Bmw serie 3",
          ],
        },
        {
          brand: "Volkswagen",
          models: [
            "Volkswagen Polo",
            "Volkswagen Golf",
            "Volkswagen Tiguan",
            "Volkswagen California",
            "Volkswagen T roc",
          ],
        },
        {
          brand: "Audi",
          models: [
            "Audi A1",
            "Audi A3",
            "Audi Q3",
            "Audi TT",
            "Audi Q5",
            "Audi A6",
          ],
        },
      ],
    },
    {
      title: "MARKET",
      color: "#f2a700",
      links: [
        "Gatto",
        "Golden retriever",
        "Bulldog francese",
        "Cani",
        "Border collie",
        "Labrador",
        "Pitbull",
        "Bici pieghevole",
        "Bici elettrica pieghevole",
        "Bici da corsa usate",
        "Bicicletta pedalata assistita",
      ],
    },
    {
      title: "IMMOBILI",
      color: "#9924ff",
      links: [
        "Case in vendita",
        "Case in affitto",
        "Case in affitto Bolzano",
        "Affitto Roma",
        "Affitto Milano",
        "Case in vendita Genova",
      ],
    },
    {
      title: "LAVORO",
      color: "#07bb9c",
      links: [
        "Offerte di lavoro",
        "Stagione estiva",
        "Lavoro Roma",
        "Lavoro da casa",
        "Offerte lavoro Torino",
        "Lavoro Milano",
        "Lavoro Palermo",
        "Offerte lavoro Bergamo",
        "Lavoro Bologna",
        "Lavoro Napoli",
        "Carrozziere",
        "Barista",
        "Stage Torino",
      ],
    },
  ];

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        backgroundColor: "#f8f9fc",
        borderRadius: 10,
        width: "90vw",
        maxWidth: '980px', // Restrict content to 980px

        mx: "auto",
        my: 2
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Scopri di più
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category, index) => (
          <Grid item xs={12} key={index}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: category.color,
                mb: 1,
              }}
            >
              {category.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {category.links && (
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#333",
                    lineHeight: 1.8,
                  }}
                >
                  {category.links.map((link, idx) => (
                    <React.Fragment key={idx}>
                      <Link
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {link}
                      </Link>
                      {idx < category.links.length - 1 && " - "}
                    </React.Fragment>
                  ))}
                </Typography>
              )}
              {category.brands &&
                category.brands.map((brand, idx) => (
                  <Box key={idx}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      {brand.brand}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        
                        gap: 0.5,
                      }}
                    >
                      {brand.models.map((model, idx) => (
                        <React.Fragment key={idx}>
                          <Link
                            sx={{
                              textDecoration: "none",
                              fontSize: "0.9rem",
                              color: "inherit",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {model}
                          </Link>
                          {idx < brand.models.length - 1 && " - "}
                        </React.Fragment>
                      ))}
                    </Box>
                  </Box>
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(QuickSearch);
