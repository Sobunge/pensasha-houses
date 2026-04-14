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
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Added for location

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/AuthContext";

const PropertyInfoCard = ({ property }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Updated destructuring to match your Backend PropertyDTO
  const { 
    id, 
    name, 
    location, 
    description, 
    units = [], // Array of units from your DTO
  } = property;

  // Calculate a base rent price or display range
  const baseRent = units.length > 0 ? units[0].rentAmount : "0";
  const unitCount = units.length;

  const handleNavigation = () => {
    if (!user) return;
    const roleBase = user.role.toLowerCase();
    navigate(`/${roleBase}/properties/${id}`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
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
          justifyContent: "space-between", // Added space for unit count chip
          p: 2,
          bgcolor: "rgba(248, 181, 0, 0.04)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <HomeWorkIcon sx={{ color: "#f8b500" }} />
            <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ textTransform: 'uppercase' }}>
              Property
            </Typography>
        </Box>
        <Chip label={`${unitCount} Units`} size="small" sx={{ fontWeight: 700, bgcolor: '#fff' }} />
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Stack spacing={2.5}>
          {/* Property Name & Rent Status */}
          <Box>
            <Typography variant="h5" fontWeight={900} sx={{ color: "#1a1a1a", mb: 0.5 }}>
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                <LocationOnIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">{location}</Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden',
              minHeight: '3em'
          }}>
            {description || "No description provided for this property."}
          </Typography>

          <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

          {/* Price Display */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            bgcolor: "rgba(0,0,0,0.02)",
            p: 2,
            borderRadius: 3,
          }}>
            <Typography variant="caption" fontWeight={800} color="text.secondary">
              STARTING RENT
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", color: "#1a1a1a" }}>
              <Typography variant="h6" fontWeight={900}>
                KES {baseRent.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>

      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNavigation}
          sx={{
            bgcolor: "#f8b500",
            color: "#000000",
            textTransform: "none",
            fontWeight: 800,
            py: 1.2,
            borderRadius: 2.5,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#eab000",
              boxShadow: "0 4px 12px rgba(248, 181, 0, 0.2)",
            }
          }}
        >
          Manage Property
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyInfoCard;