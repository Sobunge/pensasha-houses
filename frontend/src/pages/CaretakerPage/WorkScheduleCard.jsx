import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Checkbox } from "@mui/material";

const tasks = [
  { task: "Inspect Block B plumbing", done: false },
  { task: "Deliver maintenance tools", done: true },
  { task: "Check lighting in hallways", done: false },
];

const WorkScheduleCard = () => (
  <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, bgcolor: "#fff" }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Work Schedule
      </Typography>
      <List>
        {tasks.map((t, i) => (
          <ListItem key={i} dense>
            <Checkbox checked={t.done} />
            <ListItemText
              primary={t.task}
              primaryTypographyProps={{
                variant: "body2",
                sx: { textDecoration: t.done ? "line-through" : "none" },
              }}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default WorkScheduleCard;
