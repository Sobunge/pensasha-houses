import React from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";

function SystemSettings() {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        System Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="System Name" defaultValue="Smart Estate Manager" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Support Email" defaultValue="support@estate.com" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Enable Notifications"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel control={<Switch />} label="Enable Auto Backups" />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f8b500",
              color: "#111",
              "&:hover": { bgcolor: "#111", color: "#fff" },
            }}
          >
            Save Settings
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SystemSettings;
