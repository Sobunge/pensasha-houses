import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Button,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const STATUS_CONFIG = {
  Paid: { icon: CheckCircleIcon, color: "success.main" },
  Pending: { icon: HourglassEmptyIcon, color: "warning.main" },
  Failed: { icon: CancelIcon, color: "error.main" },
};

function PaymentsCard({ payments = [] }) {
  const hasPayments = payments.length > 0;

  return (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: { xs: 1.5, sm: 2 },
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <PaymentIcon color="warning" />
        <Typography variant="subtitle1" fontWeight={600}>
          Payment History
        </Typography>
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexGrow: 1,
        }}
      >
        {hasPayments ? (
          <List disablePadding>
            {payments.map((payment, index) => {
              const StatusIcon = STATUS_CONFIG[payment.status]?.icon;
              const statusColor = STATUS_CONFIG[payment.status]?.color;

              return (
                <Box key={index}>
                  <ListItem
                    disableGutters
                    sx={{
                      py: { xs: 0.75, sm: 1 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Left */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {StatusIcon && <StatusIcon sx={{ color: statusColor }} />}
                      <Box>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                          {payment.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.status}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Right */}
                    <Typography sx={{ fontWeight: 600 }}>{payment.amount}</Typography>
                  </ListItem>

                  {index < payments.length - 1 && (
                    <Divider sx={{ display: { xs: "none", sm: "block" } }} />
                  )}
                </Box>
              );
            })}
          </List>
        ) : (
          // Empty State
          <Box
            sx={{
              py: 3,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              No payment records yet
            </Typography>
            <Typography variant="caption">
              Your rent payments will appear here once recorded.
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Footer / CTA */}
      <Divider />
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          component={RouterLink}
          to="/tenant/rent-payments"
          variant="contained"
          size="small"
          endIcon={<ArrowForwardIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View All Payments
        </Button>
      </Box>
    </Card>
  );
}

export default PaymentsCard;
