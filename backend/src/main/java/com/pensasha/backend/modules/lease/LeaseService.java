package com.pensasha.backend.modules.lease;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.pensasha.backend.exceptions.ResourceNotFoundException;

import java.util.List;

/**
 * Service class responsible for handling business logic
 * related to Lease entities.
 */
@Service
@RequiredArgsConstructor // Inject final fields via constructor
@Slf4j // Lombok annotation for logging
public class LeaseService {

    private final LeaseRepository leaseRepository;

    /**
     * Fetch all leases from the database.
     * 
     * @return a list of Lease objects.
     */
    public List<Lease> getAllLeases() {
        log.info("Fetching all leases from database");
        List<Lease> leases = leaseRepository.findAll();
        log.debug("Found {} leases", leases.size());
        return leases;
    }

    /**
     * Retrieve a lease by its ID.
     * 
     * @param id the ID of the lease to retrieve.
     * @return an Optional containing the found Lease, or empty if not found.
     */
    public Lease getLeaseById(Long id) {
        log.info("Fetching lease with ID: {}", id);
        return leaseRepository.findById(id).orElseThrow(() -> {
            log.error("Lease not found with ID: {}", id);
            return new ResourceNotFoundException("Lease not found with id: " + id);
        });
    }

    /**
     * Save a new lease to the database.
     * 
     * @param lease the Lease object to save.
     * @return the saved Lease object.
     */
    public Lease saveLease(Lease lease) {
        log.info("Saving new lease for tenant: {}, unit: {}",
                lease.getTenant().getId(), lease.getUnit().getId());
        Lease savedLease = leaseRepository.save(lease);
        log.debug("Lease saved successfully with ID: {}", savedLease.getId());
        return savedLease;
    }

    /**
     * Delete a lease by its ID.
     * 
     * @param id the ID of the lease to delete.
     */
    public void deleteLease(Long id) {
        log.info("Attempting to delete lease with ID: {}", id);
        if (leaseRepository.existsById(id)) {
            leaseRepository.deleteById(id);
            log.debug("Lease with ID: {} deleted successfully", id);
        } else {
            log.warn("Lease with ID: {} does not exist, deletion skipped", id);
        }
    }
}