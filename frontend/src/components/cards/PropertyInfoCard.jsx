import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";

const PropertyInfoCard = ({ property }) => {
  const navigate = useNavigate();
  const { id, name, unit, lease, rentStatus, rentAmount } = property;

  // Determine chip color based on rent status
  const statusColor = rentStatus === "Paid" ? "success" : "warning";

  // Navigate to property page on click
  const handleClick = () => navigate(`/tenant/properties/${id}`);

  return (
    <Card
      onClick={handleClick}
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        maxWidth: 400,             // Fixed width
        cursor: "pointer",         // Pointer on hover
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        {/* Property Name */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          {name}
        </Typography>

        {/* Unit */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <HomeIcon sx={{ fontSize: 18, mr: 1, color: "#555" }} />
          <Typography variant="body2" sx={{ color: "#555" }}>
            Unit: {unit}
          </Typography>
        </Box>

        {/* Lease */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <EventIcon sx={{ fontSize: 18, mr: 1, color: "#555" }} />
          <Typography variant="body2" sx={{ color: "#555" }}>
            Lease: {lease}
          </Typography>
        </Box>

        {/* Rent & Status */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon sx={{ fontSize: 18, mr: 0.5, color: "#111" }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#111" }}>
              {rentAmount}
            </Typography>
          </Box>

          <Chip
            label={rentStatus}
            color={statusColor}
            size="small"
            sx={{ textTransform: "uppercase", fontWeight: 600 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyInfoCard;
