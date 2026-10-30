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
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: `${theme.shape.borderRadius}px`,
            bgcolor: `${theme.palette.secondary.main}1F`, // ~12% gold fill
            color: theme.palette.secondary.main,
          })}
        >
          <HistoryIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="h6"
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "1.125rem",
            letterSpacing: "-0.2px",
          })}
        >
          Recent Activity
        </Typography>
      </Box>

      {/* Main Container */}
      <Paper
        elevation={0}
        sx={(theme) => ({
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: `0px 4px 20px ${theme.palette.primary.main}08`,
        })}
      >
        {activities.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
              No recent activity recorded.
            </Typography>
          </Box>
        ) : (
          activities.map((item, index) => {
            const isMaintenance = item.type === "Maintenance";

            return (
              <Box
                key={index}
                sx={(theme) => ({
                  p: 2.25,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom:
                    index !== activities.length - 1 ? `1px solid ${theme.palette.divider}` : "none",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: `${theme.palette.secondary.main}0A`, // ~4% gold hover
                  },
                })}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Icon Badge */}
                  <Box
                    sx={(theme) => ({
                      p: 1.25,
                      borderRadius: `${theme.shape.borderRadius}px`,
                      bgcolor: isMaintenance
                        ? `${theme.palette.primary.main}0F`
                        : `${theme.palette.secondary.main}1F`,
                      color: isMaintenance ? theme.palette.primary.main : theme.palette.secondary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    })}
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
                      sx={(theme) => ({
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontSize: "0.875rem",
                      })}
                    >
                      {item.task}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "0.75rem" })}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                </Stack>

                {/* Category Chip */}
                <Chip
                  label={item.type}
                  size="small"
                  sx={(theme) => ({
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    bgcolor: isMaintenance
                      ? `${theme.palette.primary.main}14`
                      : `${theme.palette.secondary.main}26`,
                    color: isMaintenance ? theme.palette.primary.main : theme.palette.secondary.main,
                    border: "1px solid",
                    borderColor: isMaintenance
                      ? `${theme.palette.primary.main}26`
                      : `${theme.palette.secondary.main}4D`,
                  })}
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