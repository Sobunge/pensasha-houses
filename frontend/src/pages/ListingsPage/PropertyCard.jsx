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
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        },
        width: 280,
        minWidth: 280,
        flex: "0 0 auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Details */}
      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            fontSize: "0.85rem",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={property.title}
        >
          {property.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", color: "#555", mb: 0.5 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.75rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={property.location}
          >
            {property.location}
          </Typography>
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ color: "#1976d2", fontWeight: 700, mb: 1, fontSize: "0.85rem" }}
        >
          Ksh {property.price.toLocaleString()}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, color: "#333" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <HomeIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: "0.73rem" }}>
              {property.type}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <BedIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: "0.73rem" }}>
              {property.beds} Beds
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <BathtubIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: "0.73rem" }}>
              {property.baths} Baths
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 1.5, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<VisibilityIcon />}
          sx={{
            backgroundColor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.73rem",
            borderRadius: 6,
            "&:hover": { backgroundColor: "#ffc62c" },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
