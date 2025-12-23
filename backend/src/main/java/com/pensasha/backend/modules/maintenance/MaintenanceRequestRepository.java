package com.pensasha.backend.modules.maintenance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {

    // Find maintenance requests by tenant ID
    List<MaintenanceRequest> findByTenantId(Long tenantId);
    
}
