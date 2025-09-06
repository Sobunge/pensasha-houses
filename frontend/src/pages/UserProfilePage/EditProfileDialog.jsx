// src/components/Profile/EditProfileDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function EditProfileDialog({ open, handleClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, p: 1.5 },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "#f8b500", width: 40, height: 40 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="h6" fontWeight={600}>
          Edit Profile
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1.5 }}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <PersonIcon sx={{ color: "action.active" }} />
                </Box>
              ),
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <EmailIcon sx={{ color: "action.active" }} />
                </Box>
              ),
            }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <PhoneIcon sx={{ color: "action.active" }} />
                </Box>
              ),
            }}
          />
        </Stack>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          startIcon={<CloseIcon />}
          onClick={handleClose}
          sx={{
            bgcolor: "#f44336",
            color: "#fff",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#d32f2f" },
          }}
        >
          Cancel
        </Button>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c59000" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileDialog;
