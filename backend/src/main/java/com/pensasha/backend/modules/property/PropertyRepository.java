package com.pensasha.backend.modules.property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Repository interface for the Property entity.
 * Provides methods to perform CRUD operations and custom queries for Property entities in the database.
 */
public interface PropertyRepository extends JpaRepository<Property, Long> {

    /**
     * Retrieves a page of properties associated with a specific landlord.
     * 
     * @param landlordId The ID of the landlord whose properties are to be retrieved.
     * @param pageable Pagination information (e.g., page number, page size).
     * @return A Page of properties that belong to the landlord with the given ID.
     */
    Page<Property> findByLandLordIdNumber(String landlordIdNumber, Pageable pageable);

    /**
     * Retrieves a page of properties associated with a specific tenant.
     * 
     * @param tenantId The ID of the tenant whose properties are to be retrieved.
     * @param pageable Pagination information (e.g., page number, page size).
     * @return A Page of properties that are rented by the tenant with the given ID.
     */
    Page<Property> findByTenantIdNumber(String tenantIdNumber, Pageable pageable);
}
