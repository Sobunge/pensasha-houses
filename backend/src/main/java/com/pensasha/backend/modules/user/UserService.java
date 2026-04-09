package com.pensasha.backend.modules.user;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfileRepository;
import com.pensasha.backend.modules.user.mapper.UserMapper;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.user.tenant.TenantProfileRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final TenantProfileRepository tenantProfileRepository;
    private final LandlordProfileRepository landlordProfileRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserCredentialsRepository credentialsRepository;
    private final UserFactory userFactory;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    /* ===================== CREATE USER ===================== */
    @Transactional
    public GetUserDTO createUser(CreateUserDTO dto) {

        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new IllegalArgumentException(
                    "User with this phone number already exists: " + dto.getPhoneNumber());
        }

        // Create user entity
        User user = userFactory.createUser(dto);

        // Persist user first so profiles can reference it
        userRepository.save(user);

        // Assign roles from DTO (strings -> Role entities)
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            for (String roleName : dto.getRoles()) {
                Role roleEntity = roleRepository.findByName(roleName.toUpperCase())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Invalid role name: " + roleName));

                user.addRole(roleEntity);

                // Create associated profile if needed
                switch (roleEntity.getName().toUpperCase()) {
                    case "TENANT" -> {
                        TenantProfile tenantProfile = new TenantProfile();
                        tenantProfile.setUser(user);
                        tenantProfileRepository.save(tenantProfile);
                        user.setTenantProfile(tenantProfile);
                    }
                    case "LANDLORD" -> {
                        LandlordProfile landlordProfile = new LandlordProfile();
                        landlordProfile.setUser(user);
                        landlordProfileRepository.save(landlordProfile);
                        user.setLandlordProfile(landlordProfile);
                    }
                    default -> log.warn("No profile mapping for role: {}", roleName);
                }
            }
        }

        // Create credentials
        UserCredentials credentials = new UserCredentials();
        credentials.setUser(user);
        credentials.setPassword(passwordEncoder.encode(dto.getPassword()));
        credentials.setEnabled(true);
        credentials.setLocked(false);
        credentialsRepository.save(credentials);

        log.info("Created new user: {} (roles: {})", user.getPhoneNumber(),
                user.getRoles().stream().map(Role::getName).toList());

        return userMapper.toDTO(user);
    }

    /* ===================== UPDATE USER PROFILE ===================== */
    @Transactional
    public GetUserDTO updateUser(Long id, UpdateUserDTO dto) {
        User user = getUserEntityById(id);

        // Update basic fields via mapper
        userMapper.updateEntity(user, dto);

        // Update roles if provided (DTO has Set<String> role names)
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            Set<Role> newRoles = dto.getRoles().stream()
                    .map(roleName -> roleRepository.findByName(roleName)
                            .orElseThrow(() -> new IllegalArgumentException(
                                    "Role not found: " + roleName)))
                    .collect(Collectors.toSet());

            user.setRoles(newRoles);
        }

        userRepository.save(user);
        log.info("Updated user profile: {} with roles: {}", id, user.getRoles());
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

    /* =================== RESET PASSWORD ====================== */
    @Transactional
    public void resetPassword(String token, String newPassword) {
        // 1. Find the token safely (avoid .get() which crashes if token is missing)
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or non-existent reset token."));

        // 2. SAFETY CHECK: Ensure token isn't expired
        if (resetToken.getExpiryDate().isBefore(java.time.LocalDateTime.now(java.time.ZoneOffset.UTC))) {
            // Clean up the expired token while we're at it
            passwordResetTokenRepository.delete(resetToken);
            throw new IllegalStateException("This reset link has expired.");
        }

        // 3. Find Credentials by User ID
        UserCredentials credentials = credentialsRepository.findById(resetToken.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Credentials not found for this user"));

        // 4. Update and Save
        credentials.setPassword(passwordEncoder.encode(newPassword));
        credentialsRepository.save(credentials);

        // 5. CRITICAL: Delete the token after successful use
        passwordResetTokenRepository.delete(resetToken);

        log.info("Password successfully reset for User ID: {}", resetToken.getUser().getId());
    }

    /* ===================== READ USERS ===================== */

    public GetUserDTO getUserById(Long id) {
        return userMapper.toDTO(getUserEntityById(id));
    }

    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User getUserEntityByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with phone number: " + phoneNumber));
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