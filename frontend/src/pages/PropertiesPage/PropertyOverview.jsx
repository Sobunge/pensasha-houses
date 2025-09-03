import React from "react";
import { Box, Card, CardContent, Typography, Chip, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const PropertyOverview = ({ property }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Landlord Info
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar>{property.landlord.name[0]}</Avatar>
            <Box>
              <Typography>{property.landlord.name}</Typography>
              <Typography variant="body2">{property.landlord.email}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Rent Details
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AttachMoneyIcon />
            <Typography>{property.rentAmount}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyOverview;
