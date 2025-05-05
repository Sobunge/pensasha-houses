package com.pensasha.backend.dto;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.dto.UserDTO;

import jakarta.validation.constraints.*;  // Importing validation annotations from Jakarta API
import lombok.*;  // Importing Lombok annotations for generating boilerplate code

// DTO class used to represent a tenant with validation constraints
@Getter  // Lombok annotation to generate getter methods for all fields
@Setter  // Lombok annotation to generate setter methods for all fields
@NoArgsConstructor  // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor  // Lombok annotation to generate an all-arguments constructor
public class TenantDTO extends UserDTO {

    // The rental unit assigned to the tenant
    private Unit rentalUnit;  // A field that links the tenant to their rental unit

    // The lease start date, required to be a non-blank string
    @NotBlank(message = "Lease start date is required")  // Ensures the lease start date is not blank
    private String leaseStartDate;

    // The lease end date, required to be a non-blank string
    @NotBlank(message = "Lease end date is required")  // Ensures the lease end date is not blank
    private String leaseEndDate;

    // Monthly rent amount, required to be a positive number
    @NotNull(message = "Monthly rent is required")  // Ensures that the rent is not null
    @Positive(message = "Rent amount must be a positive number")  // Ensures the rent amount is greater than 0
    private Double monthlyRent;

    // Emergency contact number, required to follow a specific phone number pattern (10 to 15 digits)
    @NotBlank(message = "Emergency contact is required")  // Ensures the emergency contact number is not blank
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid emergency contact number")  // Validates the phone number format
    private String emergencyContact;
}
