package com.pensasha.backend.modules.unit.dto;

import jakarta.validation.constraints.*;  // Importing validation annotations from Jakarta API
import lombok.*;  // Importing Lombok annotations for generating boilerplate code

// DTO class used to represent a unit with validation constraints
@Data  // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor  // Lombok annotation to generate an all-arguments constructor
public class UnitDTO {

    // The unit number, required to be a non-blank string
    @NotBlank(message = "Unit number is required")  // Ensures that the unit number is not blank
    private String unitNumber;

    // The rent amount for the unit, required to be a positive number
    @NotNull(message = "Rent amount is required")  // Ensures that the rent amount is not null
    @Positive(message = "Rent amount must be a positive number")  // Ensures the rent amount is positive
    private Double rentAmount;

    // Occupancy status of the unit, required to be not null (true or false)
    @NotNull(message = "Occupancy status is required")  // Ensures that the occupancy status is not null
    private Boolean isOccupied;

    // The property ID to which the unit belongs, required to be not null
    @NotNull(message = "Property ID is required")  // Ensures that the property ID is not null
    private Long propertyId;

    // The tenant ID, if applicable, representing the tenant renting this unit (can be null)
    private Long tenantId;
}
