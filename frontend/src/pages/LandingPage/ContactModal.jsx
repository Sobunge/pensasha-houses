// src/components/modals/ContactModal.jsx
import { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
  Stack,
  InputAdornment,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const getModalStyle = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 440 },
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: `0 25px 50px -12px ${theme.palette.primary.main}40`,
  borderRadius: `${theme.shape.borderRadius * 2}px`,
  p: { xs: 3, sm: 4 },
  outline: 'none',
  border: `1px solid ${theme.palette.divider}`,
});

// Common input styles leveraging theme tokens
const getTextFieldStyle = (theme) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: `${theme.shape.borderRadius}px`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: '0.95rem',
    fontWeight: 500,
    '& fieldset': {
      borderColor: theme.palette.divider,
      borderWidth: '1.5px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '2px',
      },
      '& .MuiInputAdornment-root .MuiSvgIcon-root': {
        color: theme.palette.secondary.main,
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: '0.9rem',
    '&.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },
  '& input::placeholder, & textarea::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.error?.main || '#DC2626',
    fontWeight: 500,
  },
});

export default function ContactModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={getModalStyle}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', position: 'relative', mb: 3 }}>
          <IconButton
            onClick={onClose}
            size="small"
            sx={(theme) => ({
              position: 'absolute',
              right: -8,
              top: -8,
              color: theme.palette.text.secondary,
              '&:hover': {
                bgcolor: `${theme.palette.primary.main}0A`,
                color: theme.palette.text.primary,
              },
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Gold Icon Badge */}
          <Avatar
            sx={(theme) => ({
              mx: 'auto',
              bgcolor: `${theme.palette.secondary.main}1F`, // ~12% gold fill
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.main}40`,
              width: 52,
              height: 52,
              mb: 1.5,
            })}
          >
            <SupportAgentIcon sx={{ fontSize: '1.6rem' }} />
          </Avatar>

          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 800,
              color: theme.palette.text.primary,
              letterSpacing: '-0.02em',
            })}
          >
            Get in Touch
          </Typography>

          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              mt: 0.5,
              fontSize: '0.875rem',
            })}
          >
            Send us a message and our team will get back to you shortly.
          </Typography>
        </Box>

        {/* Form Fields */}
        <Stack spacing={2.5}>
          <TextField
            label="Name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            size="small"
            sx={getTextFieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={(theme) => ({ color: theme.palette.text.secondary, transition: 'color 0.2s' })} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            size="small"
            sx={getTextFieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={(theme) => ({ color: theme.palette.text.secondary, transition: 'color 0.2s' })} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Message"
            name="message"
            placeholder="Write your inquiry or feedback here..."
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            multiline
            rows={4}
            fullWidth
            size="small"
            sx={getTextFieldStyle}
          />

          {/* Submit CTA Button */}
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SendIcon sx={{ fontSize: '1.1rem !important' }} />}
            fullWidth
            sx={(theme) => ({
              py: 1.4,
              mt: 1,
              fontWeight: 700,
              fontSize: '0.95rem',
              textTransform: 'none',
              borderRadius: '50px',
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 4px 14px ${theme.palette.secondary.main}59`,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: `0 6px 18px ${theme.palette.secondary.main}73`,
              },
            })}
          >
            Send Message
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}