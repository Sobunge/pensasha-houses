// src/components/UserFooter.jsx
import React from "react";
import { Box, Container, Stack, Link } from "@mui/material";

function UserFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#F7F7F7",
        color: "#222",
        py: 2,
        px: 2,
        flexShrink: 0, // keeps it at bottom
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container>
        <Stack direction="column" spacing={1.5} alignItems="center" textAlign="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#222",
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
                color: "#222",
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

export default UserFooter;
