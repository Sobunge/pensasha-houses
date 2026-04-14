package com.pensasha.backend.modules.unit.mapper;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.dto.UnitDTO;
import com.pensasha.backend.modules.unit.helper.UnitMapperHelper;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = UnitMapperHelper.class)
public interface UnitMapper {

    // ====================== Entity -> DTO ======================
    @Mapping(source = "property", target = "propertyId", qualifiedByName = "propertyToPropertyId")
    @Mapping(source = "tenant", target = "tenantId", qualifiedByName = "tenantToTenantId")
    UnitDTO toDTO(Unit unit);

    // ====================== DTO -> Entity ======================
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "propertyId", target = "property", qualifiedByName = "propertyIdToProperty")
    @Mapping(source = "tenantId", target = "tenant", qualifiedByName = "tenantIdToTenantProfile")
    @Mapping(target = "maintenanceRequests", ignore = true)
    Unit toEntity(UnitDTO dto);

    // Adding this for Update operations
    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(UnitDTO dto, @MappingTarget Unit unit);
}