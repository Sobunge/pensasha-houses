package com.pensasha.backend.dto;

import java.util.List;
import java.util.Set;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    @NotBlank(message = "Property name is required")
    @Size(min = 3, max = 50, message = "Property name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 255, message = "Description must be between 10 and 255 characters")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Number of units is required")
    @Min(value = 1, message = "Number of units must be at least 1")
    private Integer noOfUnits;

    @NotEmpty(message = "Amenities list cannot be empty")
    private List<@NotBlank(message = "Amenity cannot be blank") String> amenities;

    @NotNull(message = "Landlord ID is required")
    private String landLordId;

    private String careTakerId; // Optional caretaker (changed to String for consistency)

    private Set<UnitDTO> units;
}
