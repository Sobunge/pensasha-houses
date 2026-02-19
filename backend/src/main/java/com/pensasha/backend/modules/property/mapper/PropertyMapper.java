package com.pensasha.backend.modules.property.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.helper.PropertyMapperHelper;
import com.pensasha.backend.modules.unit.mapper.UnitMapper;

@Mapper(componentModel = "spring", uses = {UnitMapper.class, PropertyMapperHelper.class})
public interface PropertyMapper {

    /**
     * Map PropertyDTO to Property entity.
     * Uses PropertyMapperHelper to resolve LandlordProfile and CaretakerProfile from IDs.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "careTakerId", qualifiedByName = "caretakerIdToCaretaker")
    Property toEntity(PropertyDTO propertyDTO);

    /**
     * Map Property entity to PropertyDTO.
     * Extracts IDs from LandlordProfile and CaretakerProfile.
     */
    @Mapping(target = "landLordId", source = "landlord.id")
    @Mapping(target = "careTakerId", source = "caretaker.id")
    PropertyDTO toDTO(Property property);
}
