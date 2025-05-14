package com.pensasha.backend.modules.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.dto.GetUserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {

    GetUserDTO toDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "accountExpirationDate", ignore = true)
    @Mapping(target = "passwordExpirationDate", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "locked", ignore = true)
    User toEntity(GetUserDTO userDTO);
}
