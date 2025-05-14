package com.pensasha.backend.modules.user.tenant;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TenantRepository extends JpaRepository<Tenant, Long> {

    /**
     * Finds a Tenant by their unique ID number.
     * 
     * @param idNumber The ID number of the user (e.g., ID, passport).
     * @return An Optional containing the User if found, otherwise empty.
     */
    Optional<Tenant> findByIdNumber(String idNumber);

}
