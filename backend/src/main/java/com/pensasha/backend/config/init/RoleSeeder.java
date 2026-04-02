package com.pensasha.backend.config.init;

import com.pensasha.backend.modules.user.Permission;
import com.pensasha.backend.modules.user.PermissionRepository;
import com.pensasha.backend.modules.user.Permissions;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.RoleRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RoleSeeder {

    private final RoleRepository roleRepo;
    private final PermissionRepository permRepo;

    @PostConstruct
    public void seedRoles() {

        Role tenant = getOrCreate("TENANT");
        Role landlord = getOrCreate("LANDLORD");
        Role caretaker = getOrCreate("CARETAKER");
        Role admin = getOrCreate("ADMIN");

        // TENANT
        tenant.setPermissions(Set.of(
            get(Permissions.PROPERTY_VIEW),
            get(Permissions.RENT_PAY),
            get(Permissions.RENT_VIEW),
            get(Permissions.MAINTENANCE_CREATE),
            get(Permissions.MESSAGE_SEND),
            get(Permissions.ANNOUNCEMENT_VIEW)
        ));

        // LANDLORD
        landlord.setPermissions(Set.of(
            get(Permissions.PROPERTY_CREATE),
            get(Permissions.PROPERTY_UPDATE),
            get(Permissions.TENANT_APPROVE),
            get(Permissions.RENT_VIEW),
            get(Permissions.RENT_CONFIRM_PAYMENT),
            get(Permissions.MAINTENANCE_ASSIGN),
            get(Permissions.REPORT_VIEW)
        ));

        // CARETAKER
        caretaker.setPermissions(Set.of(
            get(Permissions.MAINTENANCE_VIEW),
            get(Permissions.MAINTENANCE_RESOLVE),
            get(Permissions.MESSAGE_VIEW)
        ));

        // ADMIN → all permissions
        admin.setPermissions(
            Arrays.stream(Permissions.values())
                .map(this::get)
                .collect(Collectors.toSet())
        );

        roleRepo.saveAll(List.of(tenant, landlord, caretaker, admin));
    }

    private Role getOrCreate(String name) {
        return roleRepo.findByName(name)
            .orElseGet(() -> {
                Role r = new Role();
                r.setName(name);
                return roleRepo.save(r);
            });
    }

    private Permission get(Permissions p) {
        return permRepo.findByName(p.name())
            .orElseThrow();
    }
}