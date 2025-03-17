package com.pensasha.backend.user.models.dto;

import com.pensasha.backend.houses.Unit;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenantDTO extends UserDTO{

    private Unit rentalUnit;

    @NotBlank(message = "Lease start date is required")
    private String leaseStartDate;

    @NotBlank(message = "Lease end date is required")
    private String leaseEndDate;

    @NotNull(message = "Monthly rent is required")
    @Positive(message = "Rent amount must be a positive number")
    private Double monthlyRent;

    @NotBlank(message = "Emergency contact is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid emergency contact number")
    private String emergencyContact;
    
}
