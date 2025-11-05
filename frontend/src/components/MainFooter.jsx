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
        bgcolor: "rgba(0, 0, 0, 0.6)", // black background with 60% opacity
        color: "#fff", // solid white text
        textAlign: "center",
        py: 1,
        px: 1,
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.3)",
        zIndex: 1200,
        fontSize: "0.75rem",
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "inherit" }}>
        © {new Date().getFullYear()} Pensasha Houses. All rights reserved.
      </Typography>
    </Box>
  );
}

export default MainFooter;
