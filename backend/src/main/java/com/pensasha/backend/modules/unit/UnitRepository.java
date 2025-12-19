package com.pensasha.backend.modules.unit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Unit entity.
 * Provides methods to perform CRUD operations and custom queries for Unit
 * entities in the database.
 */
public interface UnitRepository extends JpaRepository<Unit, Long> {

    /**
     * Finds all units associated with a specific tenant ID.
     * 
     * @param tenantId The ID of the tenant.
     * @return A list of Unit entities associated with the given tenant ID.
     */
    public List<Unit> findByTenantId(Long tenantId);

}
