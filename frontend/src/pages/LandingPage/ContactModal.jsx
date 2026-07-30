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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 420 },
    bgcolor: '#FFFFFF',
    color: '#0F172A', // Dark text color inside modal
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.25)',
    borderRadius: 3,
    p: { xs: 3, sm: 4 },
    outline: 'none',
    border: '1px solid #E2E8F0',
};

// Common input styles for high contrast over white background
const textFieldStyle = {
    '& .MuiInputBase-input': {
        color: '#0F172A', // Typing text
        '&::placeholder': {
            color: '#94A3B8', // Placeholder text color
            opacity: 1, // Ensures full visibility in dark mode themes
        },
    },
    '& .MuiInputLabel-root': {
        color: '#64748B', // Label text
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#B5922B', // Focused label accent color
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#CBD5E1', // Default border
        },
        '&:hover fieldset': {
            borderColor: '#94A3B8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#B5922B', // Gold border on focus
        },
    },
    '& .MuiFormHelperText-root': {
        color: '#DC2626', // Error text
    },
};

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
            <Box sx={modalStyle}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700, 
                            color: '#0F172A',
                            fontFamily: '"Playfair Display", Georgia, serif' 
                        }}
                    >
                        Contact Us
                    </Typography>
                    <IconButton 
                        onClick={onClose} 
                        size="small" 
                        sx={{ 
                            color: '#64748B',
                            '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' }
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>

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
                        sx={textFieldStyle}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#64748B' }} />
                                    </InputAdornment>
                                ),
                            }
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
                        sx={textFieldStyle}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#64748B' }} />
                                    </InputAdornment>
                                ),
                            }
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
                        sx={textFieldStyle}
                    />

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        startIcon={<SendIcon />}
                        fullWidth
                        sx={{
                            py: 1.2,
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 2,
                            backgroundColor: '#D4AF37',
                            color: '#0F172A',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#B5922B',
                                boxShadow: '0px 4px 12px rgba(212, 175, 55, 0.3)',
                            },
                        }}
                    >
                        Send Message
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}