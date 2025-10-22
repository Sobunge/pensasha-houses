import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const messages = [
  { name: "Mary Atieno", message: "Water leaking in bathroom", time: "2h ago" },
  { name: "Brian Ochieng", message: "Electric socket not working", time: "5h ago" },
  { name: "Lydia Mwangi", message: "Request for cleaning", time: "1d ago" },
];

const TenantMessagesCard = () => (
  <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, bgcolor: "#fff" }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Tenant Messages
      </Typography>

      <List disablePadding>
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography fontWeight={600}>{msg.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">{msg.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                  </>
                }
              />
            </ListItem>
            {index < messages.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default TenantMessagesCard;
