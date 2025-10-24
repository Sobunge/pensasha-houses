import React from "react";
import { Box, Typography, Link } from "@mui/material";

function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "#2A2A2A", // black background
        color: "#fff",
        textAlign: "center",
        py: 1.5,
        boxShadow: "0 -2px 5px rgba(0,0,0,0.3)",
        zIndex: 1200,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Pensasha Houses. All rights reserved. |{" "}
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "#fff",
            fontWeight: 500,
            transition: "color 0.2s",
            "&:hover": { color: "#f8b500" }, // gold hover
          }}
        >
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
}

export default MainFooter;
