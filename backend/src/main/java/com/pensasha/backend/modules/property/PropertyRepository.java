package com.pensasha.backend.modules.property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    /**
     * Finds properties by the User ID associated with the Landlord Profile.
     * This is useful if your JWT/Security context provides the User ID.
     */
    Page<Property> findByLandlordUserId(Long userId, Pageable pageable);

    /**
     * Finds properties by the Landlord Profile's own ID.
     * Use this if you are using the specific Profile ID.
     */
    Page<Property> findByLandlordId(Long landlordId, Pageable pageable);

    /**
     * Check if a property name already exists (since your entity has unique = true)
     */
    boolean existsByNameIgnoreCase(String name);

    /**
     * Find a property by name
     */
    Optional<Property> findByName(String name);
}