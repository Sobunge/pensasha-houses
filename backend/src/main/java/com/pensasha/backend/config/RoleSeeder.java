package com.pensasha.backend.config;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoleSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // List of expected roles
        List<String> roles = List.of("ADMIN", "LANDLORD", "TENANT", "CARETAKER");

        for (String roleName : roles) {
            // Check if role already exists
            roleRepository.findByName(roleName).orElseGet(() -> {
                Role role = new Role();
                role.setName(roleName);
                return roleRepository.save(role);
            });
        }

        System.out.println("Roles seeded successfully!");
    }
}