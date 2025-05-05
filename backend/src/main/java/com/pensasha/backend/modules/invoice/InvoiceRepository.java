package com.pensasha.backend.modules.invoice;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, String> {

    Page<Invoice> findByTenantIdNumber(String idNumber, Pageable pageable);

    Page<Invoice> findByTenantRentalUnitsPropertyId(Long propertyId, Pageable pageable);

    Page<Invoice> findByTenantRentalUnitsPropertyIdAndInvoiceDateBetween(
            Long propertyId, LocalDate startDate, LocalDate endDate, Pageable pageable);

    Page<Invoice> findByTenantRentalUnitsPropertyIdAndStatus(
            Long propertyId, InvoiceStatus status, Pageable pageable);

    Page<Invoice> findByTenantRentalUnitsPropertyIdAndStatusAndInvoiceDateBetween(
            Long propertyId, InvoiceStatus status, LocalDate startDate, LocalDate endDate, Pageable pageable);

}
