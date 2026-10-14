// src/components/cards/FinancialOverviewCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  alpha,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Monthly financial trajectory data
const monthlyData = [
  { month: "Jan", income: 45000, expenses: 15000 },
  { month: "Feb", income: 52000, expenses: 18000 },
  { month: "Mar", income: 78000, expenses: 25000 },
  { month: "Apr", income: 70000, expenses: 20000 },
  { month: "May", income: 95000, expenses: 30000 },
  { month: "Jun", income: 110000, expenses: 32000 },
  { month: "Jul", income: 105000, expenses: 28000 },
  { month: "Aug", income: 120000, expenses: 35000 },
];

const financials = {
  totalIncome: "Ksh 120,000",
  totalExpenses: "Ksh 35,000",
  netProfit: "Ksh 85,000",
};

// Custom tooltip matching Obsidian theme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#0F172A",
          color: "#FFFFFF",
          p: 1.5,
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        <Typography variant="caption" sx={{ color: "#D4AF37", fontWeight: 700 }}>
          {label} Summary
        </Typography>
        <Typography variant="body2" sx={{ color: "#10B981", fontWeight: 700, mt: 0.5 }}>
          Income: Ksh {payload[0].value.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ color: "#EF4444", fontWeight: 700 }}>
          Expenses: Ksh {payload[1].value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

function FinancialOverviewCard() {

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        width: "100%",

        // Pronounced Obsidian Depth Shadow
        boxShadow:
          "0 15px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -8px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "secondary.main",
          boxShadow:
            "0 25px 40px -10px rgba(15, 23, 42, 0.18), 0 12px 18px -6px rgba(15, 23, 42, 0.1)",
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3 },
          "&:last-child": { pb: { xs: 2.5, sm: 3 } },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "primary.main", lineHeight: 1.2 }}
              >
                Financial Overview
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Dual Income vs. Expenses trajectory for current period
              </Typography>
            </Box>
          </Box>

          {/* AREA CHART */}
          <Box sx={{ width: "100%", height: 210, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {/* Income Green Gradient */}
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>

                  {/* Expense Red Gradient */}
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* FINANCIAL SUMMARY PILLS ROW */}
        <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 2 }}>
          {/* Total Income */}
          <Grid item xs={4}>
            <Box
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: "12px",
                bgcolor: alpha("#10B981", 0.08),
                border: "1px solid",
                borderColor: alpha("#10B981", 0.2),
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.75, sm: 1.25 },
                minWidth: 0,
              }}
            >
              <AccountBalanceWalletOutlinedIcon
                fontSize="small"
                sx={{ color: "#10B981", fontSize: { xs: "1rem", sm: "1.25rem" } }}
              />
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    display: "block",
                    fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    lineHeight: 1,
                  }}
                >
                  Collected
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={800}
                  color="primary.main"
                  noWrap
                  sx={{
                    mt: 0.3,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  }}
                >
                  {financials.totalIncome}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Expenses */}
          <Grid item xs={4}>
            <Box
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: "12px",
                bgcolor: alpha("#EF4444", 0.08),
                border: "1px solid",
                borderColor: alpha("#EF4444", 0.2),
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.75, sm: 1.25 },
                minWidth: 0,
              }}
            >
              <ReceiptLongOutlinedIcon
                fontSize="small"
                sx={{ color: "#EF4444", fontSize: { xs: "1rem", sm: "1.25rem" } }}
              />
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    display: "block",
                    fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    lineHeight: 1,
                  }}
                >
                  Expenses
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={800}
                  color="primary.main"
                  noWrap
                  sx={{
                    mt: 0.3,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  }}
                >
                  {financials.totalExpenses}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Net Profit */}
          <Grid item xs={4}>
            <Box
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: "12px",
                bgcolor: alpha("#D4AF37", 0.12),
                border: "1px solid",
                borderColor: alpha("#D4AF37", 0.3),
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.75, sm: 1.25 },
                minWidth: 0,
              }}
            >
              <TrendingUpOutlinedIcon
                fontSize="small"
                sx={{ color: "#B5922B", fontSize: { xs: "1rem", sm: "1.25rem" } }}
              />
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    display: "block",
                    fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    lineHeight: 1,
                  }}
                >
                  Net Profit
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={800}
                  color="primary.main"
                  noWrap
                  sx={{
                    mt: 0.3,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  }}
                >
                  {financials.netProfit}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default FinancialOverviewCard;