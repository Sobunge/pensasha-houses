package com.pensasha.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pensasha.backend.dto.CareTakerDTO;
import com.pensasha.backend.dto.LandLordDTO;
import com.pensasha.backend.dto.TenantDTO;
import com.pensasha.backend.dto.UserDTO;
import com.pensasha.backend.entity.CareTaker;
import com.pensasha.backend.entity.LandLord;
import com.pensasha.backend.entity.Role;
import com.pensasha.backend.entity.Tenant;
import com.pensasha.backend.entity.User;

@Component
public class UserFactory {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(UserDTO userDTO) {
        if (userDTO instanceof CareTakerDTO careTakerDTO) {
            CareTaker careTaker = new CareTaker();
            copyCommonAttributes(careTaker, careTakerDTO);
            return careTaker;

        } else if (userDTO instanceof LandLordDTO landLordDTO) {
            LandLord landLord = new LandLord();
            copyCommonAttributes(landLord, landLordDTO);
            return landLord;

        } else if (userDTO instanceof TenantDTO tenantDTO) {
            Tenant tenant = new Tenant();
            copyCommonAttributes(tenant, tenantDTO);
            return tenant;

        } else if (userDTO.getRole() == Role.ADMIN) {
            User admin = new User();
            copyCommonAttributes(admin, userDTO);
            admin.setRole(Role.ADMIN);
            return admin;

        } else {
            throw new IllegalArgumentException("Invalid user type provided for ID: " + userDTO.getIdNumber());
        }
    }

    /**
     * Copies common attributes from a DTO to a User entity.
     *
     * @param user    Target user entity.
     * @param userDTO Source DTO.
     */
    private void copyCommonAttributes(User user, UserDTO userDTO) {
        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRole(userDTO.getRole());

        if (userDTO.getProfilePicture() != null && !userDTO.getProfilePicture().isEmpty()) {
            user.setProfilePicture(userDTO.getProfilePicture());
        }
    }

}
