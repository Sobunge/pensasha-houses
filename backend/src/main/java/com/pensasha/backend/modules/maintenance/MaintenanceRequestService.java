package com.pensasha.backend.modules.maintenance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    // Create manitenance request
    public MaintenanceRequest createRequest(MaintenanceRequest request) {
        return maintenanceRequestRepository.save(request);
    }

    // Get all manitenace request for tenant
    public List<MaintenanceRequest> getRequestsByTenantId(Long tenantId) {
        return maintenanceRequestRepository.findByTenantId(tenantId);
    }

    // Get maintenance request by id
    public MaintenanceRequest getRequestById(Long id) {
        return maintenanceRequestRepository.findById(id).orElse(null);
    }

    // Update maintenance request
    public MaintenanceRequest updateRequest(MaintenanceRequest request) {
        return maintenanceRequestRepository.save(request);
    }

    // Delete maintenance request
    public void deleteRequest(Long id) {
        maintenanceRequestRepository.deleteById(id);
    }

}
