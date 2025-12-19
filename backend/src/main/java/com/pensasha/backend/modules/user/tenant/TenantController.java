package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.unit.Unit;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing Tenant operations.
 */
@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
@Slf4j
public class TenantController {

    private final TenantService tenantService;

    /**
     * Get tenant details by ID number.
     */
    @GetMapping("/{idNumber}")
    public ResponseEntity<TenantDTO> getTenantByIdNumber(@PathVariable String idNumber) {
        log.info("GET /api/tenants/{}", idNumber);
        TenantDTO tenantDTO = tenantService.getTenantByIdNumber(idNumber);
        return ResponseEntity.ok(tenantDTO);
    }

    /**
     * Get all tenants with pagination.
     */
    @GetMapping
    public ResponseEntity<Page<TenantDTO>> getAllTenants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("GET /api/tenants?page={}&size={}", page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<TenantDTO> tenants = tenantService.getAllTenants(pageable);
        return ResponseEntity.ok(tenants);
    }

    /**
     * Update emergency contact for a tenant.
     */
    @PatchMapping("/{idNumber}/emergency-contact")
    public ResponseEntity<TenantDTO> updateEmergencyContact(
            @PathVariable String idNumber,
            @RequestParam String emergencyContact) {
        log.info("PATCH /api/tenants/{}/emergency-contact", idNumber);
        TenantDTO updatedTenant = tenantService.updateEmergencyContact(idNumber, emergencyContact);
        return ResponseEntity.ok(updatedTenant);
    }

    /**
     * Update rental units for a tenant.
     */
    @PutMapping("/{idNumber}/rental-units")
    public ResponseEntity<TenantDTO> updateRentalUnits(
            @PathVariable String idNumber,
            @RequestBody List<Unit> units) {
        log.info("PUT /api/tenants/{}/rental-units", idNumber);
        TenantDTO updatedTenant = tenantService.updateRentalUnits(idNumber, units);
        return ResponseEntity.ok(updatedTenant);
    }

    /**
     * Update leases for a tenant.
     */
    @PutMapping("/{idNumber}/leases")
    public ResponseEntity<TenantDTO> updateLeases(
            @PathVariable String idNumber,
            @RequestBody List<Lease> leases) {
        log.info("PUT /api/tenants/{}/leases", idNumber);
        TenantDTO updatedTenant = tenantService.updateLeases(idNumber, leases);
        return ResponseEntity.ok(updatedTenant);
    }

    /**
     * Delete tenant by database ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTenant(@PathVariable Long id) {
        log.info("DELETE /api/tenants/{}", id);
        boolean deleted = tenantService.deleteTenant(id);
        if (deleted) {
            return ResponseEntity.ok("Tenant deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}