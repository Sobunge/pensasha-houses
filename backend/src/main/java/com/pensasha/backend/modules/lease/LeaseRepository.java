package com.pensasha.backend.modules.lease;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for managing Lease entities.
 * <p>
 * Extends JpaRepository to provide standard CRUD operations
 * and query method execution for the Lease entity.
 * </p>
 *
 */
public interface LeaseRepository extends JpaRepository<Lease, Long> {
}