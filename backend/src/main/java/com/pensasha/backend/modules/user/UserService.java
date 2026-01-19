package com.pensasha.backend.modules.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.user.dto.CreateUserDTO;
import com.pensasha.backend.modules.user.dto.GetUserDTO;
import com.pensasha.backend.modules.user.dto.ResetPasswordDTO;
import com.pensasha.backend.modules.user.dto.UpdateUserDTO;
import com.pensasha.backend.modules.user.mapper.UserMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;

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
        // Check if user with ID already exists
        if (userRepository.existsByIdNumber(dto.getIdNumber())) {
            throw new IllegalArgumentException("User with this ID already exists: " + dto.getIdNumber());
        }

        // Create the user entity based on role
        User user = userFactory.createUser(dto);
        userRepository.save(user);

        // Create the credentials
        UserCredentials credentials = new UserCredentials();
        credentials.setUser(user);
        credentials.setPassword(passwordEncoder.encode(dto.getPassword()));
        credentials.setEnabled(true);
        credentials.setLocked(false);
        credentialsRepository.save(credentials);

        log.info("Created new user: {} (role: {})", user.getIdNumber(), user.getRole());
        return userMapper.toDTO(user);
    }

    /* ===================== UPDATE USER PROFILE ===================== */

    @Transactional
    public GetUserDTO updateUser(String idNumber, UpdateUserDTO dto) {
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + idNumber));

        // Map updated fields from DTO
        userMapper.updateEntity(user, dto);

        userRepository.save(user);
        log.info("Updated user profile: {}", idNumber);
        return userMapper.toDTO(user);
    }

    /* ===================== UPDATE PASSWORD ===================== */

    @Transactional
    public void updatePassword(Long id, ResetPasswordDTO dto) {
        UserCredentials credentials = credentialsRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credentials not found for user ID: " + id));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), credentials.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (!dto.getNewPassword().equals(dto.getConfirmNewPassword())) {
            throw new IllegalArgumentException("New password and confirmation do not match");
        }

        credentials.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        credentialsRepository.save(credentials);

        log.info("Password updated for user: {}", id);
    }

    /* ===================== READ USER ===================== */

    public GetUserDTO getUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber)
                .map(userMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + idNumber));
    }

    public User getUserEntity(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
    }

    public GetUserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public Page<GetUserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toDTO);

    }

    public Page<GetUserDTO> getUsersByRole(Role role, Pageable pageable) {
        return userRepository.findAllByRole(role, pageable)
                .map(userMapper::toDTO);
    }

    /* ===================== DELETE USER ===================== */

    @Transactional
    public void deleteUser(String idNumber) {
        User user = userRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + idNumber));

        // Delete credentials first
        credentialsRepository.deleteByUser(user);

        // Delete user
        userRepository.delete(user);

        log.warn("Deleted user: {}", idNumber);
    }

    /* ===================== Check if user exists ===================== */
    public boolean userExists(String idNumber) {
        return userRepository.existsByIdNumber(idNumber);
    }

    public boolean userExistsById(Long id) {
    return userRepository.existsById(id);
}

}
