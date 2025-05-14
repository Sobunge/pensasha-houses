package com.pensasha.backend.modules.user.tenant.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

@Mapper(componentModel = "spring")
public interface TenantMapper {

    @Mappings({
            @Mapping(target = "accountExpirationDate", ignore = true),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "locked", ignore = true),
            @Mapping(target = "passwordExpirationDate", ignore = true),
            @Mapping(target = "leases", ignore = true),
            @Mapping(target = "rentalUnits", ignore = true)
    })
    Tenant toEntity(TenantDTO tenantDTO);

    @Mapping(target = "rentalUnitIds", expression = "java(getUnitIds(tenant))")
    @Mapping(target = "leaseIds", expression = "java(getLeaseIds(tenant))")
    TenantDTO toDTO(Tenant tenant);

    // Helper methods for custom field mapping
    default List<Long> getUnitIds(Tenant tenant) {
        if (tenant.getRentalUnits() == null)
            return null;
        return tenant.getRentalUnits().stream()
                .map(unit -> unit.getId())
                .collect(Collectors.toList());
    }

    default List<Long> getLeaseIds(Tenant tenant) {
        if (tenant.getLeases() == null)
            return null;
        return tenant.getLeases().stream()
                .map(lease -> lease.getId())
                .collect(Collectors.toList());
    }
}
