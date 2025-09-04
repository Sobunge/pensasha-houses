import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";

function MaintenanceRequestsHeader({ showForm, onToggleForm }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", sm: "space-between" },
                alignItems: "center",
                gap: 2,
                mb: 2,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: { xs: "center", sm: "flex-start" },
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "center", sm: "flex-start" },
                        gap: 1,
                        flexGrow: 1,
                    }}
                >
                    <BuildIcon sx={{ color: "#f8b500", fontSize: { xs: 28, md: 32 } }} />
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{ textAlign: { xs: "center", sm: "left" } }}
                    >
                        Maintenance Requests
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="contained"
                color="warning"
                size="small"
                startIcon={<AddIcon />}
                onClick={onToggleForm}
                sx={{ whiteSpace: "nowrap", px: 3, py: 1 }}
            >
                {showForm ? "Cancel Request" : "New Request"}
            </Button>
        </Box>
    );
}

export default MaintenanceRequestsHeader;
