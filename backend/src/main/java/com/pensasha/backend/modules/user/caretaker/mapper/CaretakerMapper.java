package com.pensasha.backend.modules.user.caretaker.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.user.caretaker.Caretaker;
import com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO;

@Mapper(componentModel = "spring")
public interface CaretakerMapper {

    // ---------------------- Entity -> Get DTO ----------------------
    @Mapping(source = "assignedProperty.id", target = "propertyId")
    GetCaretakerDTO toGetDTO(Caretaker caretaker);

    // ---------------------- Create DTO -> Entity ----------------------
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "propertyId", target = "assignedProperty", qualifiedByName = "mapPropertyIdToProperty")
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "middleName", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    Caretaker toEntity(CreateCaretakerDTO caretakerDTO);

    // ---------------------- Helper Methods ----------------------
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
