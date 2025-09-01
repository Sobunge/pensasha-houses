import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";

export default function PropertyCard({ property }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 350,
        margin: "0 auto",
      }}
    >
      {/* Image Box */}
      <Box
        sx={{
          width: "100%",
          height: 200,          // fixed image height
          overflow: "hidden",
        }}
      >
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // crop to fill box without distortion
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.location}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          Ksh {property.price.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          {property.type} · {property.beds} Beds · {property.baths} Baths
        </Typography>
      </CardContent>

      {/* Button */}
      <CardActions>
        <Button size="small" variant="outlined" fullWidth>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
