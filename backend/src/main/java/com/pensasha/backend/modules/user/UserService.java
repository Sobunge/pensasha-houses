package com.pensasha.backend.modules.user;

import com.pensasha.backend.exceptions.DuplicateResourceException;
import com.pensasha.backend.modules.user.dto.*;
import com.pensasha.backend.modules.user.landlord.LandlordProfile;
import com.pensasha.backend.modules.user.landlord.LandlordProfileRepository;
import com.pensasha.backend.modules.user.mapper.UserMapper;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.user.tenant.TenantProfileRepository;
import com.pensasha.backend.security.PasswordResetService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TenantProfileRepository tenantRepo;
    private final LandlordProfileRepository landlordRepo;

    private final UserFactory userFactory;
    private final UserMapper userMapper;
    private final PasswordResetService passwordResetService;

    /* ========================= CREATE USER ========================= */
    @Transactional
    public User createUser(CreateUserDTO dto) {

        validateUser(dto);

        // 1. Create and persist user
        User user = userRepository.save(userFactory.createUser(dto));

        // 2. Assign roles + profiles (may modify relationships)
        assignRolesAndProfiles(user, dto.getRoles());

        // 3. Ensure Hibernate synchronizes relationships before mapping
        userRepository.flush();

        log.info("User created: {}", user.getPhoneNumber());

        // 4. Return DTO from managed entity (no security layer involvement here)
        return user;
    }

    /* ========================= UPDATE USER ========================= */
    @Transactional
    public GetUserDTO updateUser(Long id, UpdateUserDTO dto) {

        User user = getUserEntity(id);

        userMapper.updateEntity(user, dto);

        if (dto.getRoles() != null) {
            Set<Role> roles = dto.getRoles().stream()
                    .map(r -> roleRepository.findByName(r.toUpperCase())
                            .orElseThrow(() -> new IllegalArgumentException("Role not found")))
                    .collect(Collectors.toSet());

            user.setRoles(roles);
        }

        return userMapper.toDTO(user);
    }

    /* ========================= READ ========================= */

    public GetUserDTO getUser(Long id) {
        return userMapper.toDTO(getUserEntity(id));
    }

    public Page<GetUserDTO> getAll(Pageable pageable) {
        return userRepository.findAll(pageable).map(userMapper::toDTO);
    }

    public User getUserEntity(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Boolean userExistsById(Long id) {
        return userRepository.existsById(id);
    }

    /* ========================= DELETE ========================= */
    @Transactional
    public void deleteUser(Long id) {
        userRepository.delete(getUserEntity(id));
    }

    /* ========================= PASSWORD DELEGATION ========================= */
    public void updatePassword(Long userId, ResetPasswordDTO dto) {
        passwordResetService.changePassword(userId, dto);
    }

    /* ========================= HELPERS ========================= */

    private void validateUser(CreateUserDTO dto) {
        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber()))
            throw new DuplicateResourceException("This Phone Number is already registered");

        if (userRepository.existsByEmail(dto.getEmail()))
            throw new DuplicateResourceException("This Email is already registered");
    }

    private void assignRolesAndProfiles(User user, Set<String> roles) {

        if (roles == null)
            return;

        for (String roleName : roles) {

            Role role = roleRepository.findByName(roleName.toUpperCase())
                    .orElseThrow();

            user.addRole(role);

            switch (roleName.toUpperCase()) {

                case "TENANT" -> {
                    TenantProfile p = new TenantProfile();
                    p.setUser(user);
                    tenantRepo.save(p);
                    user.setTenantProfile(p);
                }

                case "LANDLORD" -> {
                    LandlordProfile p = new LandlordProfile();
                    p.setUser(user);
                    landlordRepo.save(p);
                    user.setLandlordProfile(p);
                }
            }
        }
    }
}