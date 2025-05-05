package com.pensasha.backend.repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.invoice.InvoiceStatus;

public interface InvoiceRepository extends JpaRepository<Invoice, String> {

    Page<Invoice> findByTenantIdNumber(String idNumber, Pageable pageable);

    Page<Invoice> findByTenantUnitPropertyId(Long propertyId, Pageable pageable);

    Page<Invoice> findByTenantUnitPropertyIdAndInvoiceDateBetween(
            Long propertyId, LocalDate startDate, LocalDate endDate, Pageable pageable);

    Page<Invoice> findByTenantUnitPropertyIdAndStatus(
            Long propertyId, InvoiceStatus status, Pageable pageable);

    Page<Invoice> findByTenantUnitPropertyIdAndStatusAndInvoiceDateBetween(
            Long propertyId, InvoiceStatus status, LocalDate startDate, LocalDate endDate, Pageable pageable);

}
