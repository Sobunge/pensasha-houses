// src/components/cards/RecentPaymentsCard.jsx
import React from "react";
import { Card, CardContent, Box, Divider, Stack, Typography, Avatar, Button } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useNavigate } from "react-router-dom";

const payments = [
  { tenant: "John Doe", amount: "Ksh 20,000", date: "Sept 3, 2025", method: "Mpesa" },
  { tenant: "Jane Wanjiku", amount: "Ksh 18,000", date: "Sept 1, 2025", method: "Bank Transfer" },
  { tenant: "Ali Mwinyi", amount: "Ksh 15,000", date: "Aug 30, 2025", method: "Cash" },
];

function RecentPaymentsCard() {
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
        <Stack spacing={2}>
          {payments.map((payment, index) => (
            <Box key={index}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Avatar */}
                <Avatar sx={{ bgcolor: "#f8b500", color: "#111", alignSelf: "center" }}>
                  {payment.tenant.split(" ").map((n) => n[0]).join("")}
                </Avatar>

                {/* Tenant info */}
                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#2a2a2a" }}>
                    {payment.tenant}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
                    {payment.amount} – {payment.date}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#f8b500", fontWeight: 600, mt: 0.25 }}>
                    {payment.method}
                  </Typography>
                </Box>
              </Box>

              {/* Divider (if not last item) */}
              {index < payments.length - 1 && <Divider sx={{ mt: 2, borderColor: "#eee" }} />}
            </Box>
          ))}
        </Stack>

        {/* Outlined Button at the bottom */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="outlined"
            startIcon={<HomeWorkIcon />}
            onClick={() => navigate("/landlord/finances")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#111111",
              borderColor: "#f8b500",
              "&:hover": {
                backgroundColor: "#f8b500",
                color: "#111111",
                borderColor: "#111111",
              },
            }}
          >
            View Finances
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecentPaymentsCard;
