import React from "react";
import { Box, Container } from "@mui/material";

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "81.11vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 6,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
}

export default MainContent;
