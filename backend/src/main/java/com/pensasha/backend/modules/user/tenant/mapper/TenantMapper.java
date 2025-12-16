package com.pensasha.backend.modules.user.tenant.mapper;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

@Mapper(componentModel = "spring")
public interface TenantMapper {

    // Map TenantDTO -> Tenant entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "locked", ignore = true)
    @Mapping(target = "accountExpirationDate", ignore = true)
    @Mapping(target = "passwordExpirationDate", ignore = true)
    @Mapping(target = "leases", ignore = true)
    @Mapping(target = "rentalUnits", ignore = true)
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "secondName", ignore = true)
    @Mapping(target = "thirdName", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    Tenant toEntity(TenantDTO tenantDTO);

    // Map Tenant -> TenantDTO, safely converting lists to IDs
    @Mapping(target = "rentalUnitIds", expression = "java(getUnitIds(tenant))")
    @Mapping(target = "leaseIds", expression = "java(getLeaseIds(tenant))")
    TenantDTO toDTO(Tenant tenant);

    // Helper method to safely extract rental unit IDs
    default List<Long> getUnitIds(Tenant tenant) {
        if (tenant.getRentalUnits() == null || tenant.getRentalUnits().isEmpty()) {
            return Collections.emptyList();
        }
        return tenant.getRentalUnits().stream()
                     .map(unit -> unit.getId())
                     .collect(Collectors.toList());
    }

    // Helper method to safely extract lease IDs
    default List<Long> getLeaseIds(Tenant tenant) {
        if (tenant.getLeases() == null || tenant.getLeases().isEmpty()) {
            return Collections.emptyList();
        }
        return tenant.getLeases().stream()
                     .map(lease -> lease.getId())
                     .collect(Collectors.toList());
    }
}
