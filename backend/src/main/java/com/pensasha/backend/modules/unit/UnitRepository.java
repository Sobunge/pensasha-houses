package com.pensasha.backend.modules.unit;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    
    // Finds units by TenantProfile's ID
    List<Unit> findByTenantId(Long tenantId);
    
    // Finds units by the underlying User ID linked to TenantProfile
    List<Unit> findByTenantUserId(Long userId);
    
    // Useful for the frontend property details view
    List<Unit> findByPropertyId(Long propertyId);
}