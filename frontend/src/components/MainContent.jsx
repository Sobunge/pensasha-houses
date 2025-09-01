import React from "react";
import { Box, Container } from "@mui/material";

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        mt: { xs: "56px", md: "64px" }, // account for fixed navbar
        mb: "64px", // optional bottom spacing for footer
        backgroundColor: "#f9f9f9",
        py: 3,
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
}

export default MainContent;
