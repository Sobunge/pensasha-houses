package com.pensasha.backend.config.init;

import org.springframework.stereotype.Component;

import com.pensasha.backend.modules.user.Permission;
import com.pensasha.backend.modules.user.PermissionRepository;
import com.pensasha.backend.modules.user.Permissions;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PermissionSeeder {

    private final PermissionRepository permissionRepository;

    @PostConstruct
    public void seed() {
        for (Permissions perm : Permissions.values()) {
            permissionRepository.findByName(perm.name())
                .orElseGet(() -> {
                    Permission p = new Permission();
                    p.setName(perm.name());
                    return permissionRepository.save(p);
                });
        }
    }
}
