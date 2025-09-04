import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function MaintenanceRequestItem({ request, onView }) {
  return (
    <Card sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {request.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {request.date}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={() => onView(request)}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequestItem;
