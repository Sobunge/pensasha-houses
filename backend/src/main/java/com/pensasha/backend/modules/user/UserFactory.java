package com.pensasha.backend.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.tenant.TenantProfile;

import lombok.extern.slf4j.Slf4j;

/**
 * Factory for creating User and role-specific profiles.
 * Uses type-safe return values for role-specific profiles.
 */
@Component
@Slf4j
public class UserFactory {

    @Autowired
    private UserServiceHelper userServiceHelper;

    /**
     * Creates a base User entity from the DTO.
     */
    public User createUser(CreateUserDTO userDTO) {
        if (userDTO == null || userDTO.getRole() == null) {
            throw new IllegalArgumentException("UserDTO and role cannot be null");
        }

        log.info("Creating base user with role: {}", userDTO.getRole());

        User user = new User();
        userServiceHelper.applyCreateAttributes(user, userDTO);

        log.debug("Created base User for role {} with phone {}", userDTO.getRole(), user.getPhoneNumber());
        return user;
    }

    /**
     * Interface for role-specific profiles.
     */
    public interface UserProfile {
        User getUser();
        void setUser(User user);
    }

    /**
     * Creates a role-specific profile for a given user.
     * Returns UserProfile for type safety.
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
                // Admins may not have a separate profile, return null
                return null;
            }
            default -> throw new IllegalArgumentException(
                    "Invalid role for user with phone: " + user.getPhoneNumber());
        }
    }
}