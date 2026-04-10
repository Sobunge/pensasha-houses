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
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const STATUS_CONFIG = {
  Paid: { icon: CheckCircleIcon, color: "success.main" },
  Pending: { icon: HourglassEmptyIcon, color: "#f8b500" }, // Consistent icon type
  Failed: { icon: CancelIcon, color: "error.main" },
};

function PaymentsCard({ payments = [] }) {
  const hasPayments = payments.length > 0;

  return (
    <Card
      elevation={0}
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" }, // Maintains layout consistency
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": { 
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", 
          transform: "translateY(-5px)" 
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(248, 181, 0, 0.04)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <PaymentIcon sx={{ color: "#f8b500" }} />
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Payment History
        </Typography>
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: 160,
        }}
      >
        {hasPayments ? (
          <List disablePadding>
            {payments.slice(0, 3).map((payment, index) => {
              const config = STATUS_CONFIG[payment.status] || STATUS_CONFIG.Pending;
              const StatusIcon = config.icon;

              return (
                <Box key={index}>
                  <ListItem
                    disableGutters
                    sx={{
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                      <Box 
                        sx={{ 
                          bgcolor: "rgba(0,0,0,0.03)", 
                          p: 1.2, 
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <StatusIcon sx={{ color: config.color, fontSize: 20 }} />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={800} sx={{ color: '#1a1a1a' }}>
                          {payment.amount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {payment.date} • {payment.status}
                        </Typography>
                      </Box>
                    </Stack>
                  </ListItem>
                  {index < Math.min(payments.length - 1, 2) && (
                    <Divider sx={{ opacity: 0.6 }} />
                  )}
                </Box>
              );
            })}
          </List>
        ) : (
          <Box sx={{ py: 3, textAlign: "center", my: 'auto' }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              No recent transactions found
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

      {/* Responsive Action Button */}
      <Box 
        sx={{ 
          p: 2, 
          display: "flex", 
          justifyContent: { xs: "center", sm: "flex-end" } 
        }}
      >
        <Button
          component={RouterLink}
          to="/tenant/rent-payments"
          variant="contained"
          startIcon={<ReceiptLongIcon />}
          sx={{
            bgcolor: "#f8b500",
            color: "#000000",
            textTransform: "none",
            fontWeight: 800,
            fontSize: { xs: "0.825rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: 2.5,
            width: { xs: "100%", sm: "auto" }, // Responsive sizing
            boxShadow: "0 4px 12px 0 rgba(248, 181, 0, 0.25)",
            "& .MuiButton-startIcon": { color: "#000000" },
            "&:hover": { 
              bgcolor: "#eab000", 
              boxShadow: "0 6px 16px rgba(248, 181, 0, 0.4)",
              transform: "translateY(-1px)",
            }
          }}
        >
          View Full History
        </Button>
      </Box>
    </Card>
  );
}

export default PaymentsCard;