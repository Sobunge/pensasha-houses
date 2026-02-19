package com.pensasha.backend.modules.invoice;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for accessing and managing Invoice entities.
 * Extends JpaRepository to inherit basic CRUD operations and adds custom query methods.
 */
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    /**
     * Retrieves a paginated list of invoices for a given tenant's ID number.
     *
     * @param idNumber Tenant's national ID or identification number.
     * @param pageable Pageable object to handle pagination and sorting.
     * @return A paginated list of matching invoices.
     */
    Page<Invoice> findByTenantUserIdNumber(String idNumber, Pageable pageable);

    /**
     * Retrieves a paginated list of invoices for a specific property via the lease's unit.
     *
     * @param propertyId The ID of the property.
     * @param pageable   Pageable object to handle pagination and sorting.
     * @return A paginated list of invoices for the given property.
     */
    Page<Invoice> findByLeaseUnitPropertyId(Long propertyId, Pageable pageable);

    /**
     * Retrieves a paginated list of invoices for a specific property within a given date range.
     *
     * @param propertyId The ID of the property.
     * @param startDate  The start date of the invoice date range.
     * @param endDate    The end date of the invoice date range.
     * @param pageable   Pageable object to handle pagination and sorting.
     * @return A paginated list of invoices matching the criteria.
     */
    Page<Invoice> findByLeaseUnitPropertyIdAndInvoiceDateBetween(
            Long propertyId, LocalDate startDate, LocalDate endDate, Pageable pageable);

    /**
     * Retrieves a paginated list of invoices for a specific property with a given invoice status.
     *
     * @param propertyId The ID of the property.
     * @param status     The status of the invoice (e.g., OPEN, CLOSED).
     * @param pageable   Pageable object to handle pagination and sorting.
     * @return A paginated list of invoices matching the property and status.
     */
    Page<Invoice> findByLeaseUnitPropertyIdAndStatus(
            Long propertyId, InvoiceStatus status, Pageable pageable);

    /**
     * Retrieves a paginated list of invoices for a specific property with a given status
     * within a specified date range.
     *
     * @param propertyId The ID of the property.
     * @param status     The status of the invoice.
     * @param startDate  The start date of the invoice date range.
     * @param endDate    The end date of the invoice date range.
     * @param pageable   Pageable object to handle pagination and sorting.
     * @return A paginated list of invoices matching the criteria.
     */
    Page<Invoice> findByLeaseUnitPropertyIdAndStatusAndInvoiceDateBetween(
            Long propertyId, InvoiceStatus status, LocalDate startDate, LocalDate endDate,
            Pageable pageable);
}
