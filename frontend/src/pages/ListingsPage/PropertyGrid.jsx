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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",  // center cards
        gap: 3,                    // spacing between cards (24px)
      }}
    >
      {properties.map((property) => (
        <Box
          key={property.id}
          sx={{
            flex: "0 1 calc(25% - 18px)", // four cards per row, accounting for gap
            maxWidth: 300,                // optional max width for consistency
            minWidth: 250,                // optional min width for responsiveness
          }}
        >
          <PropertyCard property={property} />
        </Box>
      ))}
    </Box>
  );
}
