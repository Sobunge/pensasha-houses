package com.pensasha.backend.dto;

import com.pensasha.backend.entity.Property;
import com.pensasha.backend.entity.Tenant;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitDTO {

    @NotBlank(message = "Unit number is required")
    private String unitNumber;

    @NotNull(message = "Rent amount is required")
    @Positive(message = "Rent amount must be a positive number")
    private Double rentAmount;

    @NotNull(message = "Occupancy status is required")
    private Boolean isOccupied;

    private Property property;

    private Tenant tenant;
}
