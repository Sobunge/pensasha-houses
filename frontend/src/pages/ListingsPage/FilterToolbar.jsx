import React from "react";
import { Box, Button, Stack } from "@mui/material";

export default function FilterToolbar({ onSort }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Button variant="outlined" onClick={() => onSort("priceLow")}>Price: Low → High</Button>
        <Button variant="outlined" onClick={() => onSort("priceHigh")}>Price: High → Low</Button>
        <Button variant="outlined" onClick={() => onSort("newest")}>Newest</Button>
        <Button variant="outlined" onClick={() => onSort("featured")}>Featured</Button>
      </Stack>
    </Box>
  );
}
