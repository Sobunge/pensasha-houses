// src/components/Admin/AdminChart.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function AdminChart() {
  const data = [
    { month: "Jan", tenants: 30, revenue: 120000 },
    { month: "Feb", tenants: 45, revenue: 150000 },
    { month: "Mar", tenants: 50, revenue: 175000 },
    { month: "Apr", tenants: 60, revenue: 190000 },
    { month: "May", tenants: 65, revenue: 210000 },
    { month: "Jun", tenants: 70, revenue: 240000 },
    { month: "Jul", tenants: 80, revenue: 265000 },
  ];

  const [range, setRange] = React.useState("6m");
  const handleRangeChange = (_, newRange) => {
    if (newRange) setRange(newRange);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
        p: { xs: 1.5, md: 2 },
      }}
    >
      <CardContent sx={{ p: { xs: 1, md: 2 } }}>
        {/* Header */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          gap={isMobile ? 1.5 : 0}
          mb={2}
        >
          {/* Title */}
          <Box display="flex" alignItems="center" gap={1}>
            <TrendingUpIcon sx={{ color: "#1976d2", fontSize: isMobile ? 22 : 26 }} />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight={600}
            >
              Tenant & Revenue Trends
            </Typography>
          </Box>

          {/* Time Range Filter */}
          <ToggleButtonGroup
            value={range}
            exclusive
            onChange={handleRangeChange}
            size={isMobile ? "small" : "medium"}
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              width: isMobile ? "100%" : "auto",
              justifyContent: "space-between",
            }}
          >
            {["1m", "3m", "6m", "1y"].map((period) => (
              <ToggleButton
                key={period}
                value={period}
                sx={{
                  flex: isMobile ? 1 : "unset",
                  fontSize: isMobile ? "0.7rem" : "0.85rem",
                  px: isMobile ? 0.8 : 1.5,
                }}
              >
                {period.toUpperCase()}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={isMobile ? 240 : 320}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) =>
                name === "revenue"
                  ? [`Ksh ${value.toLocaleString()}`, "Revenue"]
                  : [value, "Tenants"]
              }
            />
            <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
            <Line
              type="monotone"
              dataKey="tenants"
              stroke="#1976d2"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f57c00"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default AdminChart;
