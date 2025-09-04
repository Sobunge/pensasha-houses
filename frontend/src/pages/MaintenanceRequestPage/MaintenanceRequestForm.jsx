import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const requestTypes = ["Plumbing", "Electrical", "Cleaning", "Other"];
const priorities = ["Low", "Medium", "High"];

function MaintenanceRequestForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic
    console.log({ title, type, priority, description, file });
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 3,
        p: 2,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Request Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextField
        select
        label="Request Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        {requestTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        {priorities.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        required
      />

      <TextField
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        InputProps={{ startAdornment: <UploadFileIcon sx={{ mr: 1 }} /> }}
      />

      <Button type="submit" variant="contained" color="warning" startIcon={<UploadFileIcon />}>
        Submit Request
      </Button>
    </Box>
  );
}

export default MaintenanceRequestForm;
