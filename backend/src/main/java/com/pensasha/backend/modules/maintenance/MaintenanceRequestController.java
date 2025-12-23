package com.pensasha.backend.modules.maintenance;

import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MaintenanceRequestController {
    
    private final MaintenanceRequestService maintenanceRequestService;

    //Adding a maintenance request
    public MaintenanceRequest addMaintenanceRequest(MaintenanceRequest request) {
        return maintenanceRequestService.createRequest(request);
    }

    //Updating a maintenance request
    public MaintenanceRequest updateMaintenanceRequest(Long id, MaintenanceRequest updatedRequest) {

    MaintenanceRequest existing = maintenanceRequestService
            .getRequestById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                    "MaintenanceRequest not found with id: " + id
            ));

    // Explicit field updates — do NOT replace the entity
    existing.setTitle(updatedRequest.getTitle());
    existing.setDescription(updatedRequest.getDescription());
    existing.setStatus(updatedRequest.getStatus());
    existing.setPriority(updatedRequest.getPriority());

    return maintenanceRequestService.updateRequest(existing);
}


}
