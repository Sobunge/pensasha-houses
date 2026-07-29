// src/components/PropertyInfoCard.jsx
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
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/AuthContext";

const PropertyInfoCard = ({ property = {} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    id,
    name,
    location,
    description,
    units = [],
  } = property;

  const baseRent = units.length > 0 ? units[0].rentAmount : 0;
  const unitCount = units.length;

  const handleNavigation = () => {
    if (!user || !id) return;
    const roleBase = user.role?.toLowerCase() || "tenant";
    navigate(`/${roleBase}/properties/${id}`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-4px)",
          borderColor: "rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      {/* --- Header --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: "rgba(212, 175, 55, 0.04)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
            <HomeWorkOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 800,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontSize: "0.75rem",
            }}
          >
            Property
          </Typography>
        </Box>

        <Chip
          label={`${unitCount} ${unitCount === 1 ? "Unit" : "Units"}`}
          size="small"
          sx={{
            fontWeight: 700,
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            fontSize: "0.75rem",
            borderRadius: "6px",
            height: "24px",
          }}
        />
      </Box>

      {/* --- Main Content --- */}
      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        <Stack spacing={2}>
          {/* Property Name & Location */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                mb: 0.5,
                fontSize: "1.125rem",
                letterSpacing: "-0.2px",
              }}
            >
              {name || "Unnamed Property"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#64748B",
              }}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#94A3B8" }} />
              <Typography variant="body2" sx={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                {location || "Location unavailable"}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#475569",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.6em",
            }}
          >
            {description || "No description provided for this property."}
          </Typography>

          <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0" }} />

          {/* Price Display */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "rgba(15, 23, 42, 0.02)",
              p: 2,
              borderRadius: "12px",
              border: "1px solid #F1F5F9",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#64748B",
                letterSpacing: "0.5px",
              }}
            >
              STARTING RENT
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                fontSize: "1rem",
              }}
            >
              KES {Number(baseRent).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* --- Action Footer --- */}
      <Box sx={{ p: 2.5, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardOutlinedIcon />}
          onClick={handleNavigation}
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
            py: 1.2,
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            "& .MuiButton-endIcon": {
              color: "#D4AF37",
            },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 16px rgba(212, 175, 55, 0.3)",
              "& .MuiButton-endIcon": {
                color: "#0F172A",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          Manage Property
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyInfoCard;