package com.pensasha.backend.modules.invoice;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for accessing and managing {@link InvoiceSequence}
 * entities.
 * 
 * This repository provides CRUD operations for the InvoiceSequence entity by
 * extending the JpaRepository interface.
 */
public interface InvoiceSequenceRepository extends JpaRepository<InvoiceSequence, Long> {
    // No custom query methods are defined here — it inherits standard CRUD methods
    // from JpaRepository.
}
