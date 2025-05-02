package com.pensasha.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pensasha.backend.entity.InvoiceSequence;

public interface InvoiceSequenceRepository extends JpaRepository<InvoiceSequence, Long> {
}