package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserServiceHelper {

    /**
     * Copy fields common to all users during creation.
     */
    public void applyCreateAttributes(User user, CreateUserDTO dto) {
        user.setIdNumber(dto.getIdNumber());
        user.setRole(dto.getRole());
    }

    /**
     * Copy fields common to all users during update.
     */
    public void applyUpdateAttributes(User user, UpdateUserDTO dto) {
        user.setFirstName(dto.getFirstName());
        user.setMiddleName(dto.getMiddleName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());

    }
}
