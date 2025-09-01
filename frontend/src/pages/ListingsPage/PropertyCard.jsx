import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

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
      {/* Image Box */}
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

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#111111", mb: 1 }}
        >
          {property.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
          {property.location}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#1976d2", fontWeight: 700, mb: 1 }}
        >
          Ksh {property.price.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
          {property.type} · {property.beds} Beds · {property.baths} Baths
        </Typography>
      </CardContent>

      {/* Button */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#f8b500",
            color: "#111111",
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
