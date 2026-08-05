package com.pensasha.backend.modules.user;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserPermissionService {

    private final UserRepository userRepository;

    @Transactional
    public void grantPermission(User user, Permission permission) {

        UserPermissionOverride override = new UserPermissionOverride();

        override.setUser(user);
        override.setPermission(permission);
        override.setEffect(PermissionEffect.GRANT);

        user.getPermissionOverrides().add(override);

        userRepository.save(user);
    }

    @Transactional
    public void denyPermission(User user, Permission permission) {

        UserPermissionOverride override = new UserPermissionOverride();

        override.setUser(user);
        override.setPermission(permission);
        override.setEffect(PermissionEffect.DENY);

        user.getPermissionOverrides().add(override);

        userRepository.save(user);
    }
}