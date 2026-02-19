package com.pensasha.backend.modules.user.tenant.mapper;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;

/**
 * Mapper for converting between TenantProfile entity and TenantDTO.
 * Handles extraction of lease IDs and unit IDs.
 * Ignores system-managed and identity fields when mapping from DTO.
 */
@Mapper(componentModel = "spring")
public interface TenantMapper {

    /* ====================== DTO -> ENTITY ====================== */

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true) // User is set separately
    @Mapping(target = "leases", ignore = true) // Set via service if needed
    TenantProfile toEntity(TenantDTO tenantDTO);

    /* ====================== ENTITY -> DTO ====================== */

    @Mapping(target = "leaseIds", expression = "java(getLeaseIds(tenantProfile))")
    @Mapping(target = "unitIds", expression = "java(getUnitIdsFromLeases(tenantProfile))")
    @Mapping(target = "firstName", source = "user.firstName")
    @Mapping(target = "middleName", source = "user.middleName")
    @Mapping(target = "lastName", source = "user.lastName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phoneNumber", source = "user.phoneNumber")
    @Mapping(target = "idNumber", source = "user.idNumber")
    @Mapping(target = "profilePicture", source = "user.profilePictureUrl")
    @Mapping(target = "role", source = "user.role")
    TenantDTO toDTO(TenantProfile tenantProfile);

    /* ====================== HELPER METHODS ====================== */

    default List<Long> getLeaseIds(TenantProfile tenantProfile) {
        if (tenantProfile.getLeases() == null || tenantProfile.getLeases().isEmpty()) {
            return Collections.emptyList();
        }
        return tenantProfile.getLeases()
                .stream()
                .map(Lease::getId)
                .collect(Collectors.toList());
    }

    default List<Long> getUnitIdsFromLeases(TenantProfile tenantProfile) {
        if (tenantProfile.getLeases() == null || tenantProfile.getLeases().isEmpty()) {
            return Collections.emptyList();
        }
        return tenantProfile.getLeases()
                .stream()
                .map(Lease::getUnit)
                .filter(unit -> unit != null)
                .map(unit -> unit.getId())
                .distinct()
                .collect(Collectors.toList());
    }
}
