package com.pensasha.backend.modules.maintenance;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.unit.UnitRepository;
import com.pensasha.backend.modules.user.tenant.Tenant;
import com.pensasha.backend.modules.user.tenant.TenantRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MaintenanceRequestService {

    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final UnitRepository unitRepository;
    private final TenantRepository tenantRepository;

    // CREATE
    public MaintenanceRequest createRequest(
            Long tenantId,
            Long unitId,
            MaintenanceType type,
            MaintenancePriority priority,
            String description) {

        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new EntityNotFoundException("Unit not found"));

        MaintenanceRequest request = new MaintenanceRequest(
                type,
                priority,
                description,
                unit,
                tenant
        );

        return maintenanceRequestRepository.save(request);
    }

    // READ
    public MaintenanceRequest getRequest(Long id) {
        return maintenanceRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Maintenance request not found: " + id));
    }

    // UPDATE (controlled)
    public MaintenanceRequest updateRequest(
            Long requestId,
            MaintenanceType type,
            MaintenancePriority priority,
            String description) {

        MaintenanceRequest request = getRequest(requestId);

        request.updateDetails(type, priority, description);

        return request; // managed entity — auto flushed
    }

    // STATUS CHANGE
    public MaintenanceRequest updateStatus(Long requestId, MaintenanceStatus status) {
        MaintenanceRequest request = getRequest(requestId);
        request.updateStatus(status);
        return request;
    }

    // DELETE
    public void deleteRequest(Long requestId) {
        MaintenanceRequest request = getRequest(requestId);

        if (request.getStatus() == MaintenanceStatus.COMPLETED) {
            throw new IllegalStateException("Completed requests cannot be deleted");
        }

        maintenanceRequestRepository.delete(request);
    }

    // QUERY
    public List<MaintenanceRequest> getRequestsByTenant(Long tenantId) {
        return maintenanceRequestRepository.findByTenantId(tenantId);
    }
}
