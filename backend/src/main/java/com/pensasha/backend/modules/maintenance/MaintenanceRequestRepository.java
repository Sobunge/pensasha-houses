package com.pensasha.backend.modules.maintenance;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {

    // Find maintenance requests by tenant ID
    List<MaintenanceRequest> findByTenantId(Long tenantId);

    @Query("SELECT m FROM MaintenanceRequest m " +
            "WHERE m.unit.property.landlord.id = :landlordId " +
            "ORDER BY m.requestDate DESC")
    List<MaintenanceRequest> findRecentByLandlordId(@Param("landlordId") Long landlordId, Pageable pageable);

}
