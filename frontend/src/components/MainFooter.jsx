import React from "react";
import { Box, Container, Typography, Stack, Link } from "@mui/material";

function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2A2A2A",
        color: "#F7F7F7",
        py: 2,
        px: 2,
        mt: "auto", // pushes footer to bottom in flex layouts
      }}
    >
      <Container>
        <Stack
          direction="column"
          spacing={1.5}
          alignItems="center"
          textAlign="center"
        >
          {/* Copyright */}
          <Typography variant="body2" sx={{ color: "#BDBDBD" }}>
            All rights reserved
          </Typography>

          {/* Quick Links */}
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
