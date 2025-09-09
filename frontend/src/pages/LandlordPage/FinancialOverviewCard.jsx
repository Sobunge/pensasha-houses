// src/components/cards/FinancialOverviewCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const financials = {
  totalIncome: "Ksh 120,000",
  totalExpenses: "Ksh 35,000",
  netProfit: "Ksh 85,000",
};

function FinancialOverviewCard() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#111",
            letterSpacing: 0.5,
          }}
        >
          Financial Overview
        </Typography>

        {/* Stats */}
        <Stack spacing={2} divider={<Divider flexItem />}>
          {/* Income */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AccountBalanceWalletIcon sx={{ color: "#4caf50" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "#777" }}>
                Total Income
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#111" }}
              >
                {financials.totalIncome}
              </Typography>
            </Box>
          </Box>

          {/* Expenses */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ReceiptLongIcon sx={{ color: "#f44336" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "#777" }}>
                Expenses
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#111" }}
              >
                {financials.totalExpenses}
              </Typography>
            </Box>
          </Box>

          {/* Net Profit */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TrendingUpIcon sx={{ color: "#f8b500" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "#777" }}>
                Net Profit
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2a2a2a" }}
              >
                {financials.netProfit}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FinancialOverviewCard;
