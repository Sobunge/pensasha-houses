package com.pensasha.backend.modules.user.landlord.dto;

import java.math.BigDecimal;

public class LandlordStatsDTO {
    private Integer occupancyRate;
    private Long occupiedUnits;
    private Long totalOccupancyUnits;
    private Long totalUnits;
    private Long propertyCount;
    private BigDecimal pendingRent;

    public LandlordStatsDTO() {
    }

    public LandlordStatsDTO(Integer occupancyRate, Long occupiedUnits, Long totalOccupancyUnits,
            Long totalUnits, Long propertyCount, BigDecimal pendingRent) {
        this.occupancyRate = occupancyRate;
        this.occupiedUnits = occupiedUnits;
        this.totalOccupancyUnits = totalOccupancyUnits;
        this.totalUnits = totalUnits;
        this.propertyCount = propertyCount;
        this.pendingRent = pendingRent;
    }

    // Getters and Setters
    public Integer getOccupancyRate() {
        return occupancyRate;
    }

    public void setOccupancyRate(Integer occupancyRate) {
        this.occupancyRate = occupancyRate;
    }

    public Long getOccupiedUnits() {
        return occupiedUnits;
    }

    public void setOccupiedUnits(Long occupiedUnits) {
        this.occupiedUnits = occupiedUnits;
    }

    public Long getTotalOccupancyUnits() {
        return totalOccupancyUnits;
    }

    public void setTotalOccupancyUnits(Long totalOccupancyUnits) {
        this.totalOccupancyUnits = totalOccupancyUnits;
    }

    public Long getTotalUnits() {
        return totalUnits;
    }

    public void setTotalUnits(Long totalUnits) {
        this.totalUnits = totalUnits;
    }

    public Long getPropertyCount() {
        return propertyCount;
    }

    public void setPropertyCount(Long propertyCount) {
        this.propertyCount = propertyCount;
    }

    public BigDecimal getPendingRent() {
        return pendingRent;
    }

    public void setPendingRent(BigDecimal pendingRent) {
        this.pendingRent = pendingRent;
    }

}
