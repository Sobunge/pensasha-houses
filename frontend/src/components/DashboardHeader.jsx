import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useAuth } from "../pages/Auth/AuthContext";

function DashboardHeader({ title = "My Dashboard", breadcrumbs = [] }) {
  const { user } = useAuth();

  // Detect if we're on the dashboard page
  const onDashboard =
    breadcrumbs.length === 0 && window.location.pathname === `/${user.role}`;

  return (
    <Box sx={{ mb: 2 }}>
      {/* Breadcrumbs (Left-aligned) */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
      >
        {/* Home link */}
        {onDashboard ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.primary" }}>
            <HomeIcon fontSize="small" /> Home
          </Box>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            href={`/${user.role}`}
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <HomeIcon fontSize="small" /> Home
          </Link>
        )}

        {/* Dynamic breadcrumbs */}
        {breadcrumbs.map((item, index) =>
          index === breadcrumbs.length - 1 ? (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          ) : (
            <Link key={index} underline="hover" color="inherit" href={item.href}>
              {item.label}
            </Link>
          )
        )}
      </Breadcrumbs>

      {/* Page Title (Centered) */}
      <Typography variant="h5" fontWeight={700} align="center">
        {title}
      </Typography>
    </Box>
  );
}

export default DashboardHeader;
