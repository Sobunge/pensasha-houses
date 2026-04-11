import { Box, Typography, Paper, Stack } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ConstructionIcon from "@mui/icons-material/Construction";

const ActivityLog = ({ activities }) => (
  <Box>
    <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
      Recent Activity
    </Typography>
    <Paper sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid #eee" }} elevation={0}>
      {activities.map((item, index) => (
        <Box 
          key={index} 
          sx={{ 
            p: 2.5, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            borderBottom: index !== activities.length - 1 ? "1px solid #eee" : "none"
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              {item.type === "Maintenance" ? <ConstructionIcon fontSize="small" /> : <ReceiptLongIcon fontSize="small" />}
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={700}>{item.task}</Typography>
              <Typography variant="caption" color="text.secondary">{item.date}</Typography>
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", textTransform: "uppercase" }}>
            {item.type}
          </Typography>
        </Box>
      ))}
    </Paper>
  </Box>
);

export default ActivityLog;