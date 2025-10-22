import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

const properties = [
  { name: "Block A", condition: "Good" },
  { name: "Block B", condition: "Needs Repair" },
  { name: "Block C", condition: "Excellent" },
];

const colorByCondition = (status) => {
  switch (status) {
    case "Good": return "success";
    case "Excellent": return "primary";
    case "Needs Repair": return "warning";
    default: return "default";
  }
};

const PropertyConditionCard = () => (
  <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, bgcolor: "#fff" }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Property Condition
      </Typography>

      {properties.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: index < properties.length - 1 ? 1.5 : 0,
          }}
        >
          <Typography variant="body2">{item.name}</Typography>
          <Chip label={item.condition} color={colorByCondition(item.condition)} size="small" />
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default PropertyConditionCard;
