package com.pensasha.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.dto.CareTakerDTO;
import com.pensasha.backend.dto.LandLordDTO;
import com.pensasha.backend.dto.TenantDTO;
import com.pensasha.backend.dto.UpdatePasswordDTO;
import com.pensasha.backend.dto.UpdateUserDTO;
import com.pensasha.backend.dto.UserDTO;
import com.pensasha.backend.entity.CareTaker;
import com.pensasha.backend.entity.LandLord;
import com.pensasha.backend.entity.Role;
import com.pensasha.backend.entity.Tenant;
import com.pensasha.backend.entity.User;
import com.pensasha.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject password encoder

    // Adding a new user (Admin)
    @Transactional
    public User addUser(UserDTO userDTO) {

        User user;

        if (userDTO instanceof CareTakerDTO careTakerDTO) {

            CareTaker careTaker = new CareTaker();
            copyCommonAttributes(careTaker, careTakerDTO);
            user = careTaker;

        } else if (userDTO instanceof LandLordDTO landLordDTO) {

            LandLord landLord = new LandLord();
            copyCommonAttributes(landLord, landLordDTO);

            user = landLord;

        } else if (userDTO instanceof TenantDTO tenantDTO) {

            Tenant tenant = new Tenant();
            copyCommonAttributes(tenant, tenantDTO);

            user = tenant;

        } else if (userDTO.getRole() == Role.ADMIN) {

            // Ensure only admins can be assigned explicitly
            User admin = new User();
            copyCommonAttributes(admin, userDTO);
            admin.setRole(Role.ADMIN);
            user = admin;

        } else {
            throw new IllegalArgumentException("Invalid user type provided");
        }

        return userRepository.save(user);
    }

    // Editing common user details
    public User updateUserDetails(UpdateUserDTO updatedUserDTO) {

        User user = userRepository.findByIdNumber(updatedUserDTO.getIdNumber()).get();

        user.setFirstName(updatedUserDTO.getFirstName());
        user.setSecondName(updatedUserDTO.getSecondName());
        user.setThirdName(updatedUserDTO.getThirdName());
        user.setIdNumber(updatedUserDTO.getIdNumber());
        user.setPhoneNumber(updatedUserDTO.getPhoneNumber());

        return userRepository.save(user);
    }

    // Changing password
    public String updateUserPassword(String idNumber, UpdatePasswordDTO updatePasswordDTO) {

        Optional<User> user = userRepository.findByIdNumber(idNumber);

        if (user.isPresent()) {
            if (passwordEncoder.matches(user.get().getPassword(), updatePasswordDTO.getCurrentPassword())) {

                if (updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getConfirmNewPassword())) {
                    user.get().setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
                    return "Password changed successfully";
                } else {
                    return "New password does not match the confirmed password";
                }

            } else {
                return "Current password entered does not match existing password";
            }
        } else {
            return "User with this id: " + idNumber + " not found.";
        }

    }

    // Changing role
    // Changing role
    @Transactional
    public User changeRole(String idNumber, Role newRole) {
        Optional<User> optionalUser = userRepository.findByIdNumber(idNumber);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User with ID: " + idNumber + " not found.");
        }

        User oldUser = optionalUser.get();

        // Ensure we are not trying to convert to the same role
        if (oldUser.getRole() == newRole) {
            return oldUser; // No changes needed
        }

        // Handle role change to Admin separately
        if (newRole == Role.ADMIN) {
            userRepository.delete(oldUser); // Remove old user
            User admin = new User();
            copyCommonAttributes(admin, oldUser); // Copy common attributes
            admin.setRole(Role.ADMIN);
            return userRepository.save(admin); // Save and return new Admin user
        }

        // Create a new instance based on the role
        User newUser;

        switch (newRole) {
            case CARETAKER -> {
                CareTaker careTaker = new CareTaker();
                copyCommonAttributes(careTaker, oldUser);
                careTaker.setRole(Role.CARETAKER);
                newUser = careTaker;
            }
            case LANDLORD -> {
                LandLord landLord = new LandLord();
                copyCommonAttributes(landLord, oldUser);
                landLord.setRole(Role.LANDLORD);
                newUser = landLord;
            }
            case TENANT -> {
                Tenant tenant = new Tenant();
                copyCommonAttributes(tenant, oldUser);
                tenant.setRole(Role.TENANT);
                newUser = tenant;
            }
            default -> throw new IllegalArgumentException("Unsupported role change");
        }

        userRepository.delete(oldUser); // Delete the old user
        return userRepository.save(newUser); // Save and return the new user
    }

    // Deleting a user (Admin)
    public void deleteUser(String idNumber) {

        Optional<User> user = userRepository.findByIdNumber(idNumber);
        userRepository.deleteById(user.get().getId());

    }

    // Getting a single user (Admin)
    public Optional<User> gettingUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber);
    }

    // Getting all users (Admin)
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Getting a user by role
    public Page<User> gettingUsersByRole(Role role, Pageable pageable) {
        return userRepository.findAllByRole(role, pageable);
    }

    // Helper method to copy common attributes
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

    // Helper method to copy common attributes override
    private void copyCommonAttributes(User target, User source) {

        target.setFirstName(source.getFirstName());
        target.setSecondName(source.getSecondName());
        target.setThirdName(source.getThirdName());
        target.setIdNumber(source.getIdNumber());
        target.setPassword(source.getPassword());
        target.setPhoneNumber(source.getPhoneNumber());

        if (source.getProfilePicture() != null && !source.getProfilePicture().isEmpty()) {
            target.setProfilePicture(source.getProfilePicture());
        }

    }

}
