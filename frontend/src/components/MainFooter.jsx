import React from "react";
import { Box, Container, Stack, Link } from "@mui/material";

function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2A2A2A",
        color: "#F7F7F7",
        py: 1,
        px: 2,
        position: "fixed", // make it always visible
        bottom: 0,
        left: { xs: 0, md: 280 }, // accounts for sidebar width on desktop
        right: 0,
        zIndex: 1200,
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container>
        <Stack
          direction="column"
          spacing={1.5}
          alignItems="center"
          textAlign="center"
        >
          <Stack direction="row" spacing={2} justifyContent="center">
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#E0E0E0",
                fontSize: "0.85rem",
                transition: "color 0.2s",
                "&:hover": { color: "#f8b500" },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#E0E0E0",
                fontSize: "0.85rem",
                transition: "color 0.2s",
                "&:hover": { color: "#f8b500" },
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default MainFooter;
