// src/components/DashboardHeader.jsx
import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const DashboardHeader = React.memo(function DashboardHeader({
  title = "My Dashboard",
  subtitle,
  action,
}) {
  return (
    <Box
      sx={{
        pb: subtitle || action ? 2 : 1.5,
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
        position: "relative",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "flex-end", md: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        {/* Title & Subtitle Section */}
        <Box
          sx={{
            textAlign: { xs: "center", sm: "left", md: "center" },
            flex: 1,
            position: "relative",
          }}
        >
          {/* Gold Accent Bar */}
          <Box
            sx={{
              width: 36,
              height: 3,
              borderRadius: "2px",
              background: "linear-gradient(90deg, #D4AF37 0%, #0F172A 100%)",
              mb: 1,
              mx: { xs: "auto", sm: 0, md: "auto" },
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#0F172A",
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              lineHeight: 1.2,
              wordBreak: "break-word",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Optional Header Actions Slot (Buttons, Date Selectors, Filters) */}
        {action && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-end" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {action}
          </Box>
        )}
      </Stack>
    </Box>
  );
});

export default DashboardHeader;