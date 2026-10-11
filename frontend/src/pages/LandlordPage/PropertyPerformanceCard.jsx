// src/components/cards/PropertyPerformanceCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

// Sample properties data matching the mockup (Set to [] to test empty state)
const propertyData = [
  { id: 1, name: "Sunrise Apartments", units: 12, occupied: 10, revenue: "Ksh 120,000" },
  { id: 2, name: "Pensasha Towers", units: 20, occupied: 18, revenue: "Ksh 35,000" },
  { id: 3, name: "Sunrise Houses", units: 12, occupied: 10, revenue: "Ksh 20,000" },
  { id: 4, name: "Pensasha Residency", units: 20, occupied: 17, revenue: "Ksh 20,000" },
];

function PropertyPerformanceCard() {
  const navigate = useNavigate();
  const theme = useTheme();

  const getOccupancyColor = (rate) => {
    if (rate >= 80) return "#10B981"; // Emerald Green
    if (rate >= 50) return "#D4AF37"; // Champagne Gold
    return "#EF4444"; // Crimson
  };

  const hasProperties = propertyData && propertyData.length > 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
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
            Properties Performance
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Occupancy levels & revenue breakdown per estate
          </Typography>
        </Box>

        {/* CONTENT AREA: TABLE OR EMPTY STATE */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {hasProperties ? (
            <Table sx={{ minWidth: 300, mt: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      pl: 0,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Property
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Occupancy
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      pr: 0,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    Revenue
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propertyData.map((property) => {
                  const occupancyRate = Math.round(
                    (property.occupied / property.units) * 100
                  );
                  const progressColor = getOccupancyColor(occupancyRate);

                  return (
                    <TableRow
                      key={property.id}
                      sx={{
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          pl: 0,
                          py: 1.5,
                          fontWeight: 700,
                          color: "primary.main",
                          fontSize: "0.85rem",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <HomeWorkOutlinedIcon
                            fontSize="small"
                            sx={{ color: "secondary.main" }}
                          />
                          <Typography variant="body2" fontWeight={700} noWrap>
                            {property.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ py: 1.5, minWidth: 120 }}>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color="text.primary"
                          sx={{ display: "block", mb: 0.5 }}
                        >
                          {occupancyRate}% Occupied
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={occupancyRate}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#E2E8F0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: progressColor,
                              borderRadius: 3,
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          pr: 0,
                          py: 1.5,
                          fontWeight: 800,
                          color: "primary.main",
                          fontSize: "0.88rem",
                        }}
                      >
                        {property.revenue}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            /* 🌟 ELEGANT EMPTY STATE */
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  bgcolor: "rgba(212, 175, 55, 0.12)", // Light Champagne Gold tint
                  color: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <HomeWorkOutlinedIcon sx={{ fontSize: 32 }} />
              </Box>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, color: "primary.main", mb: 0.5 }}
              >
                No Properties Found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 280, mb: 2, fontSize: "0.82rem" }}
              >
                You haven't registered any properties yet. Add an estate or unit to track occupancy and revenue.
              </Typography>

              <Button
                variant="contained"
                size="small"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => navigate("/landlord/properties/new")}
                sx={{
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  fontWeight: 700,
                  px: 2.5,
                  py: 0.8,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "0.82rem",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                  "&:hover": {
                    bgcolor: "#1E293B",
                  },
                }}
              >
                Add Your First Property
              </Button>
            </Box>
          )}
        </Box>

        {/* FOOTER VIEW ALL ACTION (Rendered only when properties exist) */}
        {hasProperties && (
          <Box
            sx={{
              borderTop: "1px solid #F1F5F9",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              onClick={() => navigate("/landlord/properties")}
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
              View All Properties
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PropertyPerformanceCard;