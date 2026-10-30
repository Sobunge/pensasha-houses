// src/components/UserFooter.jsx
import React from "react";
import { Box, Container, Stack, Link as MuiLink, Typography } from "@mui/material";

function UserFooter() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        py: 2.5,
        px: 2,
        flexShrink: 0, // Keeps it fixed at bottom of layout
        borderTop: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
        >
          {/* Copyright Note */}
          <Typography
            variant="caption"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              fontWeight: 500,
              fontSize: "0.8rem",
            })}
          >
            © {new Date().getFullYear()} <strong>Pensasha Houses</strong>. All rights reserved.
          </Typography>

          {/* Legal Links */}
          <Stack direction="row" spacing={2.5} justifyContent="center">
            <MuiLink
              href="#"
              underline="none"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "color 0.2s ease",
                "&:hover": {
                  color: theme.palette.secondary.main,
                  textDecoration: "underline",
                },
              })}
            >
              Privacy Policy
            </MuiLink>

            <MuiLink
              href="#"
              underline="none"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "color 0.2s ease",
                "&:hover": {
                  color: theme.palette.secondary.main,
                  textDecoration: "underline",
                },
              })}
            >
              Terms of Service
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default UserFooter;