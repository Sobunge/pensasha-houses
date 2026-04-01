package com.pensasha.backend.modules.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByName(String name);
    java.util.Optional<Role> findByName(String name);
    
}
