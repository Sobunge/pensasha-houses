package com.pensasha.backend.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.caretaker.Caretaker;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.tenant.Tenant;

import lombok.extern.slf4j.Slf4j;

/**
 * Factory component responsible for creating User entity instances during registration.
 * Copies common attributes and sets the role.
 * Role-specific attributes can be added later via profile update.
 * Authentication info (password, lock, enabled) is handled separately in UserCredentials.
 */
@Component
@Slf4j
public class UserFactory {

    @Autowired
    private UserServiceHelper userServiceHelper;

    /**
     * Creates a new User entity based on the role in the DTO.
     * Only copies common attributes (firstName, middleName, lastName, idNumber, phoneNumber, role).
     *
     * @param userDTO The DTO containing user information.
     * @return A new User (Tenant, Landlord, Caretaker, or Admin) entity.
     */
    public User createUser(CreateUserDTO userDTO) {
        log.info("Creating user with role: {}", userDTO.getRole());

        User user;

        switch (userDTO.getRole()) {
            case TENANT -> user = new Tenant();
            case LANDLORD -> user = new LandLord();
            case CARETAKER -> user = new Caretaker();
            case ADMIN -> user = new User() {}; // Anonymous subclass since User is abstract
            default -> throw new IllegalArgumentException(
                    "Invalid user type provided for ID: " + userDTO.getIdNumber());
        }

        // Copy common fields (id, role)
        userServiceHelper.applyCreateAttributes(user, userDTO);

        log.debug("Created {} with ID {}", user.getClass().getSimpleName(), user.getIdNumber());
        return user;
    }
}
