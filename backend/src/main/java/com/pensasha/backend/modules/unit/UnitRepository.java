package com.pensasha.backend.modules.unit;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Unit entity.
 * Provides methods to perform CRUD operations and custom queries for Unit entities in the database.
 */
public interface UnitRepository extends JpaRepository<Unit, Long> {

}
