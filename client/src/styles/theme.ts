//src/Styles/theme.ts
import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
    typography: {
      fontFamily: [
        "SF Pro Display",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Public Sans"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    palette: {
      background: {
        default: "#fff",
        paper: "#ffffff",
      },
    },
  });