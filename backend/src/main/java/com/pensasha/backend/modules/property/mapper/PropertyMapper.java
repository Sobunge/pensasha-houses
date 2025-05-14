package com.pensasha.backend.modules.property.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.dto.PropertyDTO;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    // Map from DTO to Entity
    @Mapping(target = "id", ignore = true) // Assuming DTO doesn't have id
    @Mapping(target = "units", ignore = true) // You can adjust this if you need
    @Mapping(target = "landLord.id", source = "landLordId")
    @Mapping(target = "careTaker.id", source = "careTakerId")
    Property toEntity(PropertyDTO propertyDTO);

    // Map from Entity to DTO
    @Mapping(target = "landLordId", source = "landLord.id")
    @Mapping(target = "careTakerId", source = "careTaker.id")
    PropertyDTO toDTO(Property property);
}
