package com.pensasha.backend.modules.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.caretaker.CareTaker;
import com.pensasha.backend.modules.user.dto.UpdatePasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.tenant.Tenant;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service class responsible for managing user-related operations.
 * Includes CRUD operations, password updates, role changes, and user retrieval.
 */
@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserFactory userFactory;
    private final PasswordEncoder passwordEncoder;

    /**
     * Adds a new user based on their DTO type.
     * Supports CareTaker, LandLord, Tenant, and Admin.
     *
     * @param userDTO The DTO containing user details.
     * @return The created User entity.
     */
    @Transactional
    public User addUser(CreateUserDTO userDTO) {
        User user = userFactory.createUser(userDTO);
        log.info("Created new {} with ID: {}", user.getRole(), userDTO.getIdNumber());
        return userRepository.save(user);
    }

    /**
     * Updates common user details.s
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
            throw new ResourceNotFoundException("User with ID: " + idNumber + " not found.");
        }

        User oldUser = optionalUser.get();

        // If the role is already the same, no need to change it
        if (oldUser.getRole() == newRole) {
            log.info("No role change needed for user ID: {}", idNumber);
            return oldUser;
        }

        // Logging the role change
        log.info("Changing role for user ID: {} from {} to {}", idNumber, oldUser.getRole(), newRole);

        // Creating the new user object based on the new role
        User newUser = createUserWithNewRole(oldUser, newRole);

        // Deleting the old user and saving the new user
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

    private User createUserWithNewRole(User oldUser, Role newRole) {
        User newUser;

        switch (newRole) {
            case ADMIN -> {
                newUser = new User();
                copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.ADMIN);
                log.debug("Created new ADMIN user: {}", oldUser.getIdNumber());
            }
            case CARETAKER -> {
                newUser = new CareTaker();
                copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.CARETAKER);
                log.debug("Created new CARETAKER user: {}", oldUser.getIdNumber());
            }
            case LANDLORD -> {
                newUser = new LandLord();
                copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.LANDLORD);
                log.debug("Created new LANDLORD user: {}", oldUser.getIdNumber());
            }
            case TENANT -> {
                newUser = new Tenant();
                copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.TENANT);
                log.debug("Created new TENANT user: {}", oldUser.getIdNumber());
            }
            default -> throw new IllegalArgumentException("Unsupported role change: " + newRole);
        }

        return newUser;
    }

}
