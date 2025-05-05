package com.pensasha.backend.modules.unit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Unit entity.
 * Provides methods to perform CRUD operations and custom queries for Unit entities in the database.
 */
public interface UnitRepository extends JpaRepository<Unit, Long> {

    /**
     * Retrieves a page of units that match the specified occupied status.
     * 
     * @param isOccupied The occupancy status to filter units by (true for occupied, false for vacant).
     * @param pageable Pagination information (e.g., page number, page size).
     * @return A Page of units that are either occupied or vacant based on the provided status.
     */
    Page<Unit> findByIsOccupied(boolean isOccupied, Pageable pageable);
}
