// src/components/ActivityLog.jsx
import React from "react";
import { Box, Typography, Paper, Stack, Chip } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongOutlined";
import ConstructionIcon from "@mui/icons-material/ConstructionOutlined";
import HistoryIcon from "@mui/icons-material/History";

const ActivityLog = ({ activities = [] }) => {
  return (
    <Box>
      {/* Title with Gold Header Icon */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(212, 175, 55, 0.12)",
            color: "#D4AF37",
          }}
        >
          <HistoryIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            fontSize: "1.125rem",
            letterSpacing: "-0.2px",
          }}
        >
          Recent Activity
        </Typography>
      </Box>

      {/* Main Container */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          boxShadow: "0px 4px 20px rgba(15, 23, 42, 0.03)",
        }}
      >
        {activities.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              No recent activity recorded.
            </Typography>
          </Box>
        ) : (
          activities.map((item, index) => {
            const isMaintenance = item.type === "Maintenance";

            return (
              <Box
                key={index}
                sx={{
                  p: 2.25,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom:
                    index !== activities.length - 1 ? "1px solid #E2E8F0" : "none",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "rgba(212, 175, 55, 0.04)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Icon Badge */}
                  <Box
                    sx={{
                      p: 1.25,
                      borderRadius: "10px",
                      bgcolor: isMaintenance
                        ? "rgba(15, 23, 42, 0.06)"
                        : "rgba(212, 175, 55, 0.12)",
                      color: isMaintenance ? "#0F172A" : "#D4AF37",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isMaintenance ? (
                      <ConstructionIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <ReceiptLongIcon sx={{ fontSize: 20 }} />
                    )}
                  </Box>

                  {/* Activity Details */}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: "#0F172A",
                        fontSize: "0.875rem",
                      }}
                    >
                      {item.task}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#64748B", fontSize: "0.75rem" }}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                </Stack>

                {/* Category Chip */}
                <Chip
                  label={item.type}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    bgcolor: isMaintenance
                      ? "rgba(15, 23, 42, 0.08)"
                      : "rgba(212, 175, 55, 0.15)",
                    color: isMaintenance ? "#0F172A" : "#D4AF37",
                    border: "1px solid",
                    borderColor: isMaintenance
                      ? "rgba(15, 23, 42, 0.15)"
                      : "rgba(212, 175, 55, 0.3)",
                  }}
                />
              </Box>
            );
          })
        )}
      </Paper>
    </Box>
  );
};

export default ActivityLog;