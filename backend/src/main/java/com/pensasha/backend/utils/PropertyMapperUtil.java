package com.pensasha.backend.utils;

import com.pensasha.backend.dto.PropertyDTO;
import com.pensasha.backend.dto.UnitDTO;
import com.pensasha.backend.model.Property;

import java.util.Set;
import java.util.stream.Collectors;

public class PropertyMapperUtil {

    public static PropertyDTO mapToDTO(Property property) {
        if (property == null) {
            return null;
        }

        PropertyDTO dto = new PropertyDTO();
        dto.setName(property.getName());
        dto.setDescription(property.getDescription());
        dto.setLocation(property.getLocation());
        dto.setNoOfUnits(property.getNumOfUnits());
        dto.setAmenities(property.getAmenities());

        if (property.getLandLord() != null) {
            dto.setLandLordId(property.getLandLord().getIdNumber());
        }

        if (property.getCareTaker() != null) {
            dto.setCareTakerId(property.getCareTaker().getId());
        }

        Set<UnitDTO> unitDTOs = property.getUnits().stream()
                .map(unit -> new UnitDTO(unit.getId(), unit.getName(), unit.getRentAmount()))
                .collect(Collectors.toSet());
        dto.setUnits(unitDTOs);

        return dto;
    }
}
