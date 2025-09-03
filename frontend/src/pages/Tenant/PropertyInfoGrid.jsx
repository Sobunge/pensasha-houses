import React from "react";
import { Box, Grid, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropertyInfoCard from "./PropertyInfoCard";

const PropertyInfoGrid = ({ properties }) => {
  // Show only first 3 properties in the grid
  const visibleProperties = properties.slice(0, 3);
  const hiddenCount = properties.length - visibleProperties.length;

  return (
    <Box>
      <Grid container spacing={2}>
        {visibleProperties.map((property, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >
            <PropertyInfoCard property={property} />
          </Grid>
        ))}

        {hiddenCount > 0 && (
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                width: "100%",
                minHeight: 180,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                "&:hover": { backgroundColor: "#fef2b2", borderColor: "#f8b500" },
              }}
              onClick={() => alert("Navigate to all properties page")}
            >
              View All Properties (+{hiddenCount})
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PropertyInfoGrid;
