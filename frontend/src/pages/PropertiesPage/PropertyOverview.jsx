import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const PropertyOverview = ({ property }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Landlord Info */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Landlord Info
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar>{property.landlord.name[0]}</Avatar>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" />
                <Typography>{property.landlord.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">{property.landlord.email}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">{property.landlord.phone}</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Caretaker Info */}
      {property.caretaker && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Caretaker Info
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar>{property.caretaker.name[0]}</Avatar>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon fontSize="small" />
                  <Typography>{property.caretaker.name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2">{property.caretaker.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">{property.caretaker.phone}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Rent Details */}
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
