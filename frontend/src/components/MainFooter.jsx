import React from "react";
import { Box, Typography } from "@mui/material";

const COLORS = {
  lightText: "#F7F7F7",
};

function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "rgba(42, 42, 42, 0.9)", // semi-transparent dark
        color: COLORS.lightText,
        textAlign: "center",
        py: { xs: 2, md: 3 }, // slimmer padding
        px: 2,
        fontSize: { xs: "0.7rem", md: "0.8rem" },
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          letterSpacing: "0.3px",
          opacity: 0.85,
        }}
      >
        © {new Date().getFullYear()} <strong>Pensasha Houses</strong>. All rights reserved.
      </Typography>
    </Box>
  );
}

export default MainFooter;
