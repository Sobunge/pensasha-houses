package com.pensasha.backend.modules.property.mapper;

import org.mapstruct.*;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.dto.createPropertyDTO;
import com.pensasha.backend.modules.property.helper.PropertyMapperHelper;
import com.pensasha.backend.modules.unit.mapper.UnitMapper;

@Mapper(
    componentModel = "spring", 
    uses = {UnitMapper.class, PropertyMapperHelper.class},
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface PropertyMapper {

    /**
     * Map General PropertyDTO to a new Property entity.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "careTakerId", qualifiedByName = "caretakerIdToCaretaker")
    Property toEntity(PropertyDTO propertyDTO);

    /**
     * Map createPropertyDTO to a new Property entity.
     * Uses 'caretakerId' (lowercase 't') from the create DTO.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "caretakerId", qualifiedByName = "caretakerIdToCaretaker")
    @Mapping(target = "units", source = "unitIds", qualifiedByName = "unitIdsToUnits")
    Property fromCreateDTO(createPropertyDTO createDTO);

    /**
     * Map Property entity to PropertyDTO for responses.
     */
    @Mapping(target = "landLordId", source = "landlord.id")
    @Mapping(target = "careTakerId", source = "caretaker.id")
    PropertyDTO toDTO(Property property);

    /**
     * Updates an existing Property entity instance from a PropertyDTO.
     * Null values in the DTO will not overwrite existing data in the Entity.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "careTakerId", qualifiedByName = "caretakerIdToCaretaker")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(PropertyDTO dto, @MappingTarget Property property);
}