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
 * Supports partial updates via UpdateUserDTO and full conversion to GetUserDTO.
 */
@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserMapper {

    /* ===================== READ ===================== */

    /**
     * Converts a User entity to a GetUserDTO.
     * @param user The User entity.
     * @return The DTO representation.
     */
    GetUserDTO toDTO(User user);

    /* ===================== UPDATE ===================== */

    /**
     * Updates an existing User entity from UpdateUserDTO.
     * Ignores read-only or system-managed fields such as id and role.
     *
     * @param user The existing User entity to update.
     * @param dto  The DTO containing updated values.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)  // Role is managed separately
    @Mapping(target = "profilePicture", ignore = true)
    void updateEntity(@MappingTarget User user, UpdateUserDTO dto);
}
