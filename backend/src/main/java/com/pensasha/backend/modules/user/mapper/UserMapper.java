package com.pensasha.backend.modules.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

/**
 * Mapper for converting between User entity and DTOs.
 * Supports:
 * - Full conversion to GetUserDTO
 * - Partial updates via UpdateUserDTO (ignores system-managed fields)
 */
@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    /* ===================== READ ===================== */

    /**
     * Converts a User entity to a GetUserDTO.
     * Maps all relevant fields including optional ones.
     *
     * @param user the User entity
     * @return the DTO representation
     */
    @Mapping(target = "profilePicture", source = "profilePictureUrl") // map correctly
    GetUserDTO toDTO(User user);

    /* ===================== UPDATE ===================== */

    /**
     * Updates an existing User entity from UpdateUserDTO.
     * Ignores read-only or system-managed fields:
     * - id
     * - role
     * - idNumber (cannot change once set)
     * - profilePictureUrl (updated separately if needed)
     *
     * @param user the existing User entity to update
     * @param dto  the DTO containing updated values
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "idNumber", ignore = true)
    @Mapping(target = "profilePictureUrl", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "profileCompletionStatus", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget User user, UpdateUserDTO dto);

}
