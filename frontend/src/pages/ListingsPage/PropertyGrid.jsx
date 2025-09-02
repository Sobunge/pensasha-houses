import React from "react";
import { Box, Typography } from "@mui/material";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties }) {
  if (!properties.length) {
    return (
      <Typography sx={{ p: 4, width: "100%", textAlign: "center" }}>
        No properties found. Try adjusting your filters.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        columnGap: 1, // horizontal spacing between cards
        rowGap: 3,    // vertical spacing between rows
        width: "100%",
        justifyContent: "center", // center cards if row is not full
      }}
    >
      {properties.map((property) => (
        <Box key={property.id} sx={{ width: "100%", maxWidth: 280, margin: "0 auto" }}>
          <PropertyCard property={property} />
        </Box>
      ))}
    </Box>
  );
}
