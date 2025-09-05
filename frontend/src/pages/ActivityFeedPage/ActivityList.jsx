import React from "react";
import { List } from "@mui/material";
import ActivityItem from "./ActivityItem";

function ActivityList({ activities }) {
  return (
    <List>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </List>
  );
}

export default ActivityList;
