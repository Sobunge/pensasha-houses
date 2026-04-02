package com.pensasha.backend.modules.lease;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Lease entities.
 */
@RestController
@RequestMapping("/api/leases")
@RequiredArgsConstructor
@Slf4j
public class LeaseController {

    private final LeaseService leaseService;

    /**
     * Retrieve all leases.
     * 
     * @return a list of all Lease entities.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('RENT_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<List<Lease>> getAllLeases() {
        log.info("API call: GET /api/leases");
        List<Lease> leases = leaseService.getAllLeases();
        return ResponseEntity.ok(leases);
    }

    /**
     * Retrieve a lease by its ID.
     * 
     * @param id the ID of the lease.
     * @return the Lease entity.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('RENT_VIEW') or hasRole('ADMIN')")
    public ResponseEntity<Lease> getLeaseById(@PathVariable Long id) {
        log.info("API call: GET /api/leases/{}", id);
        Lease lease = leaseService.getLeaseById(id);
        return ResponseEntity.ok(lease);
    }

    /**
     * Create a new lease.
     * 
     * @param lease the Lease entity to create.
     * @return the created Lease entity.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('RENT_MANAGE_INVOICES') or hasRole('ADMIN')")
    public ResponseEntity<Lease> createLease(@RequestBody Lease lease) {
        log.info("API call: POST /api/leases - Creating lease");
        Lease createdLease = leaseService.saveLease(lease);
        return new ResponseEntity<>(createdLease, HttpStatus.CREATED);
    }

    /**
     * Delete a lease by its ID.
     * 
     * @param id the ID of the lease to delete.
     * @return a success message.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('RENT_MANAGE_INVOICES') or hasRole('ADMIN')")
    public ResponseEntity<String> deleteLease(@PathVariable Long id) {
        log.info("API call: DELETE /api/leases/{}", id);
        leaseService.deleteLease(id);
        return ResponseEntity.ok("Lease with ID " + id + " deleted successfully.");
    }
}
