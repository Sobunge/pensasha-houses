package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Factory for creating User entities.
 * Delegates attribute and role assignment to UserServiceHelper.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class UserFactory {

    private final UserServiceHelper userServiceHelper;

    /**
     * Creates a base User entity from a DTO.
     */
    public User createUser(CreateUserDTO dto) {
        if (dto == null || dto.getRoles() == null || dto.getRoles().isEmpty()) {
            throw new IllegalArgumentException("UserDTO and roles cannot be null or empty");
        }

        log.info("Creating base user with roles: {}", dto.getRoles());

        User user = new User();

        // Delegate all attribute + role logic
        userServiceHelper.applyCreateAttributes(user, dto);

        log.debug("Created base User with phone {}", user.getPhoneNumber());
        return user;
    }
}