import React from "react";
import { Box, Container } from "@mui/material";

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        mt: { xs: "56px", md: "64px" }, // Account for fixed navbar
        mb: "64px", // Bottom spacing for footer
        backgroundColor: theme.palette.background.default,
        py: 3,
      })}
    >
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
}

export default MainContent;