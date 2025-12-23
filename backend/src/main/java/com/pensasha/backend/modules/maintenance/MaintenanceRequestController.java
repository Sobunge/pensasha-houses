package com.pensasha.backend.modules.maintenance;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pensasha.backend.modules.maintenance.dto.CreateMaintenanceRequestDTO;
import com.pensasha.backend.modules.maintenance.dto.MaintenanceRequestResponseDTO;
import com.pensasha.backend.modules.maintenance.dto.UpdateMaintenanceRequestDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/maintenance-requests")
@RequiredArgsConstructor
public class MaintenanceRequestController {

    private final MaintenanceRequestService maintenanceRequestService;

    /**
     * CREATE a new maintenance request
     */
    @PostMapping
    public ResponseEntity<MaintenanceRequestResponseDTO> createRequest(
            @RequestParam Long tenantId,
            @Valid @RequestBody CreateMaintenanceRequestDTO dto) {

        MaintenanceRequestResponseDTO response = maintenanceRequestService.createRequest(tenantId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET a single maintenance request by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequestResponseDTO> getRequest(@PathVariable Long id) {
        MaintenanceRequestResponseDTO response = maintenanceRequestService.getRequest(id);
        return ResponseEntity.ok(response);
    }

    /**
     * UPDATE maintenance request details (type, priority, description)
     */
    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceRequestResponseDTO> updateRequest(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMaintenanceRequestDTO dto) {

        MaintenanceRequestResponseDTO response = maintenanceRequestService.updateRequest(
                id,
                dto.getType(),
                dto.getPriority(),
                dto.getDescription()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * UPDATE maintenance request status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<MaintenanceRequestResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam MaintenanceStatus status) {

        MaintenanceRequestResponseDTO response = maintenanceRequestService.updateStatus(id, status);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE a maintenance request
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        maintenanceRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET all maintenance requests for a tenant
     */
    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<MaintenanceRequestResponseDTO>> getRequestsByTenant(@PathVariable Long tenantId) {
        List<MaintenanceRequestResponseDTO> requests = maintenanceRequestService.getRequestsByTenant(tenantId);
        return ResponseEntity.ok(requests);
    }
}
