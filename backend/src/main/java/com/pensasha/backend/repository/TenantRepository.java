package com.pensasha.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.entity.Tenant;
import com.pensasha.backend.entity.User;

public interface TenantRepository extends JpaRepository<Tenant, Long> {

    /**
     * Finds a Tenant by their unique ID number.
     * 
     * @param idNumber The ID number of the user (e.g., ID, passport).
     * @return An Optional containing the User if found, otherwise empty.
     */
    Optional<User> findByIdNumber(String idNumber);

}
