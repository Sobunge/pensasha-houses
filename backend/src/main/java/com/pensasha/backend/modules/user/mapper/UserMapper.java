package com.pensasha.backend.modules.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

import java.util.Set;

/**
 * Mapper for converting between User entity and DTOs.
 * Supports:
 * - Full conversion to GetUserDTO
 * - Partial updates via UpdateUserDTO (ignores system-managed fields)
 * - Optional multi-role updates
 */
@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    /* ===================== READ ===================== */

    /**
     * Converts a User entity to a GetUserDTO.
     * Maps profilePictureUrl in entity to profilePicture in DTO.
     *
     * @param user the User entity
     * @return the DTO representation
     */
    @Mapping(target = "profilePicture", source = "profilePictureUrl")
    GetUserDTO toDTO(User user);

    /* ===================== UPDATE ===================== */

    /**
     * Updates an existing User entity from UpdateUserDTO.
     * Ignores read-only/system-managed fields:
     * id, publicId, idNumber, audit fields, and profile statuses.
     * Multi-role updates are applied if roles are provided in DTO.
     *
     * @param user the existing User entity to update
     * @param dto  the DTO containing updated values
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "publicId", ignore = true)
    @Mapping(target = "idNumber", ignore = true)
    @Mapping(target = "profilePictureUrl", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "profileCompletionStatus", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "tenantProfile", ignore = true)
    @Mapping(target = "landlordProfile", ignore = true)
    @Mapping(target = "caretakerProfile", ignore = true)
    void updateEntity(@MappingTarget User user, UpdateUserDTO dto);

    /**
     * Helper method to update roles in the entity.
     * Can be called manually after mapping if dto.getRoles() is not null.
     */
    default void updateRoles(User user, Set<com.pensasha.backend.modules.user.Role> roles) {
        if (roles != null && !roles.isEmpty()) {
            user.setRoles(roles);
        }
    }
}