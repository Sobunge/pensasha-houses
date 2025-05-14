package com.pensasha.backend.modules.unit.mapper;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.dto.UnitDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UnitMapper {

    @Mapping(target = "propertyId", source = "property.id")
    @Mapping(target = "tenantId", source = "tenant.id")
    UnitDTO toDTO(Unit unit);

    @Mapping(target = "property", ignore = true)
    @Mapping(target = "tenant", ignore = true)
    Unit toEntity(UnitDTO dto);
}
