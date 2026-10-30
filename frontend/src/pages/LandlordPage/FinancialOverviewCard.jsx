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
  useTheme,
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
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          p: 1.5,
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: `0 10px 20px ${theme.palette.primary.main}33`,
          border: `1px solid ${theme.palette.secondary.main}4D`,
        }}
      >
        <Typography variant="caption" sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}>
          {label} Summary
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.success?.main || "#10B981", fontWeight: 700, mt: 0.5 }}>
          Income: Ksh {Number(payload[0].value).toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.error?.main || "#EF4444", fontWeight: 700 }}>
          Expenses: Ksh {Number(payload[1].value).toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

function FinancialOverviewCard({ userId }) {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useFinancialOverview(userId);

  const successColor = theme.palette.success?.main || "#10B981";
  const errorColor = theme.palette.error?.main || "#EF4444";

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          p: 3,
          height: "100%",
        }}
      >
        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width="100%" height={210} sx={{ borderRadius: `${theme.shape.borderRadius}px`, mb: 3 }} />
        <Grid container spacing={1.5}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={4} key={i}>
              <Skeleton variant="rounded" height={50} sx={{ borderRadius: `${theme.shape.borderRadius}px` }} />
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
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          p: 3,
          height: "100%",
        }}
      >
        <Alert severity="error" sx={{ width: "100%", borderRadius: `${theme.shape.borderRadius}px` }}>
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
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        bgcolor: theme.palette.background.paper,
        border: `1.5px solid ${theme.palette.secondary.main}66`,
        height: "100%",
        width: "100%",
        boxShadow: `0 15px 35px -5px ${theme.palette.primary.main}14`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: theme.palette.secondary.main,
          boxShadow: `0 25px 40px -10px ${theme.palette.primary.main}24`,
          transform: "translateY(-4px)",
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
                sx={{ fontWeight: 800, color: theme.palette.primary.main, lineHeight: 1.2 }}
              >
                Financial Overview
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Dual Income vs. Expenses trajectory for current period
              </Typography>
            </Box>
          </Box>

          {/* CLEAN LIGHT EMPTY STATE MATCHING REFERENCE IMAGE */}
          <Box
            sx={{
              width: "100%",
              height: 210,
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: hasData ? "transparent" : theme.palette.background.default,
              borderRadius: `${theme.shape.borderRadius * 1.5}px`,
              border: hasData ? "none" : `1.5px dashed ${theme.palette.divider}`,
              position: "relative",
              overflow: "hidden",
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
                      <stop offset="5%" stopColor={successColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={successColor} stopOpacity={0.0} />
                    </linearGradient>

                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={errorColor} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={errorColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                    tickFormatter={(val) => `${val / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke={successColor}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke={errorColor}
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
                  p: 3,
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
                    borderRadius: `${theme.shape.borderRadius}px`,
                    bgcolor: alpha(theme.palette.secondary.main, 0.15),
                    color: theme.palette.secondary.dark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 0.5,
                  }}
                >
                  <BarChartOutlinedIcon fontSize="small" />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 800, color: theme.palette.primary.main, letterSpacing: "-0.2px" }}>
                  No Financial Activity Yet
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, maxWidth: 220, lineHeight: 1.4, fontWeight: 500 }}>
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
                borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                bgcolor: alpha(successColor, 0.08),
                border: "1px solid",
                borderColor: alpha(successColor, 0.2),
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.75, sm: 1.25 },
                minWidth: 0,
              }}
            >
              <AccountBalanceWalletOutlinedIcon
                fontSize="small"
                sx={{ color: successColor, fontSize: { xs: "1rem", sm: "1.25rem" } }}
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
                borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                bgcolor: alpha(errorColor, 0.08),
                border: "1px solid",
                borderColor: alpha(errorColor, 0.2),
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.75, sm: 1.25 },
                minWidth: 0,
              }}
            >
              <ReceiptLongOutlinedIcon
                fontSize="small"
                sx={{ color: errorColor, fontSize: { xs: "1rem", sm: "1.25rem" } }}
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
                borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                bgcolor: alpha(theme.palette.secondary.main, 0.12),
                border: "1px solid",
                borderColor: alpha(theme.palette.secondary.main, 0.3),
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.75, sm: 1.25 },
                minWidth: 0,
              }}
            >
              <TrendingUpOutlinedIcon
                fontSize="small"
                sx={{ color: theme.palette.secondary.dark, fontSize: { xs: "1rem", sm: "1.25rem" } }}
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