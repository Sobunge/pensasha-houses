package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Component;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import lombok.AllArgsConstructor;

import java.util.HashSet;

@Component
@AllArgsConstructor
public class UserServiceHelper {

    /**
     * Copy fields common to all users during creation.
     * Safely assigns multiple roles.
     */
    public void applyCreateAttributes(User user, CreateUserDTO dto) {
        user.setPhoneNumber(dto.getPhoneNumber());

        // Initialize roles set if null
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }

        // Assign role(s) from DTO
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            user.getRoles().addAll(dto.getRoles());
        }

        // Optional names
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
    }

    /**
     * Copy fields common to all users during update.
     * Safely updates multiple roles if provided.
     */
    public void applyUpdateAttributes(User user, UpdateUserDTO dto) {
        user.setFirstName(dto.getFirstName());
        user.setMiddleName(dto.getMiddleName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());

        // Update roles safely
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            if (user.getRoles() == null) {
                user.setRoles(new HashSet<>());
            }
            user.setRoles(dto.getRoles());
        }
    }
}