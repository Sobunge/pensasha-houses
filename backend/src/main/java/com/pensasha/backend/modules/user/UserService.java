package com.pensasha.backend.modules.user;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.modules.user.mapper.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository credentialsRepository;
    private final UserFactory userFactory;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /* ===================== CREATE USER ===================== */

    @Transactional
    public GetUserDTO createUser(CreateUserDTO dto) {

        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new IllegalArgumentException(
                    "User with this phone number already exists: " + dto.getPhoneNumber());
        }

        // Create user entity (minimal registration)
        User user = userFactory.createUser(dto);

        // Assign all roles from DTO
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            user.getRoles().addAll(dto.getRoles());
        }

        // Persist user
        userRepository.save(user);

        // Create credentials
        UserCredentials credentials = new UserCredentials();
        credentials.setUser(user);
        credentials.setPassword(passwordEncoder.encode(dto.getPassword()));
        credentials.setEnabled(true);
        credentials.setLocked(false);
        credentialsRepository.save(credentials);

        log.info("Created new user: {} (roles: {})", user.getPhoneNumber(), user.getRoles());
        return userMapper.toDTO(user);
    }

    /* ===================== UPDATE USER PROFILE ===================== */

    @Transactional
    public GetUserDTO updateUser(Long id, UpdateUserDTO dto) {
        User user = getUserEntityById(id);

        userMapper.updateEntity(user, dto);

        // Update roles if provided
        if (dto.getRoles() != null) {
            user.setRoles(dto.getRoles());
        }

        userRepository.save(user);
        log.info("Updated user profile: {}", id);
        return userMapper.toDTO(user);
    }

    /* ===================== UPDATE PASSWORD ===================== */

    @Transactional
    public void updatePassword(Long userId, ResetPasswordDTO dto) {
        UserCredentials credentials = credentialsRepository
                .findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Credentials not found for user ID: " + userId));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), credentials.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (!dto.getNewPassword().equals(dto.getConfirmNewPassword())) {
            throw new IllegalArgumentException("New password and confirmation do not match");
        }

        credentials.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        credentialsRepository.save(credentials);

        log.info("Password updated for user: {}", userId);
    }

    /* ===================== READ USERS ===================== */

    public GetUserDTO getUserById(Long id) {
        return userMapper.toDTO(getUserEntityById(id));
    }

    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public GetUserDTO getUserByPublicId(String publicId) {
        return userMapper.toDTO(getUserEntityByPublicId(publicId));
    }

    public User getUserEntityByPublicId(String publicId) {
        return userRepository.findByPublicId(publicId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with publicId: " + publicId));
    }

    public Page<GetUserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toDTO);
    }

    public Page<GetUserDTO> getUsersByRole(Role role, Pageable pageable) {
        return userRepository.findAllByRolesContaining(role, pageable)
                .map(userMapper::toDTO);
    }

    /* ===================== DELETE USER ===================== */

    @Transactional
    public void deleteUser(Long id) {
        User user = getUserEntityById(id);

        // Delete credentials first
        credentialsRepository.deleteByUser(user);

        // Delete user (cascades to profiles automatically)
        userRepository.delete(user);

        log.warn("Deleted user: {}", id);
    }

    /* ===================== CHECK EXISTENCE ===================== */

    public boolean userExists(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    public boolean userExistsById(Long id) {
        return userRepository.existsById(id);
    }

    public boolean userExistsByPublicId(String publicId) {
        return userRepository.existsByPublicId(publicId);
    }
}