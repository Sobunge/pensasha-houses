package com.pensasha.backend.modules.property.dto;

import java.util.List; // Importing List to store amenities
import java.util.Set; // Importing Set to store units

import jakarta.validation.constraints.*; // Importing validation annotations from Jakarta API
import lombok.*; // Importing Lombok annotations for generating boilerplate code

// DTO class used to represent a property with validation constraints
@Data // Lombok annotation to generate getter, setter, equals, hashCode, and toString
      // methods automatically
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor // Lombok annotation to generate an all-arguments constructor
public class createPropertyDTO {

    // Name of the property, required to be non-blank and between 3 and 50
    // characters
    @NotBlank(message = "Property name is required") // Ensures the name is not blank
    @Size(min = 3, max = 50, message = "Property name must be between 3 and 50 characters") // Enforces a size
                                                                                            // constraint between 3 and
                                                                                            // 50 characters
    private String name;

    // Description of the property, required to be non-blank and between 10 and 255
    // characters
    @NotBlank(message = "Description is required") // Ensures the description is not blank
    @Size(min = 10, max = 255, message = "Description must be between 10 and 255 characters") // Enforces a size
                                                                                              // constraint between 10
                                                                                              // and 255 characters
    private String description;

    // Location of the property, required to be non-blank
    @NotBlank(message = "Location is required") // Ensures the location is not blank
    private String location;

    // Number of units in the property, required to be a non-null integer and at
    // least 1
    @NotNull(message = "Number of units is required") // Ensures the number of units is not null
    @Min(value = 1, message = "Number of units must be at least 1") // Ensures the number of units is at least 1
    private Integer numOfUnits;

    // List of amenities for the property
    private List<String> amenities;

    // ID of the landlord
    private Long landLordId;

    // ID of the caretaker, optional field
    private Long caretakerId; // Optional caretaker, hence no validation

    // A set of units associated with the propertya, stored as UnitDTO objects
    private Set<Long> unitIds; // A set of unit details associated with the property
}
