package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Factory for creating User entities.
 * Handles setting common attributes and roles.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class UserFactory {

    private final UserServiceHelper userServiceHelper;

    /**
     * Creates a base User entity from a DTO.
     * Assigns all roles from the DTO to the User.
     */
    public User createUser(CreateUserDTO dto) {
        if (dto == null || dto.getRoles() == null || dto.getRoles().isEmpty()) {
            throw new IllegalArgumentException("UserDTO and roles cannot be null or empty");
        }

        log.info("Creating base user with roles: {}", dto.getRoles());

        User user = new User();
        userServiceHelper.applyCreateAttributes(user, dto);

        // Assign roles from DTO
        user.getRoles().addAll(dto.getRoles());

        log.debug("Created base User with phone {}", user.getPhoneNumber());
        return user;
    }
}