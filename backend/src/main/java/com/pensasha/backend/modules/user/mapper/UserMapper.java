package com.pensasha.backend.modules.user.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

/**
 * Mapper for converting between User entity and DTOs.
 *
 * Responsibilities:
 * - Entity → DTO conversion (including roles & permissions flattening)
 * - Partial updates (excluding system-managed fields)
 *
 * NOTE:
 * - Does NOT handle DTO → Entity role resolution (handled in service layer)
 */
@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserMapper {

    /* ===================== READ ===================== */

    @Mapping(target = "profilePicture", source = "profilePictureUrl")
    @Mapping(target = "roles", expression = "java(mapPermissions(user.getRoles()))")
    GetUserDTO toDTO(User user);

    /* ===================== UPDATE ===================== */

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "publicId", ignore = true)
    @Mapping(target = "idNumber", ignore = true)
    @Mapping(target = "profilePictureUrl", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "profileCompletionStatus", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)

    // Relationships handled in service layer
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "permissions", ignore = true)
    
    @Mapping(target = "tenantProfile", ignore = true)
    @Mapping(target = "landlordProfile", ignore = true)
    @Mapping(target = "caretakerProfile", ignore = true)

    void updateEntity(@MappingTarget User user, UpdateUserDTO dto);

    /* ===================== ROLE MAPPING ===================== */

    /**
     * Maps Role → String (for DTO roles)
     */
    default String map(Role role) {
        return role.getName();
    }

    /**
     * Maps Set<Role> → Set<String>
     */
    default Set<String> map(Set<Role> roles) {
        if (roles == null) return null;

        return roles.stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }

    /**
     * Extracts permissions from roles and flattens them
     */
    default Set<String> mapPermissions(Set<Role> roles) {
        if (roles == null) return null;

        return roles.stream()
                .filter(role -> role.getPermissions() != null)
                .flatMap(role -> role.getPermissions().stream())
                .map(permission -> permission.getName())
                .collect(Collectors.toSet());
    }
}