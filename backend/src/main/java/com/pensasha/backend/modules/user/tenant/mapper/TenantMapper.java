package com.pensasha.backend.modules.user.tenant.mapper;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.Permission;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.unit.Unit;

/**
 * Mapper for converting between TenantProfile entity and TenantDTO.
 * Handles lease extraction, unit IDs, roles, and permissions.
 */
@Mapper(componentModel = "spring")
public interface TenantMapper {

    /* ====================== DTO -> ENTITY ====================== */

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "leases", ignore = true)
    TenantProfile toEntity(com.pensasha.backend.modules.user.tenant.dto.TenantDTO tenantDTO);

    /* ====================== ENTITY -> DTO ====================== */

    @Mapping(target = "leaseIds", expression = "java(getLeaseIds(tenantProfile))")
    @Mapping(target = "unitIds", expression = "java(getUnitIdsFromLeases(tenantProfile))")
    @Mapping(target = "roles", expression = "java(getRoleNames(tenantProfile))")
    @Mapping(target = "permissions", expression = "java(getPermissions(tenantProfile))")
    @Mapping(target = "firstName", source = "user.firstName")
    @Mapping(target = "middleName", source = "user.middleName")
    @Mapping(target = "lastName", source = "user.lastName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phoneNumber", source = "user.phoneNumber")
    @Mapping(target = "idNumber", source = "user.idNumber")
    @Mapping(target = "profilePicture", source = "user.profilePictureUrl")
    com.pensasha.backend.modules.user.tenant.dto.TenantDTO toDTO(TenantProfile tenantProfile);

    /* ====================== HELPERS ====================== */

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
                .map(Unit::getId)
                .distinct()
                .collect(Collectors.toList());
    }

    /* ====================== ROLE + PERMISSION ====================== */

    default Set<String> getRoleNames(TenantProfile tenantProfile) {
        if (tenantProfile.getUser() == null || tenantProfile.getUser().getRoles() == null) {
            return Collections.emptySet();
        }

        return tenantProfile.getUser().getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }

    default Set<String> getPermissions(TenantProfile tenantProfile) {
        if (tenantProfile.getUser() == null || tenantProfile.getUser().getRoles() == null) {
            return Collections.emptySet();
        }

        Set<String> permissions = new HashSet<>();
        for (Role role : tenantProfile.getUser().getRoles()) {
            if (role.getPermissions() != null) {
                for (Permission permission : role.getPermissions()) {
                    if (permission != null && permission.getName() != null) {
                        permissions.add(permission.getName());
                    }
                }
            }
        }
        return permissions;
    }
}