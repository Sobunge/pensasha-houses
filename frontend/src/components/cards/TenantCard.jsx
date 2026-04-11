import { Card, Typography, Box, Avatar, Divider, Grid } from "@mui/material";

const TenantCard = ({ tenant }) => (
  <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", p: 4 }}>
    <Typography variant="h6" fontWeight={800} gutterBottom>
      Current Tenant
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
      <Avatar sx={{ width: 64, height: 64, bgcolor: "#f8b500", fontSize: "1.5rem", fontWeight: 700 }}>
        {tenant.name[0]}
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight={700}>{tenant.name}</Typography>
        <Typography variant="body2" color="text.secondary">{tenant.email}</Typography>
        <Typography variant="body2" color="text.secondary">{tenant.phone}</Typography>
      </Box>
    </Box>
    
    <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="caption" color="text.secondary">Lease Started</Typography>
        <Typography variant="body1" fontWeight={600}>{tenant.leaseStart}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="caption" color="text.secondary">Lease Ends</Typography>
        <Typography variant="body1" fontWeight={600}>{tenant.leaseEnd}</Typography>
      </Grid>
    </Grid>
  </Card>
);

export default TenantCard;