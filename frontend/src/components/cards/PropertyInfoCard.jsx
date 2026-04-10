import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/AuthContext";

const PropertyInfoCard = ({ property }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { id, name, unit, lease, rentStatus, rentAmount } = property;
  const isPaid = rentStatus === "Paid";

  const handleNavigation = () => {
    if (!user) return;
    const roleBase = user.role.toLowerCase();
    navigate(`/${roleBase}/properties/${id}`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%", // Forces the card to occupy the full width of its parent container
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": { 
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", 
          transform: "translateY(-4px)" 
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2.5,
          bgcolor: "rgba(248, 181, 0, 0.04)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <HomeWorkIcon sx={{ color: "#f8b500" }} />
        <Typography variant="subtitle1" fontWeight={800} color="text.primary">
          Property Details
        </Typography>
      </Box>

      <CardContent sx={{ p: 4, flexGrow: 1 }}>
        <Stack spacing={3}>
          {/* Property Name & Rent Status */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={900} sx={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              {name}
            </Typography>
            {rentStatus && (
              <Chip
                label={rentStatus}
                size="small"
                sx={{ 
                  fontWeight: 800, 
                  bgcolor: isPaid ? "rgba(76, 175, 80, 0.1)" : "rgba(248, 181, 0, 0.1)",
                  color: isPaid ? "#2e7d32" : "#f8b500",
                  border: "1px solid",
                  borderColor: isPaid ? "rgba(76, 175, 80, 0.2)" : "rgba(248, 181, 0, 0.2)",
                  fontSize: "0.7rem",
                  px: 1
                }}
              />
            )}
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 4 }}>
            {unit && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ bgcolor: "rgba(248, 181, 0, 0.1)", p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                  <HomeIcon sx={{ fontSize: 18, color: "#f8b500" }} />
                </Box>
                <Typography variant="body1" fontWeight={600} color="text.primary">
                  Unit: {unit}
                </Typography>
              </Box>
            )}

            {lease && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ bgcolor: "rgba(248, 181, 0, 0.1)", p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                  <EventIcon sx={{ fontSize: 18, color: "#f8b500" }} />
                </Box>
                <Typography variant="body1" fontWeight={600} color="text.primary">
                  Lease: {lease}
                </Typography>
              </Box>
            )}
          </Stack>

          <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

          {/* Monthly Rent Display */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            bgcolor: "rgba(0,0,0,0.02)",
            p: 2.5,
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.03)"
          }}>
            <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Monthly Rent
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", color: "#1a1a1a", gap: 0.5 }}>
              <AttachMoneyIcon sx={{ fontSize: 22, color: "#f8b500" }} />
              <Typography variant="h5" fontWeight={900}>
                {rentAmount}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

      {/* Action Button Area */}
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNavigation}
          sx={{
            bgcolor: "#f8b500",
            color: "#000000",
            textTransform: "none",
            fontWeight: 900,
            fontSize: "0.95rem",
            px: 6,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(248, 181, 0, 0.25)",
            "& .MuiButton-endIcon": { color: "#000000" },
            "&:hover": {
              bgcolor: "#eab000",
              boxShadow: "0 8px 24px rgba(248, 181, 0, 0.35)",
              transform: "scale(1.02)"
            },
            transition: "all 0.2s ease"
          }}
        >
          View Full Property Details
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyInfoCard;