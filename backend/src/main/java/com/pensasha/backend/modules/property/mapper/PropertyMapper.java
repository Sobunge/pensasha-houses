package com.pensasha.backend.modules.property.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.unit.mapper.UnitMapper;

/**
 * MapStruct mapper interface for converting between Property entities and
 * PropertyDTOs.
 * This helps decouple the domain model from the data transfer layer and ensures
 * clean, automated mappings.
 */
@Mapper(componentModel = "spring", uses = UnitMapper.class)
public interface PropertyMapper {

    /**
     * Maps a PropertyDTO object to a Property entity.
     * 
     * - Ignores the 'id' field on the entity when mapping, as DTO typically doesn't
     * carry the entity ID.
     * - Maps 'landLordId' from the DTO to 'landLord.id' in the entity.
     * - Maps 'careTakerId' from the DTO to 'careTaker.id' in the entity.
     * 
     * @param propertyDTO the data transfer object containing property details.
     * @return a Property entity object.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landLord.id", source = "landLordId")
    @Mapping(target = "careTaker.id", source = "careTakerId")
    Property toEntity(PropertyDTO propertyDTO);

    /**
     * Maps a Property entity to a PropertyDTO.
     * 
     * - Extracts 'landLord.id' from the entity and assigns it to 'landLordId' in
     * the DTO.
     * - Extracts 'careTaker.id' from the entity and assigns it to 'careTakerId' in
     * the DTO.
     * 
     * @param property the Property entity to be converted.
     * @return a PropertyDTO object containing property details.
     */
    @Mapping(target = "landLordId", source = "landLord.id")
    @Mapping(target = "careTakerId", source = "careTaker.id")
    PropertyDTO toDTO(Property property);
}
