import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import backgroundImage from "../../assets/background.jpg";

const COLORS = { primary: "#F8B500", primaryDark: "#c59000", dark: "#111" };

function Hero() {
  return (
    <Box
      sx={{
        /* 1. HEIGHT: We use minHeight: "85vh" to make it feel full-screen 
           while leaving a "peek" of the content below to encourage scrolling.
        */
        minHeight: "92vh", 
        
        /* 2. CENTERING: Flexbox handles the vertical and horizontal 
           alignment of your text and buttons.
        */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        /* 3. BACKGROUND: Clean integration using the imported image.
        */
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",

        /* NOTE: No 'mt' (margin-top) needed here anymore! 
           AppLayout.jsx handles the 64px offset.
        */
      }}
    >
      {/* Overlay: Darks the photo so text is readable */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: 0,
        }}
      />

      {/* Hero Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={3} alignItems="center">
          {/* Main Heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.2,
              textShadow: "0 3px 12px rgba(0,0,0,0.6)",
            }}
          >
            Discover Your Next Home
          </Typography>

          {/* Subtitle */}
          <Box sx={{ px: { xs: 2, md: 3 }, py: 1.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: 600,
                fontSize: { xs: "1.05rem", md: "1.25rem" },
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.6,
                textShadow: "0 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              Pensasha connects tenants with their dream homes, helps landlords find
              the right clients, and simplifies property management — all in one
              seamless platform.
            </Typography>
          </Box>

          {/* CTA Button */}
          <Button
            component={RouterLink}
            to="/properties"
            startIcon={<SearchIcon />}
            variant="contained"
            sx={{
              backgroundColor: COLORS.primary,
              color: COLORS.dark,
              fontWeight: 700,
              px: 5,
              py: 1.8,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              transition: "0.3s ease",
              "&:hover": { 
                backgroundColor: COLORS.primaryDark,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 25px rgba(248,181,0,0.4)",
              },
            }}
          >
            Browse Properties
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Hero;