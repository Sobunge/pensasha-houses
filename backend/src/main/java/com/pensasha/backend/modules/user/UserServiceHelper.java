package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Component;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import lombok.AllArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Component
@AllArgsConstructor
public class UserServiceHelper {

    private final RoleRepository roleRepository;

    /**
     * Copy fields common to all users during creation.
     * Converts role names (String) -> Role entities.
     */
    public void applyCreateAttributes(User user, CreateUserDTO dto) {
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        
        // --- FIX: Map the email field from the DTO ---
        user.setEmail(dto.getEmail());

        // Initialize roles set
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }

        // Convert and assign roles
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>();

            for (String roleName : dto.getRoles()) {
                // toUpperCase() ensures "tenant" matches "TENANT" in the DB
                Role role = roleRepository.findByName(roleName.toUpperCase())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Role not found: " + roleName));
                roles.add(role);
            }

            user.setRoles(roles);
        }
    }

    /**
     * Copy fields common to all users during update.
     * Converts role names (String) -> Role entities.
     */
    public void applyUpdateAttributes(User user, UpdateUserDTO dto) {
        user.setFirstName(dto.getFirstName());
        user.setMiddleName(dto.getMiddleName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());

        // Update roles safely
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>();

            for (String roleName : dto.getRoles()) {
                Role role = roleRepository.findByName(roleName.toUpperCase())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Role not found: " + roleName));
                roles.add(role);
            }

            user.setRoles(roles);
        }
    }
}