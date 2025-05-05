package com.pensasha.backend.modules.invoice;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceSequenceRepository extends JpaRepository<InvoiceSequence, Long> {
}