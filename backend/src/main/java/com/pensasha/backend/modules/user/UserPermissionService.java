package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPermissionService {

    private final UserRepository userRepository;

    /**
     * Explicitly grant a permission to a user, overriding role defaults.
     */
    @Transactional
    public void grantPermission(User user, Permission permission) {
        upsertOverride(user, permission, PermissionEffect.GRANT);
    }

    /**
     * Explicitly deny a permission to a user, overriding role defaults.
     */
    @Transactional
    public void denyPermission(User user, Permission permission) {
        upsertOverride(user, permission, PermissionEffect.DENY);
    }

    /**
     * Remove an explicit override, reverting the user to default role permissions.
     */
    @Transactional
    public void removeOverride(User user, Permission permission) {
        user.getPermissionOverrides().removeIf(override -> 
            override.getPermission().getName().equals(permission.getName())
        );
        userRepository.save(user);
    }

    private void upsertOverride(User user, Permission permission, PermissionEffect effect) {
        Optional<UserPermissionOverride> existingOverride = user.getPermissionOverrides()
                .stream()
                .filter(override -> override.getPermission().getName().equals(permission.getName()))
                .findFirst();

        if (existingOverride.isPresent()) {
            existingOverride.get().setEffect(effect);
        } else {
            UserPermissionOverride override = new UserPermissionOverride(user, permission, effect);
            user.getPermissionOverrides().add(override);
        }

        userRepository.save(user);
    }
}