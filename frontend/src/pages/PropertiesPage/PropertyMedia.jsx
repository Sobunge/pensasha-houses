import React from "react";
import { Box, Card, Typography } from "@mui/material";

const PropertyMedia = ({ media }) => {
  if (!media || media.length === 0) {
    return <Typography>No images available.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "flex-start",
      }}
    >
      {media.map((src, idx) => (
        <Card key={idx} sx={{ width: 400, borderRadius: 2 }}>
          <img
            src={src}
            alt={`Property media ${idx}`}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default PropertyMedia;
