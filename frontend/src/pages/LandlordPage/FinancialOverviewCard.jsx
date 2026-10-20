// src/components/cards/FinancialOverviewCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Skeleton,
  Alert,
  alpha,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useFinancialOverview } from "../../components/hooks/landlord/useFinancialOverview";

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
          Income: Ksh {Number(payload[0].value).toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ color: "#EF4444", fontWeight: 700 }}>
          Expenses: Ksh {Number(payload[1].value).toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

function FinancialOverviewCard({ userId }) {
  const { data, isLoading, isError, error } = useFinancialOverview(userId);

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          height: "100%",
        }}
      >
        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width="100%" height={210} sx={{ borderRadius: 2, mb: 3 }} />
        <Grid container spacing={1.5}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={4} key={i}>
              <Skeleton variant="rounded" height={50} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          height: "100%",
        }}
      >
        <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>
          {error?.message || "Failed to load financial overview data."}
        </Alert>
      </Card>
    );
  }

  const monthlyData = data?.monthlyData || [];
  const hasData = monthlyData.length > 0 && monthlyData.some(item => Number(item.income) > 0 || Number(item.expenses) > 0);

  const financials = {
    totalIncome: data?.totalIncome ? `Ksh ${Number(data.totalIncome).toLocaleString()}` : "Ksh 0",
    totalExpenses: data?.totalExpenses ? `Ksh ${Number(data.totalExpenses).toLocaleString()}` : "Ksh 0",
    netProfit: data?.netProfit ? `Ksh ${Number(data.netProfit).toLocaleString()}` : "Ksh 0",
  };

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

          {/* CHART OR EMPTY STATE */}
          <Box
            sx={{
              width: "100%",
              height: 210,
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: hasData ? "transparent" : alpha("#F1F5F9", 0.5),
              borderRadius: "12px",
              border: hasData ? "none" : "1px dashed #CBD5E1",
            }}
          >
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>

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
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    bgcolor: alpha("#D4AF37", 0.1),
                    color: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BarChartOutlinedIcon fontSize="small" />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main" }}>
                  No Financial Activity Yet
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", maxWidth: 220, lineHeight: 1.4 }}>
                  Income and expense trends will appear here once invoices are paid.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 2 }}>
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