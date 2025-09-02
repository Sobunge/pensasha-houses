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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    outline: 'none',
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
            <Box sx={style}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Contact Us
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        startIcon={<SendIcon />}
                        sx={{
                            backgroundColor: '#f8b500',
                            color: '#111',
                            '&:hover': { backgroundColor: '#c59000' },
                            textTransform: 'none',
                            borderRadius: 2,
                        }}
                    >
                        Send Message
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
