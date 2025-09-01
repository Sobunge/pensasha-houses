import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function PropertyCard({ property }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 360,
        margin: "0 auto",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Property Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          overflow: "hidden",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>

      {/* Property Details */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#111", mb: 1 }}>
          {property.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", color: "#666", mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">{property.location}</Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{ color: "#1976d2", fontWeight: 700, mb: 1 }}
        >
          Ksh {property.price.toLocaleString()}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            color: "#2a2a2a",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <HomeIcon fontSize="small" />
            <Typography variant="body2">{property.type}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BedIcon fontSize="small" />
            <Typography variant="body2">{property.beds} Beds</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BathtubIcon fontSize="small" />
            <Typography variant="body2">{property.baths} Baths</Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Action Button */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<VisibilityIcon />}
          sx={{
            backgroundColor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: "#ffc62c",
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
