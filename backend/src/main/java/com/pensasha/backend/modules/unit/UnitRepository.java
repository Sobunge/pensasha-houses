package com.pensasha.backend.modules.unit;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
    // We point to tenant.id because the field in Unit is 'tenant'
    List<Unit> findByTenantId(Long tenantId);
    
    // Useful for the frontend property details view
    List<Unit> findByPropertyId(Long propertyId);
}