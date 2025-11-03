import React from "react";
import { Box, Typography, Link, useMediaQuery, useTheme } from "@mui/material";

function MainFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "#2A2A2A",
        color: "#fff",
        textAlign: "center",
        py: { xs: 1, sm: 1.5 },
        px: 1,
        boxShadow: "0 -2px 5px rgba(0,0,0,0.3)",
        zIndex: 1200,
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
      }}
    >
      {isMobile ? (
        <Typography variant="body2">
          © {new Date().getFullYear()} Pensasha Houses. All rights reserved.
        </Typography>
      ) : (
        <Typography variant="body2">
          © {new Date().getFullYear()} Pensasha Houses. All rights reserved. |{" "}
          <Link
            href="#"
            underline="hover"
            sx={{
              color: "#fff",
              fontWeight: 500,
              transition: "color 0.2s",
              "&:hover": { color: "#f8b500" },
            }}
          >
            Privacy Policy
          </Link>
        </Typography>
      )}
    </Box>
  );
}

export default MainFooter;
