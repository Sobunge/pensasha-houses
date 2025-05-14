package com.pensasha.backend.modules.user.caretaker.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.caretaker.Caretaker;
import com.pensasha.backend.modules.user.caretaker.dto.CaretakerDTO;

@Mapper(componentModel = "spring")
public interface CaretakerMapper {

    @Mapping(source = "assignedProperty.id", target = "propertyId")
    CaretakerDTO toDTO(Caretaker caretaker);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "locked", ignore = true)
    @Mapping(target = "accountExpirationDate", ignore = true)
    @Mapping(target = "passwordExpirationDate", ignore = true)
    @Mapping(source = "propertyId", target = "assignedProperty", qualifiedByName = "mapPropertyIdToProperty")
    Caretaker toEntity(CaretakerDTO caretakerDTO);

    @Named("mapPropertyIdToProperty")
    default Property mapPropertyIdToProperty(Long propertyId) {
        if (propertyId == null) {
            return null;
        }
        Property property = new Property();
        property.setId(propertyId);
        return property;
    }

}
