package com.pensasha.backend.modules.user.tenant;

import com.pensasha.backend.modules.lease.Lease;
import com.pensasha.backend.modules.user.tenant.dto.TenantDTO;
import com.pensasha.backend.modules.user.tenant.dto.UpdateTenantDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        @PreAuthorize("hasAuthority('TENANT_VIEW') or hasRole('ADMIN')")
        public ResponseEntity<TenantDTO> getTenantById(@PathVariable Long id) {
                log.info("GET /api/tenants/{}", id);
                TenantDTO tenantDTO = tenantService.getTenantById(id);
                return ResponseEntity.ok(tenantDTO);
        }

        /**
         * Get all tenants with pagination.
         */
        @GetMapping
        @PreAuthorize("hasAuthority('TENANT_VIEW') or hasRole('ADMIN')")
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
         @PreAuthorize("hasAuthority('TENANT_MANAGE_PROFILE') or hasRole('ADMIN')")
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
        @PreAuthorize("hasAuthority('RENT_MANAGE_INVOICES') or hasRole('ADMIN')")
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
        @PreAuthorize("hasAuthority('TENANT_DELETE') or hasRole('ADMIN')")
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
        @PreAuthorize("hasAuthority('TENANT_MANAGE_PROFILE') or hasRole('ADMIN')")
        public ResponseEntity<TenantDTO> updateTenant(
                        @PathVariable Long id,
                        @Valid @RequestBody UpdateTenantDTO updateTenantDTO) {
                log.info("PUT /api/tenants/{}", id);

                TenantDTO updatedTenant = tenantService.updateTenantDetails(id, updateTenantDTO);

                return ResponseEntity.ok(updatedTenant);
        }

}
