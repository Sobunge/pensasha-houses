package com.pensasha.backend.modules.lease;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository interface for managing Lease entities.
 * <p>
 * Extends JpaRepository to provide standard CRUD operations
 * and query method execution for the Lease entity.
 * </p>
 *
 */
public interface LeaseRepository extends JpaRepository<Lease, Long> {

    @Query("SELECT COUNT(DISTINCT l.tenant.id) FROM Lease l " +
            "WHERE l.unit.property.landlord.id = :landlordId " +
            "AND l.leaseEndDate >= CURRENT_DATE")
    long countActiveTenantsByLandlordId(@Param("landlordId") Long landlordId);

    @Query("SELECT COUNT(l) FROM Lease l " +
            "WHERE l.unit.property.landlord.id = :landlordId " +
            "AND l.leaseEndDate BETWEEN CURRENT_DATE AND :thirtyDaysFromNow")
    long countExpiringLeasesByLandlordId(
            @Param("landlordId") Long landlordId,
            @Param("thirtyDaysFromNow") LocalDate thirtyDaysFromNow);

}