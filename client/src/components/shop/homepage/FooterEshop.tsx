import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";

const FooterEshop: React.FC = () => {
  const subitoLinks = [
    { label: "Assistenza", url: "https://assistenza.subito.it/hc/it/" },
    {
      label: "Regole",
      url: "https://assistenza.subito.it/hc/it/sections/10743588495133-Regole-di-pubblicazione",
    },
    {
      label: "Sicurezza",
      url: "https://assistenza.subito.it/hc/it/categories/10743145756317-Sicurezza",
    },
    { label: "Condizioni", url: "https://info.subito.it/policies/condizioni-generali.htm" },
    { label: "Privacy", url: "https://info.subito.it/policies/privacy.htm" },
    { label: "Gestisci cookies" },
    { label: "TuttoSubito Vendi", url: "https://info.subito.it/affariadistanza/#vendi" },
    { label: "TuttoSubito Compra", url: "https://info.subito.it/affariadistanza/#compra" },
    { label: "Servizio TuttoSubito", url: "https://info.subito.it/policies/tutto-subito.htm" },
    {
      label: "Servizio TuttoSubito per Professionisti",
      url: "https://info.subito.it/policies/tutto-subito-per-professionisti.htm",
    },
    { label: "Inserisci annuncio" },
    { label: "Promuovi annuncio", url: "https://info.subito.it/policies/condizioni-promuovi.htm" },
    { label: "Consigli per la vendita", url: "https://info.subito.it/per-i-privati.htm" },
    { label: "Negozi e Aziende", url: "https://impresapiu.subito.it//shops?xtfrom=footer_menu" },
    { label: "Subito per le aziende", url: "https://aziende.subito.it/" },
    { label: "Chi siamo", url: "https://info.subito.it/about.htm" },
    { label: "Lavora con noi", url: "https://info.subito.it/lavora-con-noi.htm" },
    { label: "Sostenibilità", url: "https://www.subito.it/magazine/green/" },
    { label: "Magazine", url: "https://www.subito.it/magazine/" },
    {
      label: "Vivi lo Sport con Subito",
      url: "https://info.subito.it/in-campo-con-le-tue-passioni-sportive.htm",
    },
    { label: "Idee regalo", url: "https://info.subito.it/idearegalo.htm" },
    { label: "InfoJobs", url: "https://www.infojobs.it/" },
    { label: "Mappa del sito", url: "https://www.subito.it/sitemaps/" },
  ];

  const socialLinks = [
    { label: "Facebook", icon: "/images/facebook.svg", url: "https://it-it.facebook.com/subitoit" },
    { label: "TikTok", icon: "/images/tiktok.svg", url: "https://www.tiktok.com/@subito_it" },
    { label: "Instagram", icon: "/images/instagram.svg", url: "https://www.instagram.com/subito_it/" },
    { label: "YouTube", icon: "/images/youtube.svg", url: "https://www.youtube.it/user/subitoit" },
  ];

  const appLinks = [
    {
      label: "Subito per Android",
      icon: "/images/android.svg",
      url: "https://play.google.com/store/apps/details?id=it.subito&referrer=utm_source%3Dsite%26utm_medium%3Dfooter",
    },
    {
      label: "Subito per iOS",
      icon: "/images/apple.svg",
      url: "https://itunes.apple.com/it/app/subito.it/id450775137?mt=8",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f8f9fc", py: 4, px: 2, my: 2, borderRadius: 10,         maxWidth: '980px', // Restrict content to 980px
    }}>
      <Grid container spacing={4} sx={{ width: "90vw", mx: "auto",         maxWidth: '980px', // Restrict content to 980px
 }}>
        {/* Subito Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Subito
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {subitoLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.url || "#"}
                target={link.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                sx={{
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  color: "#333",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Seguici Su Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Seguici su
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {socialLinks.map((social, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    p: 0,
                    width: 24,
                    height: 24,
                  }}
                >
                  <img src={social.icon} alt={social.label} width="24" height="24" />
                </IconButton>
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {social.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Scarica Gratis L'App Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Scarica gratis l'App
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {appLinks.map((app, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  component="a"
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    p: 0,
                    width: 24,
                    height: 24,
                  }}
                >
                  <img src={app.icon} alt={app.label} width="24" height="24" />
                </IconButton>
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {app.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Footer Logo */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <img src="/images/subito-footer.svg" alt="Subito Logo" style={{ height: "40px" }} />
        <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
          © 2024 Subito.it - P.IVA 05526340962
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(FooterEshop);
