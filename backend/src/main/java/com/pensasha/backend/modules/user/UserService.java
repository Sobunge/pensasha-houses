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
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.landlord.LandLord;
import com.pensasha.backend.modules.user.landlord.LandlordRepository;
import com.pensasha.backend.modules.user.landlord.dto.UpdateLandlordDTO;
import com.pensasha.backend.modules.user.mapper.UserMapper;
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
    private final LandlordRepository landlordRepository;
    private final UserFactory userFactory;
    private final PasswordEncoder passwordEncoder;
    private final UserServiceHelper userServiceHelper;
    private final UserMapper userMapper;

    /**
     * Adds a new user based on their DTO type.
     * Supports CareTaker, LandLord, Tenant, and Admin.
     *
     * @param userDTO The DTO containing user details.
     * @return The created User entity in the DTO formart.
     */
    @Transactional
    public GetUserDTO addUser(CreateUserDTO userDTO) {
        User user = userFactory.createUser(userDTO);
        log.info("Created new user with ID: {}", userDTO.getIdNumber());
        User createdUser = userRepository.save(user);

        return userMapper.toDTO(createdUser);

    }

    /**
     * Updates common user details.s
     *
     * @param updatedUserDTO The DTO containing updated user details.
     * @return The updated User entity.
     */
    @Transactional
    public GetUserDTO updateUserDetails(String idNumber, UpdateUserDTO updatedUserDTO) {
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + idNumber
                        + " not found."));

        log.info("Updating details for user with ID: {}", updatedUserDTO.getIdNumber());

        userServiceHelper.updateCommonUserAttributes(user, updatedUserDTO);

        return userRepository.save(user);
    }

    @Transactional
    public LandLord updateLandLordDetails(String idNumber, UpdateLandlordDTO updateLandlordDTO) {

        LandLord landLord = landlordRepository.findByIdNumber(idNumber).orElseThrow(
                () -> {
                    log.error("User with id: {} not found.", idNumber);
                    return new ResourceNotFoundException("User with id: " + idNumber + " could not be found");
                });

        log.info("Updating Landlord details with id: {}", landLord);

        return landlordRepository.save(landLord);
    }

    /**
     * Changes the password of a user.
     *
     * @param idNumber          User's ID number.
     * @param updatePasswordDTO DTO containing password information.
     * @return Status message.
     */
    @Transactional
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
    @Transactional
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
    public Optional<GetUserDTO> gettingUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber)
                .map(user -> new GetUserDTO(
                        user.getFirstName(),
                        user.getSecondName(),
                        user.getThirdName(),
                        user.getIdNumber(),
                        user.getPhoneNumber(),
                        user.getProfilePicture(),
                        user.getRole()));
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

    private User createUserWithNewRole(User oldUser, Role newRole) {
        User newUser;

        switch (newRole) {
            case ADMIN -> {
                newUser = new User();
                userServiceHelper.copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.ADMIN);
                log.debug("Created new ADMIN user: {}", oldUser.getIdNumber());
            }
            case CARETAKER -> {
                newUser = new CareTaker();
                userServiceHelper.copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.CARETAKER);
                log.debug("Created new CARETAKER user: {}", oldUser.getIdNumber());
            }
            case LANDLORD -> {
                newUser = new LandLord();
                userServiceHelper.copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.LANDLORD);
                log.debug("Created new LANDLORD user: {}", oldUser.getIdNumber());
            }
            case TENANT -> {
                newUser = new Tenant();
                userServiceHelper.copyCommonAttributes(newUser, oldUser);
                newUser.setRole(Role.TENANT);
                log.debug("Created new TENANT user: {}", oldUser.getIdNumber());
            }
            default -> throw new IllegalArgumentException("Unsupported role change: " + newRole);
        }

        return newUser;
    }
}
