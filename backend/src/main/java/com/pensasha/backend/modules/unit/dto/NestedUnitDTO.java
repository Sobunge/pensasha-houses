package com.pensasha.backend.modules.unit.dto;

import com.pensasha.backend.modules.unit.UnitStatus;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class NestedUnitDTO {

    @NotBlank(message = "Unit number is required")
    private String unitNumber;

    @NotNull(message = "Rent amount is required")
    @Positive(message = "Rent amount must be positive")
    private BigDecimal rentAmount;

    // Ensure your Enum (UnitStatus) has a "VACANT" value
    private UnitStatus status; 
}