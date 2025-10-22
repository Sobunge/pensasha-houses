import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

const MaintenanceOverviewCard = () => {
  const data = { pending: 3, inProgress: 2, completed: 7 };
  const total = data.pending + data.inProgress + data.completed;

  return (
    <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, bgcolor: "#fff" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Maintenance Overview
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Pending</Typography>
          <Typography variant="body2" fontWeight={600}>{data.pending}</Typography>
        </Box>
        <LinearProgress variant="determinate" value={(data.pending / total) * 100} sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">In Progress</Typography>
          <Typography variant="body2" fontWeight={600}>{data.inProgress}</Typography>
        </Box>
        <LinearProgress color="warning" variant="determinate" value={(data.inProgress / total) * 100} sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Completed</Typography>
          <Typography variant="body2" fontWeight={600}>{data.completed}</Typography>
        </Box>
        <LinearProgress color="success" variant="determinate" value={(data.completed / total) * 100} />
      </CardContent>
    </Card>
  );
};

export default MaintenanceOverviewCard;
