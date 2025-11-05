import React from "react";
import { Box, Typography } from "@mui/material";

function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "rgba(0, 0, 0, 0.75)", // darker semi-transparent black
        color: "#fff",
        textAlign: "center",
        py: 1.2,
        px: 2,
        boxShadow: "0 -3px 8px rgba(0, 0, 0, 0.4)",
        zIndex: 1200,
        fontSize: "0.8rem",
        backdropFilter: "blur(6px)", // subtle glassy effect
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: "inherit",
          letterSpacing: "0.3px",
          opacity: 0.9,
        }}
      >
        © {new Date().getFullYear()} <strong>Pensasha Houses</strong>. All rights reserved.
      </Typography>
    </Box>
  );
}

export default MainFooter;
