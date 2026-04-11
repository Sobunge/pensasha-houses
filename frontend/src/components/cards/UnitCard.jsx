import { Card, CardContent, Typography, Box, Chip, Avatar, Divider } from "@mui/material";
import KingBedIcon from "@mui/icons-material/KingBed";

const getStatusStyles = (status) => {
  const s = status?.toLowerCase();
  switch (s) {
    case "occupied": return { color: "#2e7d32", bg: "#e8f5e9" };
    case "vacant": return { color: "#ed6c02", bg: "#fff3e0" };
    case "maintenance": return { color: "#d32f2f", bg: "#ffebee" };
    default: return { color: "#757575", bg: "#f5f5f5" };
  }
};

const UnitCard = ({ unit }) => {
  const statusStyle = getStatusStyles(unit.status);

  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        transition: "0.3s", 
        height: '100%',
        minWidth: '280px', // Ensures the card doesn't get too narrow
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } 
      }}
    >
      <CardContent sx={{ p: 3 }}> {/* Increased padding for better spacing */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
            {unit.unitNumber}
          </Typography>
          <Chip 
            label={unit.status} 
            size="small" 
            sx={{ 
              bgcolor: statusStyle.bg, 
              color: statusStyle.color, 
              fontWeight: 800, 
              borderRadius: 1.5,
              px: 1 
            }} 
          />
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <KingBedIcon sx={{ color: "text.secondary", fontSize: 22 }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {unit.type}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 42, 
              height: 42, 
              fontSize: "1rem", 
              bgcolor: unit.tenant ? "#f8b500" : "#eceff1",
              color: unit.tenant ? "#111" : "#90a4ae",
              fontWeight: 700
            }}
          >
            {unit.tenant ? unit.tenant[0] : "?"}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: -0.5 }}>
              Current Tenant
            </Typography>
            <Typography 
              variant="body2" 
              fontWeight={700} 
              noWrap // Prevents the name from wrapping and squeezing the layout
            >
              {unit.tenant || "Available"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UnitCard;