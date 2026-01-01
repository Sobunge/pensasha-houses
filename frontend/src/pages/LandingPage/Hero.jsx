import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import backgroundImage from "../../assets/background.jpg";

const COLORS = { primary: "#F8B500", primaryDark: "#c59000", dark: "#111" };

function Hero() {
  const navbarHeightDesktop = 64; // desktop navbar height
  const navbarHeightMobile = 56;  // mobile navbar height

  return (
    <Box
      sx={{
        minHeight: {
          xs: `calc(100vh - ${navbarHeightMobile}px)`,
          md: `calc(100vh - ${navbarHeightDesktop}px)`,
        },
        mt: { xs: `${navbarHeightMobile}px`, md: `${navbarHeightDesktop}px` }, // push Hero below navbar
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)", // slightly darker overlay for better contrast
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
              fontSize: { xs: "2rem", md: "3.5rem" },
              lineHeight: 1.2,
              textShadow: "0 3px 12px rgba(0,0,0,0.6)", // subtle shadow for depth
            }}
          >
            Discover Your Next Home
          </Typography>

          {/* Subtitle with background highlight */}
          <Box
            sx={{
              px: { xs: 2, md: 3 },
              py: 1.5,
              borderRadius: 2,
              textAlign: "center",
              textShadow: "0 2px 6px rgba(0,0,0,0.5)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: 600,
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.6,
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
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: { xs: "0.95rem", md: "1rem" },
              "&:hover": { backgroundColor: COLORS.primaryDark },
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)", // subtle button shadow
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
