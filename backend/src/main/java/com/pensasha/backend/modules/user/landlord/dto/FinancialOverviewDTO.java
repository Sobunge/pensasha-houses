package com.pensasha.backend.modules.user.landlord.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FinancialOverviewDTO {
    private List<MonthlyDataPoint> monthlyData;
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netProfit;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyDataPoint {
        private String month;
        private BigDecimal income;
        private BigDecimal expenses;
    }
}