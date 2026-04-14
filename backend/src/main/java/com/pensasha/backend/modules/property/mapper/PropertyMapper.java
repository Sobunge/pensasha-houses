package com.pensasha.backend.modules.property.mapper;

import org.mapstruct.*;
import com.pensasha.backend.modules.property.Property;
import com.pensasha.backend.modules.property.dto.PropertyDTO;
import com.pensasha.backend.modules.property.dto.createPropertyDTO;
import com.pensasha.backend.modules.property.helper.PropertyMapperHelper;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.mapper.UnitMapper;
import java.util.stream.Collectors;

@Mapper(
    componentModel = "spring", 
    uses = {UnitMapper.class, PropertyMapperHelper.class},
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface PropertyMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "careTakerId", qualifiedByName = "caretakerIdToCaretaker")
    Property toEntity(PropertyDTO propertyDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "caretakerId", qualifiedByName = "caretakerIdToCaretaker")
    @Mapping(target = "units", ignore = true) 
    Property fromCreateDTO(createPropertyDTO createDTO);

    /**
     * MapStruct AfterMapping to handle the Set<Unit> conversion and Parent-Child linking.
     */
    @AfterMapping
    default void handleUnitsMapping(@MappingTarget Property property, createPropertyDTO createDTO) {
        if (createDTO.getUnits() != null) {
            // FIXED: Using Collectors.toSet() to match the Entity's Set<Unit> type
            property.setUnits(createDTO.getUnits().stream().map(unitDto -> {
                Unit unit = new Unit();
                unit.setUnitNumber(unitDto.getUnitNumber());
                unit.setRentAmount(unitDto.getRentAmount());
                unit.setStatus(unitDto.getStatus());
                unit.setProperty(property); 
                return unit;
            }).collect(Collectors.toSet())); 
        }
    }

    @Mapping(target = "landLordId", source = "landlord.id")
    @Mapping(target = "careTakerId", source = "caretaker.id")
    PropertyDTO toDTO(Property property);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "landlord", source = "landLordId", qualifiedByName = "landlordIdToLandlord")
    @Mapping(target = "caretaker", source = "careTakerId", qualifiedByName = "caretakerIdToCaretaker")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(PropertyDTO dto, @MappingTarget Property property);
}