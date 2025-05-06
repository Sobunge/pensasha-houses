package com.pensasha.backend.utils;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.unit.dto.UnitDTO;

import java.util.Set;
import java.util.stream.Collectors;

public class PropertyMapperUtil {

    // Maps a Property entity to a PropertyDTO
    public static PropertyDTO mapToDTO(Property property) {
        // If the property is null, return null (no mapping needed)
        if (property == null) {
            return null;
        }

        // Create a new PropertyDTO to store the mapped data
        PropertyDTO propertyDTO = new PropertyDTO();

        // Map the basic property fields from the entity to the DTO
        propertyDTO.setName(property.getName()); // Set the name of the property
        propertyDTO.setDescription(property.getDescription()); // Set the description of the property
        propertyDTO.setLocation(property.getLocation()); // Set the location of the property
        propertyDTO.setNumOfUnits(property.getNumOfUnits()); // Set the number of units in the property
        propertyDTO.setAmenities(property.getAmenities()); // Set the amenities available for the property

        // If the Landlord object is present, set only the Landlord ID in the DTO
        if (property.getLandLord() != null) {
            propertyDTO.setLandLordId(property.getLandLord().getIdNumber()); // Set only the Landlord's ID, not the full object
        }

        // If the Caretaker object is present, set only the Caretaker ID in the DTO
        if (property.getCareTaker() != null) {
            propertyDTO.setCareTakerId(property.getCareTaker().getIdNumber()); // Set only the Caretaker's ID, not the full object
        }

        // Map the units associated with the property using UnitDTOs
        Set<UnitDTO> unitDTOs = property.getUnits().stream()
                .map(unit -> new UnitDTO(
                        unit.getUnitNumber(), // Set the unit number
                        unit.getRentAmount(), // Set the rent amount for the unit
                        unit.getStatus(), // Set whether the unit is occupied
                        unit.getProperty() != null ? unit.getProperty().getId() : null, // Set the property ID (can be null if not assigned)
                        unit.getTenant() != null ? unit.getTenant().getId() : null // Set the tenant ID (can be null if not assigned)
                ))
                .collect(Collectors.toSet()); // Collect all mapped UnitDTOs into a Set

        // Set the units in the propertyDTO object
        propertyDTO.setUnits(unitDTOs);

        // Return the fully mapped PropertyDTO
        return propertyDTO;
    }
}
