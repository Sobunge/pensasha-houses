import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";

export default function RequestToRentDialog({ open, onClose, property }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate sending request
    setTimeout(() => {
      alert("✅ Request sent successfully!");
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          backgroundColor: "#fdfdfd",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Centered Header */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#111",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          py: 2,
          px: 3,
          position: "relative",
          textAlign: "center",
        }}
      >
        REQUEST TO RENT
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            right: 16,
            color: "#111",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Property Summary */}
      <Box sx={{ px: 3, pt: 2, pb: 1 }}>
        <Typography variant="body1" fontWeight={600}>
          {property?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ksh {property?.price?.toLocaleString()} / month
        </Typography>
      </Box>

      {/* Form */}
      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+254 700 000 000"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="I'd like to rent this property..."
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon color="action" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Box>
      </DialogContent>

      {/* Footer Actions */}
      <DialogActions
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          startIcon={<CancelIcon />}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "#ffe5e5",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SendIcon />}
          disabled={submitted}
          sx={{
            background: "linear-gradient(45deg, #f8b500, #ffc62c)",
            color: "#111",
            fontWeight: 700,
            borderRadius: 2,
            px: 4,
            py: 1,
            "&:hover": {
              background: "linear-gradient(45deg, #ffc62c, #f8b500)",
            },
          }}
        >
          {submitted ? "Sending..." : "Send Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
