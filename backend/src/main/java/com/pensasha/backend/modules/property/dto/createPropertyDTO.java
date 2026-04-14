package com.pensasha.backend.modules.property.dto;

import java.util.List;

import com.pensasha.backend.modules.unit.dto.NestedUnitDTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class createPropertyDTO {

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
    private Integer numOfUnits;

    private List<String> amenities;

    @NotNull(message = "Landlord ID is required")
    private Long landLordId;

    private Long caretakerId; 

    // CHANGE: Instead of Set<Long> unitIds, use a list of unit objects
    @NotEmpty(message = "Unit details are required")
    @Valid // This triggers validation on the individual units
    private List<NestedUnitDTO> units; 
}