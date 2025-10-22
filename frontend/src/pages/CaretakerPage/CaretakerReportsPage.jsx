// src/pages/Caretaker/CaretakerReportsPage.jsx
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Divider } from "@mui/material";
import { Description, Build, Assessment } from "@mui/icons-material";

const reports = [
  { id: 1, title: "Weekly Maintenance Summary", date: "2025-10-12", description: "3 repairs completed, 1 pending." },
  { id: 2, title: "Power Outage Incident Report", date: "2025-10-09", description: "Outage lasted 45 minutes on 2nd floor." },
  { id: 3, title: "Water Usage Analysis", date: "2025-10-08", description: "Tank refills increased by 10% this week." },
];

export default function CaretakerReportsPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Reports
      </Typography>

      <Grid container spacing={2}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} lg={4} key={report.id}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Description fontSize="small" color="primary" />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {report.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Date: {report.date}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">{report.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
