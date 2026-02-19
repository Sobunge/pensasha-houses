package com.pensasha.backend.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;

import lombok.extern.slf4j.Slf4j;

/**
 * Factory for creating User and role-specific profiles.
 */
@Component
@Slf4j
public class UserFactory {

    @Autowired
    private UserServiceHelper userServiceHelper;

    /**
     * Creates a new User with common attributes from the DTO.
     */
    public User createUser(CreateUserDTO userDTO) {
        log.info("Creating base user with role: {}", userDTO.getRole());

        User user = new User();

        // copy shared fields: firstName, middleName, lastName, idNumber, phoneNumber, role
        userServiceHelper.applyCreateAttributes(user, userDTO);

        log.debug("Created User for role {} with ID {}", userDTO.getRole(), user.getIdNumber());
        return user;
    }

    /**
     * Creates a role-specific profile for a given User.
     */
    public Object createProfileForUser(User user, CreateUserDTO userDTO) {
        switch (userDTO.getRole()) {
            case TENANT -> {
                TenantProfile tenantProfile = new TenantProfile();
                tenantProfile.setUser(user);
                return tenantProfile;
            }
            case LANDLORD -> {
                LandlordProfile landlordProfile = new LandlordProfile();
                landlordProfile.setUser(user);
                return landlordProfile;
            }
            case CARETAKER -> {
                CaretakerProfile caretakerProfile = new CaretakerProfile();
                caretakerProfile.setUser(user);
                return caretakerProfile;
            }
            case ADMIN -> {
                return user; // Admin may not need a separate profile
            }
            default -> throw new IllegalArgumentException(
                    "Invalid role for user ID: " + user.getIdNumber());
        }
    }
}
