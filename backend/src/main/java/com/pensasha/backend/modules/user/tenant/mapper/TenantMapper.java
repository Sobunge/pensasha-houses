package com.pensasha.backend.modules.user.tenant.mapper;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

@Mapper(componentModel = "spring")
public interface TenantMapper {

    // TenantDTO -> Tenant
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "locked", ignore = true)
    @Mapping(target = "accountExpirationDate", ignore = true)
    @Mapping(target = "passwordExpirationDate", ignore = true)
    @Mapping(target = "leases", ignore = true)
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "secondName", ignore = true)
    @Mapping(target = "thirdName", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    Tenant toEntity(TenantDTO tenantDTO);

    // Tenant -> TenantDTO
    @Mapping(target = "leaseIds", expression = "java(getLeaseIds(tenant))")
    @Mapping(target = "unitIds", expression = "java(getUnitIdsFromLeases(tenant))")
    TenantDTO toDTO(Tenant tenant);

    // Extract lease IDs
    default List<Long> getLeaseIds(Tenant tenant) {
        if (tenant.getLeases() == null || tenant.getLeases().isEmpty()) {
            return Collections.emptyList();
        }
        return tenant.getLeases()
                     .stream()
                     .map(Lease::getId)
                     .collect(Collectors.toList());
    }

    // Derive unit IDs via leases (single source of truth)
    default List<Long> getUnitIdsFromLeases(Tenant tenant) {
        if (tenant.getLeases() == null || tenant.getLeases().isEmpty()) {
            return Collections.emptyList();
        }
        return tenant.getLeases()
                     .stream()
                     .map(Lease::getUnit)
                     .filter(unit -> unit != null)
                     .map(unit -> unit.getId())
                     .distinct()
                     .collect(Collectors.toList());
    }
}
