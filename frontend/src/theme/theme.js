// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8FAFC", // Light slate background
      paper: "#FFFFFF",   // Crisp white card surface
    },
    primary: {
      main: "#0F172A",    // Deep obsidian for primary contrast
      light: "#334155",
      dark: "#020617",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D4AF37",    // Champagne / Mustard gold accent
    },
    text: {
      primary: "#0F172A", // Deep slate text
      secondary: "#64748B", // Medium muted slate
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h5: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h6: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;