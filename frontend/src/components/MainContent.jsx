import React from "react";
import { Box, Container } from "@mui/material";

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        mt: "64px", // adjust according to AppBar height
        mb: "64px", // optional: add bottom spacing if needed above footer
        minHeight: "calc(100vh - 128px)", // ensures footer stays at bottom
        backgroundColor: "#f9f9f9", // optional background
        py: 3, // vertical padding
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

export default MainContent;
