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
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";

import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useNavigate } from "react-router-dom";
import { usePropertyPerformance } from "../../components/hooks/landlord/usePropertyPerformance";

function PropertyPerformanceCard({ userId }) {
  const navigate = useNavigate();
  const theme = useTheme();

  // Use the compact property layout on mobile.
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch live performance data using TanStack Query
  const { data: propertyData = [], isLoading, isError, error } = usePropertyPerformance(userId);

  // Limit to top 3 items here
  const displayedProperties = propertyData.slice(0, 3);
  const hasProperties = displayedProperties.length > 0;

  const getOccupancyColor = (rate) => {
    if (rate >= 80) return "#10B981";
    if (rate >= 50) return "#D4AF37";
    return "#EF4444";
  };

  const handleViewAll = () => {
    navigate("/landlord/properties");
  };

  const handleAddProperty = () => {
    navigate("/landlord/properties/new");
  };

  // Loading Skeleton State
  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          bgcolor: "#FFFFFF",
        }}
      >
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width="100%" height={180} sx={{ borderRadius: 2 }} />
      </Card>
    );
  }

  // Error State
  if (isError) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          bgcolor: "#FFFFFF",
        }}
      >
        <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>
          {error?.message || "Failed to load property performance data."}
        </Alert>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minWidth: 0,
        height: "auto",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        boxShadow:
          "0 15px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -8px rgba(15, 23, 42, 0.06)",
        transition:
          "border-color 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          borderColor: "secondary.main",
          boxShadow:
            "0 25px 40px -10px rgba(15, 23, 42, 0.18), 0 12px 18px -6px rgba(15, 23, 42, 0.1)",
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, sm: 2.5, md: 3 },
          "&:last-child": {
            pb: { xs: 2, sm: 2.5, md: 3 },
          },
        }}
      >
        {/* HEADER */}
        <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.2rem",
              },
              lineHeight: 1.35,
            }}
          >
            Properties Performance
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              lineHeight: 1.5,
            }}
          >
            Occupancy levels and revenue by property
          </Typography>
        </Box>

        {/* PROPERTY CONTENT */}
        {hasProperties ? (
          <>
            {/* MOBILE LAYOUT */}
            {isMobile ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                {displayedProperties.map((property, index) => {
                  const totalUnits = property.units || 1;
                  const occupiedUnits = property.occupied || 0;
                  const occupancyRate = Math.round(
                    (occupiedUnits / totalUnits) * 100
                  );

                  const progressColor =
                    getOccupancyColor(occupancyRate);
                  
                  const formattedRevenue = property.revenue
                    ? `KSh ${Number(property.revenue).toLocaleString()}`
                    : "KSh 0";

                  return (
                    <Box
                      key={property.id}
                      sx={{
                        py: 1.75,
                        minWidth: 0,
                        borderBottom:
                          index !== displayedProperties.length - 1
                            ? "1px solid #E2E8F0"
                            : "none",
                      }}
                    >
                      {/* Property name and revenue */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: 1.5,
                          mb: 1.5,
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <HomeWorkOutlinedIcon
                            sx={{
                              fontSize: 20,
                              color: "secondary.main",
                              flexShrink: 0,
                              mt: 0.15,
                            }}
                          />

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: "primary.main",
                              fontSize: "0.82rem",
                              lineHeight: 1.45,
                              overflowWrap: "anywhere",
                              minWidth: 0,
                            }}
                          >
                            {property.name}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 800,
                            color: "primary.main",
                            fontSize: "0.78rem",
                            lineHeight: 1.45,
                            textAlign: "right",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formattedRevenue}
                        </Typography>
                      </Box>

                      {/* Occupancy details */}
                      <Box sx={{ pl: 3.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                            mb: 0.75,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontSize: "0.72rem",
                              fontWeight: 500,
                            }}
                          >
                            {occupiedUnits} of {totalUnits} units
                            occupied
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: progressColor,
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              flexShrink: 0,
                            }}
                          >
                            {occupancyRate}%
                          </Typography>
                        </Box>

                        <LinearProgress
                          variant="determinate"
                          value={occupancyRate}
                          aria-label={`${property.name} occupancy: ${occupancyRate}%`}
                          sx={{
                            height: 6,
                            borderRadius: 4,
                            bgcolor: "#E2E8F0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: progressColor,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              /* TABLET AND DESKTOP TABLE */
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                  overflowX: "auto",
                  flexGrow: 1,
                }}
              >
                <Table
                  size="small"
                  aria-label="Property performance"
                  sx={{
                    width: "100%",
                    tableLayout: "fixed",
                    "& th, & td": {
                      borderBottom: "1px solid #E2E8F0",
                    },
                    "& tr:last-child td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          width: "36%",
                          pl: 0,
                          py: 1.5,
                          color: "text.secondary",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      >
                        Property
                      </TableCell>

                      <TableCell
                        sx={{
                          width: "34%",
                          py: 1.5,
                          color: "text.secondary",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      >
                        Occupancy
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          width: "30%",
                          pr: 0,
                          py: 1.5,
                          color: "text.secondary",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      >
                        Revenue
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {displayedProperties.map((property) => {
                      const totalUnits = property.units || 1;
                      const occupiedUnits = property.occupied || 0;
                      const occupancyRate = Math.round(
                        (occupiedUnits / totalUnits) * 100
                      );

                      const progressColor =
                        getOccupancyColor(occupancyRate);
                      
                      const formattedRevenue = property.revenue
                        ? `KSh ${Number(property.revenue).toLocaleString()}`
                        : "KSh 0";

                      return (
                        <TableRow
                          key={property.id}
                          sx={{
                            transition: "background-color 0.15s ease",
                            "&:hover": {
                              bgcolor: alpha(
                                theme.palette.primary.main,
                                0.025
                              ),
                            },
                          }}
                        >
                          {/* Property name */}
                          <TableCell
                            sx={{
                              pl: 0,
                              py: 1.5,
                              pr: 1,
                              verticalAlign: "middle",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 1,
                                minWidth: 0,
                              }}
                            >
                              <HomeWorkOutlinedIcon
                                sx={{
                                  fontSize: 19,
                                  color: "secondary.main",
                                  flexShrink: 0,
                                  mt: 0.1,
                                }}
                              />

                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 700,
                                  color: "primary.main",
                                  fontSize: "0.78rem",
                                  lineHeight: 1.45,
                                  overflowWrap: "anywhere",
                                  minWidth: 0,
                                }}
                              >
                                {property.name}
                              </Typography>
                            </Box>
                          </TableCell>

                          {/* Occupancy */}
                          <TableCell
                            sx={{
                              py: 1.5,
                              px: 1,
                              verticalAlign: "middle",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                display: "block",
                                fontWeight: 700,
                                color: "text.primary",
                                fontSize: "0.72rem",
                                mb: 0.75,
                              }}
                            >
                              {occupancyRate}% Occupied
                            </Typography>

                            <LinearProgress
                              variant="determinate"
                              value={occupancyRate}
                              aria-label={`${property.name} occupancy: ${occupancyRate}%`}
                              sx={{
                                height: 6,
                                borderRadius: 4,
                                bgcolor: "#E2E8F0",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: progressColor,
                                  borderRadius: 4,
                                },
                              }}
                            />

                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "block",
                                fontSize: "0.67rem",
                                mt: 0.5,
                              }}
                            >
                              {occupiedUnits}/{totalUnits} units
                            </Typography>
                          </TableCell>

                          {/* Revenue */}
                          <TableCell
                            align="right"
                            sx={{
                              pr: 0,
                              pl: 0.5,
                              py: 1.5,
                              verticalAlign: "middle",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 800,
                                color: "primary.main",
                                fontSize: {
                                  sm: "0.72rem",
                                  md: "0.8rem",
                                },
                                overflowWrap: "anywhere",
                              }}
                            >
                              {formattedRevenue}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            )}

            {/* VIEW ALL FOOTER */}
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
                onClick={handleViewAll}
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  color: "primary.main",
                  textTransform: "none",
                  borderRadius: 2,
                  minWidth: 0,
                  px: 1,
                  "&:hover": {
                    color: "secondary.main",
                    bgcolor: alpha(
                      theme.palette.secondary.main,
                      0.06
                    ),
                  },
                }}
              >
                {propertyData.length > 3
                  ? `View All (${propertyData.length}) Properties`
                  : "View All Properties"}
              </Button>
            </Box>
          </>
        ) : (
          /* EMPTY STATE */
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: { xs: 1, sm: 2 },
              py: 4,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: "rgba(212, 175, 55, 0.12)",
                color: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <HomeWorkOutlinedIcon sx={{ fontSize: 30 }} />
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                mb: 0.5,
              }}
            >
              No Properties Found
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 280,
                mb: 2.5,
                fontSize: "0.82rem",
                lineHeight: 1.6,
              }}
            >
              You haven't registered any properties yet. Add a property to
              start tracking occupancy and revenue.
            </Typography>

            <Button
              variant="contained"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddProperty}
              sx={{
                bgcolor: "primary.main",
                color: "#FFFFFF",
                fontWeight: 700,
                px: 2,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.8rem",
                "&:hover": {
                  bgcolor: "#1E293B",
                },
              }}
            >
              Add Your First Property
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PropertyPerformanceCard;