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
      sx={(theme) => ({
        pb: subtitle || action ? 2 : 1.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: "relative",
      })}
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
            sx={(theme) => ({
              width: 36,
              height: 3,
              borderRadius: "2px",
              background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
              mb: 1,
              mx: { xs: "auto", sm: 0, md: "auto" },
            })}
          />

          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: theme.palette.text.primary,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              lineHeight: 1.2,
              wordBreak: "break-word",
            })}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                mt: 0.5,
              })}
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