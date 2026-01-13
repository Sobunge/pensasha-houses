package com.pensasha.backend.modules.unit.mapper;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.dto.UnitDTO;
import com.pensasha.backend.modules.unit.helper.UnitMapperHelper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

/**
 * MapStruct mapper interface for converting between Unit entities and UnitDTOs.
 * This separates domain logic from data transfer operations, ensuring clean and consistent mapping.
 */
@Component
@Mapper(componentModel = "spring", uses = UnitMapperHelper.class)
public interface UnitMapper {

    /**
     * Maps a Unit entity to a UnitDTO.
     * 
     * - Maps the 'property.id' from the Unit entity to 'propertyId' in the DTO.
     * - Maps the 'tenant.id' from the Unit entity to 'tenantId' in the DTO.
     * 
     * @param unit the Unit entity to convert.
     * @return a UnitDTO containing mapped values.
     */
    @Mapping(target = "propertyId", ignore = true)
    @Mapping(target = "tenantId", ignore = true)
    UnitDTO toDTO(Unit unit);

    /**
     * Maps a UnitDTO to a Unit entity.
     * 
     * - Ignores mapping for 'property' and 'tenant' associations when converting.
     *   These relationships should be set explicitly in the service layer after mapping.
     * 
     * @param dto the UnitDTO containing data to be converted.
     * @return a Unit entity object.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tenant", source = "tenantId", qualifiedByName = "tenantIdToTenant")
    @Mapping(target = "property", source = "propertyId", qualifiedByName = "propertyIdToProperty")
    @Mapping(target = "maintenanceRequests", ignore = true)
    Unit toEntity(UnitDTO dto);
}
