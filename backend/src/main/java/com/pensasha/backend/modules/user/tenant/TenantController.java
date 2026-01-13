package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;
import com.pensasha.backend.modules.user.tenant.dto.UpdateTenantDTO;

import jakarta.validation.Valid;
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
         * Get tenant details by database ID.
         */
        @GetMapping("/{id}")
        public ResponseEntity<TenantDTO> getTenantById(@PathVariable Long id) {
                log.info("GET /api/tenants/{}", id);
                TenantDTO tenantDTO = tenantService.getTenantById(id);
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

                Pageable pageable = PageRequest.of(
                                page,
                                size,
                                Sort.by(Sort.Direction.DESC, "id"));

                Page<TenantDTO> tenants = tenantService.getAllTenants(pageable);
                return ResponseEntity.ok(tenants);
        }

        /**
         * Update emergency contact for a tenant by ID.
         */
        @PatchMapping("/{id}/emergency-contact")
        public ResponseEntity<TenantDTO> updateEmergencyContact(
                        @PathVariable Long id,
                        @RequestParam String emergencyContact) {
                log.info("PATCH /api/tenants/{}/emergency-contact", id);

                TenantDTO updatedTenant = tenantService.updateEmergencyContact(id, emergencyContact);

                return ResponseEntity.ok(updatedTenant);
        }

        /**
         * Update leases for a tenant by ID.
         */
        @PutMapping("/{id}/leases")
        public ResponseEntity<TenantDTO> updateLeases(
                        @PathVariable Long id,
                        @RequestBody List<Lease> leases) {
                log.info("PUT /api/tenants/{}/leases", id);

                TenantDTO updatedTenant = tenantService.updateLeases(id, leases);

                return ResponseEntity.ok(updatedTenant);
        }

        /**
         * Delete tenant by database ID.
         */
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
                log.info("DELETE /api/tenants/{}", id);

                boolean deleted = tenantService.deleteTenant(id);
                return deleted
                                ? ResponseEntity.noContent().build()
                                : ResponseEntity.notFound().build();
        }

        /**
         * Update tenant information by ID.
         */
        @PutMapping("/{id}")
        public ResponseEntity<TenantDTO> updateTenant(
                        @PathVariable Long id,
                        @Valid @RequestBody UpdateTenantDTO updateTenantDTO) {
                log.info("PUT /api/tenants/{}", id);

                TenantDTO updatedTenant = tenantService.updateTenantDetails(id, updateTenantDTO);

                return ResponseEntity.ok(updatedTenant);
        }

}
