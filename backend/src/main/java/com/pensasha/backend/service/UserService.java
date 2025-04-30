package com.pensasha.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.dto.*;
import com.pensasha.backend.entity.*;
import com.pensasha.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.extern.slf4j.Slf4j;

/**
 * Service class responsible for managing user-related operations.
 * Includes CRUD operations, password updates, role changes, and user retrieval.
 */
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Adds a new user based on their DTO type.
     * Supports CareTaker, LandLord, Tenant, and Admin.
     *
     * @param userDTO The DTO containing user details.
     * @return The created User entity.
     */
    @Transactional
    public User addUser(UserDTO userDTO) {
        User user;

        if (userDTO instanceof CareTakerDTO careTakerDTO) {
            CareTaker careTaker = new CareTaker();
            copyCommonAttributes(careTaker, careTakerDTO);
            user = careTaker;
            log.info("Created new CareTaker with ID: {}", userDTO.getIdNumber());

        } else if (userDTO instanceof LandLordDTO landLordDTO) {
            LandLord landLord = new LandLord();
            copyCommonAttributes(landLord, landLordDTO);
            user = landLord;
            log.info("Created new LandLord with ID: {}", userDTO.getIdNumber());

        } else if (userDTO instanceof TenantDTO tenantDTO) {
            Tenant tenant = new Tenant();
            copyCommonAttributes(tenant, tenantDTO);
            user = tenant;
            log.info("Created new Tenant with ID: {}", userDTO.getIdNumber());

        } else if (userDTO.getRole() == Role.ADMIN) {
            User admin = new User();
            copyCommonAttributes(admin, userDTO);
            admin.setRole(Role.ADMIN);
            user = admin;
            log.info("Created new Admin with ID: {}", userDTO.getIdNumber());

        } else {
            log.error("Invalid user type provided for ID: {}", userDTO.getIdNumber());
            throw new IllegalArgumentException("Invalid user type provided");
        }

        return userRepository.save(user);
    }

    /**
     * Updates common user details.
     *
     * @param updatedUserDTO The DTO containing updated user details.
     * @return The updated User entity.
     */
    public User updateUserDetails(UpdateUserDTO updatedUserDTO) {
        User user = userRepository.findByIdNumber(updatedUserDTO.getIdNumber()).orElseThrow();
        log.info("Updating details for user with ID: {}", updatedUserDTO.getIdNumber());

        user.setFirstName(updatedUserDTO.getFirstName());
        user.setSecondName(updatedUserDTO.getSecondName());
        user.setThirdName(updatedUserDTO.getThirdName());
        user.setIdNumber(updatedUserDTO.getIdNumber());
        user.setPhoneNumber(updatedUserDTO.getPhoneNumber());

        return userRepository.save(user);
    }

    /**
     * Changes the password of a user.
     *
     * @param idNumber          User's ID number.
     * @param updatePasswordDTO DTO containing password information.
     * @return Status message.
     */
    public String updateUserPassword(String idNumber, UpdatePasswordDTO updatePasswordDTO) {
        Optional<User> user = userRepository.findByIdNumber(idNumber);

        if (user.isPresent()) {
            if (passwordEncoder.matches(updatePasswordDTO.getCurrentPassword(), user.get().getPassword())) {
                if (updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getConfirmNewPassword())) {
                    user.get().setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
                    log.info("Password changed for user with ID: {}", idNumber);
                    return "Password changed successfully";
                } else {
                    log.warn("New password mismatch for user ID: {}", idNumber);
                    return "New password does not match the confirmed password";
                }
            } else {
                log.warn("Current password mismatch for user ID: {}", idNumber);
                return "Current password entered does not match existing password";
            }
        } else {
            log.error("User not found with ID: {}", idNumber);
            return "User with this id: " + idNumber + " not found.";
        }
    }

    /**
     * Changes the role of a user.
     *
     * @param idNumber User's ID number.
     * @param newRole  New role to be assigned.
     * @return The updated User entity.
     */
    @Transactional
    public User changeRole(String idNumber, Role newRole) {
        Optional<User> optionalUser = userRepository.findByIdNumber(idNumber);

        if (optionalUser.isEmpty()) {
            log.error("Role change failed. User not found with ID: {}", idNumber);
            throw new RuntimeException("User with ID: " + idNumber + " not found.");
        }

        User oldUser = optionalUser.get();

        if (oldUser.getRole() == newRole) {
            log.info("No role change needed for user ID: {}", idNumber);
            return oldUser;
        }

        User newUser;
        log.info("Changing role for user ID: {} from {} to {}", idNumber, oldUser.getRole(), newRole);

        if (newRole == Role.ADMIN) {
            userRepository.delete(oldUser);
            User admin = new User();
            copyCommonAttributes(admin, oldUser);
            admin.setRole(Role.ADMIN);
            log.info("Role changed to ADMIN for user ID: {}", idNumber);
            return userRepository.save(admin);
        }

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

        userRepository.delete(oldUser);
        log.info("Role changed to {} for user ID: {}", newRole, idNumber);
        return userRepository.save(newUser);
    }

    /**
     * Deletes a user.
     *
     * @param idNumber User's ID number.
     */
    public void deleteUser(String idNumber) {
        Optional<User> user = userRepository.findByIdNumber(idNumber);
        user.ifPresent(value -> {
            userRepository.deleteById(value.getId());
            log.info("Deleted user with ID: {}", idNumber);
        });
    }

    /**
     * Retrieves a single user.
     *
     * @param idNumber User's ID number.
     * @return Optional containing the user if found.
     */
    public Optional<User> gettingUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber);
    }

    /**
     * Retrieves all users with pagination.
     *
     * @param pageable Pagination configuration.
     * @return Page of users.
     */
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    /**
     * Retrieves users by their role.
     *
     * @param role     User role.
     * @param pageable Pagination configuration.
     * @return Page of users with the specified role.
     */
    public Page<User> gettingUsersByRole(Role role, Pageable pageable) {
        return userRepository.findAllByRole(role, pageable);
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

    /**
     * Copies common attributes from one User entity to another.
     *
     * @param target Target user entity.
     * @param source Source user entity.
     */
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
