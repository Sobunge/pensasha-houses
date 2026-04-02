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

        tenant.setPermissions(getPermissions(
            Permissions.PROPERTY_VIEW,
            Permissions.RENT_PAY,
            Permissions.RENT_VIEW,
            Permissions.MAINTENANCE_CREATE,
            Permissions.MAINTENANCE_VIEW,
            Permissions.DOCUMENT_CREATE,
            Permissions.DOCUMENT_VIEW,
            Permissions.MESSAGE_SEND,
            Permissions.MESSAGE_VIEW,
            Permissions.ANNOUNCEMENT_VIEW
        ));

        landlord.setPermissions(getPermissions(
            Permissions.PROPERTY_CREATE,
            Permissions.PROPERTY_VIEW,
            Permissions.PROPERTY_UPDATE,
            Permissions.PROPERTY_DELETE,
            Permissions.TENANT_VIEW,
            Permissions.TENANT_CREATE,
            Permissions.TENANT_UPDATE,
            Permissions.TENANT_APPROVE,
            Permissions.RENT_VIEW,
            Permissions.RENT_UPDATE,
            Permissions.INVOICE_CREATE,
            Permissions.INVOICE_VIEW,
            Permissions.INVOICE_UPDATE,
            Permissions.INVOICE_GENERATE,
            Permissions.MAINTENANCE_VIEW,
            Permissions.MAINTENANCE_ASSIGN,
            Permissions.MAINTENANCE_UPDATE,
            Permissions.DOCUMENT_VIEW,
            Permissions.MESSAGE_SEND,
            Permissions.MESSAGE_VIEW,
            Permissions.ANNOUNCEMENT_CREATE,
            Permissions.ANNOUNCEMENT_VIEW,
            Permissions.ANNOUNCEMENT_UPDATE,
            Permissions.REPORT_VIEW,
            Permissions.REPORT_GENERATE
        ));

        caretaker.setPermissions(getPermissions(
            Permissions.MAINTENANCE_VIEW,
            Permissions.MAINTENANCE_UPDATE,
            Permissions.MAINTENANCE_ASSIGN,
            Permissions.MESSAGE_SEND,
            Permissions.MESSAGE_VIEW,
            Permissions.ANNOUNCEMENT_VIEW
        ));

        admin.setPermissions(
            Arrays.stream(Permissions.values())
                .map(this::get)
                .collect(Collectors.toSet())
        );

        roleRepo.saveAll(List.of(tenant, landlord, caretaker, admin));
    }

    private Set<Permission> getPermissions(Permissions... perms) {
        return Arrays.stream(perms)
                .map(this::get)
                .collect(Collectors.toSet());
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
            .orElseThrow(() ->
                new IllegalStateException("Permission not found: " + p.name()));
    }
}