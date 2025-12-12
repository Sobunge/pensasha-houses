// src/pages/Caretaker/CaretakerTasksPage.jsx
import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import {  Build } from "@mui/icons-material";

const tasks = [
  { id: 1, title: "Fix leaking pipe - Room 204", status: "Pending", date: "2025-10-14" },
  { id: 2, title: "Inspect water tank", status: "Completed", date: "2025-10-12" },
  { id: 3, title: "Replace corridor light", status: "Pending", date: "2025-10-15" },
];

export default function CaretakerTasksPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Assigned Tasks
      </Typography>

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} md={4} key={task.id}>
            <Card
              sx={{
                borderLeft: `6px solid ${
                  task.status === "Completed" ? "#4caf50" : "#ff9800"
                }`,
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Build fontSize="small" />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {task.title}
                  </Typography>
                </Box>

                <Typography variant="body2" color="textSecondary">
                  Due: {task.date}
                </Typography>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{
                      color: task.status === "Completed" ? "success.main" : "warning.main",
                      fontWeight: 600,
                    }}
                  >
                    {task.status}
                  </Typography>
                  {task.status === "Pending" && (
                    <Button variant="contained" size="small" color="success">
                      Mark Done
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
