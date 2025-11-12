import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Fade,
  Alert,
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
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form and success state whenever dialog opens
    if (open) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSuccess(false);
      setSubmitted(false);
      setErrors({});
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    setSuccess(false);

    // Simulate sending request
    setTimeout(() => {
      setSubmitted(false);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // ✅ Do NOT auto-close dialog. Parent decides when to close.
      // You can still optionally auto-hide success message:
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 1500);
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
        Request to Rent
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

      <Box sx={{ px: 3, pt: 1 }}>
        <Typography variant="body1" fontWeight={600}>
          {property?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ksh {property?.price?.toLocaleString()} / month
        </Typography>
      </Box>

      <DialogContent dividers>
        {success && (
          <Fade in={success}>
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              ✅ Your request was sent successfully!
            </Alert>
          </Fade>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.phone}
            helperText={errors.phone}
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
          disabled={submitted}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": { borderWidth: 2, backgroundColor: "#ffe5e5" },
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          startIcon={
            submitted ? <CircularProgress size={20} sx={{ color: "#111" }} /> : <SendIcon />
          }
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
