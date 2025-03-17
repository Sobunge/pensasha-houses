package com.pensasha.backend.user.models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.pensasha.backend.houses.Property;
import com.pensasha.backend.houses.dto.PropertyDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "caretakers")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CareTaker extends User {

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property assignedProperty;

    private Set<Property> convertToPropertyEntities(Set<PropertyDTO> propertyDTOs) {
        if (propertyDTOs == null) {
            return new HashSet<>();
        }

        return propertyDTOs.stream()
                .map(dto -> {
                    Property property = new Property();
                    property.setLandLord(dto.getLandLord()); // Ensure LandLord exists
                    property.setUnits(dto.getUnits()); // Ensure Unit is mapped
                    return property;
                })
                .collect(Collectors.toSet());
    }

}
