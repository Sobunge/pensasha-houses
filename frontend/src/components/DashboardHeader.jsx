// src/components/DashboardHeader.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const DashboardHeader = React.memo(function DashboardHeader({
  title = "My Dashboard",
}) {
  return (
    <Box sx={{ mb: 2 }}>
      {/* Page Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          wordBreak: "break-word",
          textAlign: { xs: "center", sm: "left" }, // responsive alignment
          color: "#0F172A",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
});

export default DashboardHeader;