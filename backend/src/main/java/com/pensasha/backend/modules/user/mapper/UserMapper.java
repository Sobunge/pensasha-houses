package com.pensasha.backend.modules.user.mapper;

import org.mapstruct.Mapper;

import com.pensasha.backend.modules.user.User;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    CreateUserDTO toDTO (User user);
    User toEntity (CreateUserDTO userDTO);
}
