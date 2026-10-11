// src/components/cards/MaintenanceRequestsCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { useNavigate } from "react-router-dom";

// Sample maintenance requests matching the mockup layout
const maintenanceData = [
  {
    id: 1,
    status: "New",
    contractor: "Caretaker / Contractor",
    unit: "Unit B2",
    issue: "Plumbing Leak",
    urgency: "Urgent",
  },
  {
    id: 2,
    status: "In Progress",
    contractor: "Caretaker / Contractor",
    unit: "Unit B2",
    issue: "Plumbing Leak",
    urgency: "Urgent",
  },
  {
    id: 3,
    status: "Resolved",
    contractor: "Caretaker / Contractor",
    unit: "Unit B2",
    issue: "Plumbing Leak",
    urgency: "Urgent",
  },
  {
    id: 4,
    status: "In Progress",
    contractor: "Caretaker / Contractor",
    unit: "Unit A4",
    issue: "Electrical Fitting",
    urgency: "Medium",
  },
  {
    id: 5,
    status: "New",
    contractor: "Caretaker / Contractor",
    unit: "Unit C1",
    issue: "Broken Window Latch",
    urgency: "Low",
  },
];

function MaintenanceRequestsCard() {
  const navigate = useNavigate();
  const theme = useTheme();

  const hasRequests = maintenanceData && maintenanceData.length > 0;
  
  // 🌟 Cap display at 3 requests maximum for the dashboard overview
  const displayedRequests = maintenanceData ? maintenanceData.slice(0, 3) : [];

  // Helper to resolve status pill styles
  const getStatusChipStyles = (status) => {
    switch (status) {
      case "New":
        return {
          bgcolor: "#E2E8F0",
          color: "#475569",
        };
      case "In Progress":
        return {
          bgcolor: "#FEF3C7", // Soft warm yellow
          color: "#D97706",
        };
      case "Resolved":
        return {
          bgcolor: "#D1FAE5", // Soft mint green
          color: "#059669",
        };
      default:
        return {
          bgcolor: "#F1F5F9",
          color: "#64748B",
        };
    }
  };

  // Helper to resolve urgency pill styles
  const getUrgencyChipStyles = (urgency) => {
    switch (urgency) {
      case "Urgent":
        return {
          bgcolor: "#FEE2E2", // Light crimson pill background
          color: "#DC2626",
        };
      case "Medium":
        return {
          bgcolor: "#FEF3C7",
          color: "#D97706",
        };
      default:
        return {
          bgcolor: "#F1F5F9",
          color: "#475569",
        };
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        height: "75%",
        width: "100%",

        // Pronounced Obsidian Depth Shadow
        boxShadow:
          "0 15px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -8px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "secondary.main",
          boxShadow:
            "0 25px 40px -10px rgba(15, 23, 42, 0.18), 0 12px 18px -6px rgba(15, 23, 42, 0.1)",
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* HEADER */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "primary.main", lineHeight: 1.2 }}
          >
            Open Maintenance Requests
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Prioritized list at central location
          </Typography>
        </Box>

        {/* CONTENT AREA: 4-COLUMN TABLE OR EMPTY STATE */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {hasRequests ? (
            <Table sx={{ minWidth: 320, mt: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      pl: 0,
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Ticket Status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Assigned / Contractor
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Unit
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      pr: 0,
                      py: 1,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Urgency
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* 🌟 Map only the sliced top 3 items */}
                {displayedRequests.map((req) => {
                  const statusStyles = getStatusChipStyles(req.status);
                  const urgencyStyles = getUrgencyChipStyles(req.urgency);

                  return (
                    <TableRow
                      key={req.id}
                      sx={{
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* Column 1: Ticket Status Pill */}
                      <TableCell sx={{ pl: 0, py: 1.5 }}>
                        <Chip
                          label={req.status}
                          size="small"
                          sx={{
                            ...statusStyles,
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            borderRadius: "8px",
                            height: 24,
                            px: 0.5,
                          }}
                        />
                      </TableCell>

                      {/* Column 2: Assigned / Contractor */}
                      <TableCell
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          color: "primary.main",
                          fontSize: "0.82rem",
                        }}
                      >
                        {req.contractor}
                      </TableCell>

                      {/* Column 3: Unit */}
                      <TableCell
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          color: "primary.main",
                          fontSize: "0.82rem",
                        }}
                      >
                        {req.unit}
                      </TableCell>

                      {/* Column 4: Issue & Urgency Pill */}
                      <TableCell align="right" sx={{ pr: 0, py: 1.5 }}>
                        <Chip
                          label={`${req.issue} - ${req.urgency}`}
                          size="small"
                          sx={{
                            ...urgencyStyles,
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            borderRadius: "10px",
                            height: 24,
                            px: 0.5,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            /* ELEGANT EMPTY STATE */
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  bgcolor: "rgba(212, 175, 55, 0.12)",
                  color: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <HandymanOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, color: "primary.main", mb: 0.5 }}
              >
                No Pending Maintenance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 280, mb: 2, fontSize: "0.82rem" }}
              >
                All maintenance tickets have been resolved across your units.
              </Typography>
            </Box>
          )}
        </Box>

        {/* FOOTER VIEW ALL ACTION */}
        {hasRequests && (
          <Box
            sx={{
              mt: "auto",
              pt: 1.5,
              borderTop: "1px solid #F1F5F9",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              onClick={() => navigate("/landlord/maintenance-requests")}
              sx={{
                fontWeight: 700,
                fontSize: "0.82rem",
                color: "primary.main",
                textTransform: "none",
                "&:hover": {
                  color: "secondary.main",
                  bgcolor: "transparent",
                },
              }}
            >
              {maintenanceData.length > 3
                ? `View All (${maintenanceData.length}) Requests`
                : "View All Requests"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequestsCard;