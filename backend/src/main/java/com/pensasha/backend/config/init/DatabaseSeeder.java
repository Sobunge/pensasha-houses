package com.pensasha.backend.config.init;

import com.pensasha.backend.modules.user.Permission;
import com.pensasha.backend.modules.user.PermissionRepository;
import com.pensasha.backend.modules.user.Permissions;
import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.RoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final PermissionRepository permRepo;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Starting database seeding process...");

        Map<String, Permission> permissionMap = seedPermissions();
        seedRoles(permissionMap);

        log.info("Database seeding completed successfully.");
    }

    private Map<String, Permission> seedPermissions() {
        List<Permission> existingPerms = permRepo.findAll();
        Set<String> existingNames = existingPerms.stream()
                .map(Permission::getName)
                .collect(Collectors.toSet());

        List<Permission> newPerms = Arrays.stream(Permissions.values())
                .filter(p -> !existingNames.contains(p.name()))
                .map(p -> {
                    Permission perm = new Permission();
                    perm.setName(p.name());
                    return perm;
                })
                .toList();

        if (!newPerms.isEmpty()) {
            permRepo.saveAll(newPerms);
            log.info("Seeded {} new permissions.", newPerms.size());
        }

        return permRepo.findAll().stream()
                .collect(Collectors.toMap(Permission::getName, Function.identity()));
    }

    private void seedRoles(Map<String, Permission> permMap) {
        Role tenant = getOrCreate("TENANT");
        Role landlord = getOrCreate("LANDLORD");
        Role caretaker = getOrCreate("CARETAKER");
        Role admin = getOrCreate("ADMIN");

        // TENANT Permissions
        tenant.setPermissions(getPermissions(permMap,
            Permissions.PROPERTY_VIEW,
            Permissions.UNIT_VIEW,
            Permissions.TENANT_VIEW,
            Permissions.RENT_PAY,
            Permissions.RENT_VIEW,
            Permissions.INVOICE_VIEW,
            Permissions.RECEIPT_VIEW,
            Permissions.LEASE_VIEW,
            Permissions.MAINTENANCE_CREATE,
            Permissions.MAINTENANCE_VIEW,
            Permissions.MAINTENANCE_CANCEL,
            Permissions.DOCUMENT_CREATE,
            Permissions.DOCUMENT_VIEW,
            Permissions.MESSAGE_SEND,
            Permissions.MESSAGE_VIEW,
            Permissions.ANNOUNCEMENT_VIEW
        ));

        // LANDLORD Permissions
        landlord.setPermissions(getPermissions(permMap,
            Permissions.PROPERTY_CREATE,
            Permissions.PROPERTY_VIEW,
            Permissions.PROPERTY_UPDATE,
            Permissions.PROPERTY_DELETE,
            Permissions.UNIT_CREATE,
            Permissions.UNIT_VIEW,
            Permissions.UNIT_UPDATE,
            Permissions.UNIT_DELETE,
            Permissions.TENANT_VIEW,
            Permissions.TENANT_CREATE,
            Permissions.TENANT_UPDATE,
            Permissions.TENANT_APPROVE,
            Permissions.TENANT_DELETE,
            Permissions.CARETAKER_VIEW,
            Permissions.CARETAKER_CREATE,
            Permissions.CARETAKER_UPDATE,
            Permissions.CARETAKER_ASSIGN,
            Permissions.RENT_VIEW,
            Permissions.RENT_UPDATE,
            Permissions.INVOICE_CREATE,
            Permissions.INVOICE_VIEW,
            Permissions.INVOICE_UPDATE,
            Permissions.INVOICE_GENERATE,
            Permissions.RECEIPT_VIEW,
            Permissions.RECEIPT_GENERATE,
            Permissions.LEASE_CREATE,
            Permissions.LEASE_VIEW,
            Permissions.LEASE_UPDATE,
            Permissions.LEASE_TERMINATE,
            Permissions.MAINTENANCE_CREATE,
            Permissions.MAINTENANCE_VIEW,
            Permissions.MAINTENANCE_ASSIGN,
            Permissions.MAINTENANCE_UPDATE,
            Permissions.MAINTENANCE_CANCEL,
            Permissions.DOCUMENT_CREATE,
            Permissions.DOCUMENT_VIEW,
            Permissions.DOCUMENT_UPDATE,
            Permissions.DOCUMENT_DELETE,
            Permissions.MESSAGE_SEND,
            Permissions.MESSAGE_VIEW,
            Permissions.ANNOUNCEMENT_CREATE,
            Permissions.ANNOUNCEMENT_VIEW,
            Permissions.ANNOUNCEMENT_UPDATE,
            Permissions.ANNOUNCEMENT_DELETE,
            Permissions.REPORT_VIEW,
            Permissions.REPORT_GENERATE
        ));

        // CARETAKER Permissions
        caretaker.setPermissions(getPermissions(permMap,
            Permissions.PROPERTY_VIEW,
            Permissions.UNIT_VIEW,
            Permissions.TENANT_VIEW,
            Permissions.MAINTENANCE_CREATE,
            Permissions.MAINTENANCE_VIEW,
            Permissions.MAINTENANCE_UPDATE,
            Permissions.MAINTENANCE_ASSIGN,
            Permissions.DOCUMENT_VIEW,
            Permissions.MESSAGE_SEND,
            Permissions.MESSAGE_VIEW,
            Permissions.ANNOUNCEMENT_VIEW
        ));

        // ✅ FIX: Use a mutable HashSet for ADMIN permissions
        admin.setPermissions(new HashSet<>(permMap.values()));

        roleRepo.saveAll(List.of(tenant, landlord, caretaker, admin));
    }

    private Set<Permission> getPermissions(Map<String, Permission> permMap, Permissions... perms) {
        return Arrays.stream(perms)
                .map(p -> {
                    Permission perm = permMap.get(p.name());
                    if (perm == null) {
                        throw new IllegalStateException("Permission missing from database map: " + p.name());
                    }
                    return perm;
                })
                .collect(Collectors.toSet()); // Collectors.toSet() returns a mutable HashSet
    }

    private Role getOrCreate(String name) {
        return roleRepo.findByName(name)
                .orElseGet(() -> {
                    Role r = new Role();
                    r.setName(name);
                    return roleRepo.save(r);
                });
    }
}