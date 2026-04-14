package com.pensasha.backend.modules.unit.dto;

import com.pensasha.backend.modules.unit.UnitStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal; // Use BigDecimal for financial precision

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitDTO {

    private Long id;

    @NotBlank(message = "Unit number is required")
    private String unitNumber;

    @NotNull(message = "Rent amount is required")
    @Positive(message = "Rent amount must be a positive number")
    private BigDecimal rentAmount;

    @NotNull(message = "Occupancy status is required")
    private UnitStatus status;

    @NotNull(message = "Property ID is required")
    private Long propertyId;

    private Long tenantId;
}