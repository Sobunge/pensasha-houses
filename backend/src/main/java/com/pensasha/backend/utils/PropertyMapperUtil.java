package com.pensasha.backend.utils;

import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.dto.UnitDTO;
import com.pensasha.backend.entity.*;

import java.util.Set;
import java.util.stream.Collectors;

public class PropertyMapperUtil {

    public static PropertyDTO mapToDTO(Property property) {
        if (property == null) {
            return null;
        }

        PropertyDTO propertyDTO = new PropertyDTO();
        propertyDTO.setName(property.getName());
        propertyDTO.setDescription(property.getDescription());
        propertyDTO.setLocation(property.getLocation());
        propertyDTO.setNumOfUnits(property.getNumOfUnits());
        propertyDTO.setAmenities(property.getAmenities());

        // Set the Landlord ID instead of the full Landlord object
        if (property.getLandLord() != null) {
            propertyDTO.setLandLordId(property.getLandLord().getIdNumber()); // Set only the ID of the landlord
        }

        // Set the Caretaker ID instead of the full Caretaker object
        if (property.getCareTaker() != null) {
            propertyDTO.setCareTakerId(property.getCareTaker().getIdNumber()); // Set only the ID of the caretaker
        }

        // Map the units using UnitDTOs
        Set<UnitDTO> unitDTOs = property.getUnits().stream()
                .map(unit -> new UnitDTO(
                        unit.getUnitNumber(),
                        unit.getRentAmount(),
                        unit.isOccupied(),
                        unit.getProperty() != null ? unit.getProperty().getId() : null, // Property ID
                        unit.getTenant() != null ? unit.getTenant().getId() : null // Tenant ID (can be null if not
                                                                                   // assigned)
                ))
                .collect(Collectors.toSet());
        propertyDTO.setUnits(unitDTOs);

        return propertyDTO;
    }
}
