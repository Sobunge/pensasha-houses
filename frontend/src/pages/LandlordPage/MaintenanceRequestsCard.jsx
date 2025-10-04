// src/components/cards/MaintenanceRequestsCard.jsx
import React from "react";
import { Card, CardContent, Box, Chip, Divider, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build"; // added icon

const requests = [
  { issue: "Leaking pipe in A-203", status: "In Progress" },
  { issue: "Broken gate lock (Pensasha Towers)", status: "Open" },
  { issue: "Lighting issue in C-405", status: "Completed" },
];

function MaintenanceRequestsCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        background: "linear-gradient(135deg, #ffffff, #fafafa)",
        width: "100%",
        maxWidth: 350,
        mx: "auto",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {requests.map((req, index) => (
            <Box key={index}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ fontWeight: 500, color: "#2a2a2a" }}>{req.issue}</Box>
                <Chip
                  label={req.status}
                  color={
                    req.status === "Completed"
                      ? "success"
                      : req.status === "In Progress"
                      ? "warning"
                      : "error"
                  }
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {index < requests.length - 1 && <Divider sx={{ borderColor: "#eee" }} />}
            </Box>
          ))}
        </Stack>

        {/* Button at the bottom with icon */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="outlined"
            startIcon={<BuildIcon />}
            onClick={() => navigate("/landlord/maintenance")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#111",
              borderColor: "#f8b500",
              "&:hover": {
                backgroundColor: "#f8b500",
                color: "#111",
                borderColor: "#111",
              },
            }}
          >
            View All Requests
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequestsCard;
