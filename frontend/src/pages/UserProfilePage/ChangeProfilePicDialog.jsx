import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Stack,
    Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function ChangeProfilePicDialog({ open, handleClose, user, onSave }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!selectedFile) {
            setPreview("");
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSave = () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }
        onSave(selectedFile);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
        >
            {/* Centered Header */}
            <DialogTitle sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "#f8b500", width: 50, height: 50 }}>📷</Avatar>
                <Typography variant="h6" fontWeight={600}>
                    Change Profile Picture
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} alignItems="center" sx={{ mt: 1 }}>
                    <Avatar
                        src={preview || user.avatar || ""}
                        sx={{ width: 100, height: 100, bgcolor: "#f8b500" }}
                    >
                        {user.name?.charAt(0)}
                    </Avatar>

                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{ textTransform: "none" }}
                    >
                        Choose File
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>

                    {selectedFile && (
                        <Typography variant="body2" color="text.secondary">
                            {selectedFile.name}
                        </Typography>
                    )}
                </Stack>
            </DialogContent>

            {/* Buttons at opposite ends */}
            <DialogActions sx={{ px: 2, pb: 2, display: "flex", justifyContent: "space-between" }}>
                <Button
                    startIcon={<CloseIcon />}
                    onClick={handleClose}
                    sx={{ bgcolor: "#f44336", color: "#fff", "&:hover": { bgcolor: "#d32f2f" } }}
                >
                    Cancel
                </Button>
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleSave}
                    sx={{ bgcolor: "#f8b500", color: "#111", "&:hover": { bgcolor: "#c59000" } }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
