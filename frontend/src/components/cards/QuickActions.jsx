import { Stack, Card, Typography, Divider, Button } from "@mui/material";

const QuickActions = ({ rentAmount, lastPayment }) => (
  <Stack spacing={3}>
    <Card sx={{ bgcolor: "#111", color: "#fff", borderRadius: 4, p: 3 }}>
      <Typography variant="overline" sx={{ opacity: 0.7 }}>Monthly Rent</Typography>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
        KES {rentAmount.toLocaleString()}
      </Typography>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        Last payment: <strong>{lastPayment}</strong>
      </Typography>
    </Card>

    <Typography variant="subtitle2" fontWeight={800} sx={{ px: 1 }}>QUICK ACTIONS</Typography>
    <Button fullWidth variant="contained" sx={{ bgcolor: "#f8b500", color: "#111", fontWeight: 700, py: 1.5, borderRadius: 2 }}>
      Generate Invoice
    </Button>
    <Button fullWidth variant="outlined" sx={{ borderColor: "#eee", color: "#444", fontWeight: 700, py: 1.5, borderRadius: 2 }}>
      Log Maintenance
    </Button>
    <Button fullWidth variant="text" color="error" sx={{ fontWeight: 700 }}>
      Terminate Lease
    </Button>
  </Stack>
);

export default QuickActions;