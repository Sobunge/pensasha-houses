package com.pensasha.backend.modules.invoice;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.modules.user.tenant.TenantRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service // Marks this class as a Spring-managed service component
@RequiredArgsConstructor // Lombok generates a constructor for all final fields
@Slf4j // Lombok annotation to enable logging with Slf4j
public class InvoiceService {

    // Dependencies injected via constructor
    private final InvoiceRepository invoiceRepository;
    private final TenantRepository tenantRepository;
    private final InvoiceSequenceRepository invoiceSequenceRepository;

    /**
     * Generates a unique invoice number using a database-backed sequence.
     * Invoice number format: INV-{YEAR}-{SEQUENCE}
     * 
     * @return generated invoice number
     */
    @Transactional
    public String generateInvoiceNumber() {
        log.info("Generating new invoice number");

        // Fetch or initialize sequence
        InvoiceSequence sequence = invoiceSequenceRepository.findById(1L)
                .orElseGet(() -> {
                    log.warn("Invoice sequence not found, creating new sequence");
                    InvoiceSequence seq = new InvoiceSequence();
                    seq.setId(1L);
                    seq.setLastNumber(0L);
                    return seq;
                });

        Long newNumber = sequence.getLastNumber() + 1;
        sequence.setLastNumber(newNumber);
        invoiceSequenceRepository.save(sequence);

        String year = String.valueOf(LocalDate.now().getYear());
        String invoiceNumber = String.format("INV-%s-%04d", year, newNumber);

        log.info("Generated invoice number: {}", invoiceNumber);
        return invoiceNumber;
    }

    /**
     * Creates a new invoice and saves it to the database.
     *
     * @param invoice invoice to be created
     * @return saved invoice
     */
    public Invoice createInvoice(Invoice invoice) {
        log.info("Creating invoice: {}", invoice);
        return invoiceRepository.save(invoice);
    }

    /**
     * Generates monthly invoices for all active tenants with valid leases.
     */
    @Transactional
    public void generateMonthlyInvoices() {
        log.info("Generating monthly invoices for active tenants");

        List<Invoice> newInvoices = tenantRepository.findAll().stream()
                .filter(tenant -> tenant.getLeaseEndDate().isAfter(LocalDate.now()))
                .map(tenant -> {
                    Invoice invoice = new Invoice();
                    invoice.setInvoiceNumber(generateInvoiceNumber());
                    invoice.setTenant(tenant);
                    invoice.setAmountDue(tenant.getMonthlyRent());
                    invoice.setInvoiceDate(LocalDate.now());
                    invoice.setDueDate(LocalDate.now().plusDays(5));
                    invoice.setStatus(InvoiceStatus.PENDING);
                    return invoice;
                })
                .toList();

        invoiceRepository.saveAll(newInvoices);
        log.info("Generated and saved {} invoices", newInvoices.size());
    }

    /**
     * Updates the status of an invoice.
     *
     * @param invoiceNumber invoice number to update
     * @param status        new status
     * @return updated invoice
     */
    @Transactional
    public Invoice updateInvoiceStatus(String invoiceNumber, InvoiceStatus status) {
        log.info("Updating status of invoice {} to {}", invoiceNumber, status);

        Invoice invoice = invoiceRepository.findById(invoiceNumber)
                .orElseThrow(() -> {
                    log.error("Invoice {} not found", invoiceNumber);
                    return new RuntimeException("Invoice not found");
                });

        invoice.setStatus(status);
        Invoice updated = invoiceRepository.save(invoice);
        log.info("Invoice {} updated successfully", invoiceNumber);

        return updated;
    }

    /**
     * Deletes an invoice if it is not paid or closed.
     *
     * @param invoiceNumber invoice number to delete
     */
    @Transactional
    public void deleteInvoice(String invoiceNumber) {
        log.info("Attempting to delete invoice {}", invoiceNumber);

        Invoice invoice = invoiceRepository.findById(invoiceNumber)
                .orElseThrow(() -> {
                    log.error("Invoice {} not found for deletion", invoiceNumber);
                    return new RuntimeException("Invoice not found");
                });

        if (InvoiceStatus.PAID.equals(invoice.getStatus())) {
            log.warn("Cannot delete paid invoice {}", invoiceNumber);
            throw new RuntimeException("Cannot delete a paid invoice.");
        }

        if (InvoiceStatus.CLOSED.equals(invoice.getStatus())) {
            log.warn("Cannot delete closed invoice {}", invoiceNumber);
            throw new RuntimeException("Cannot delete a closed invoice.");
        }

        invoiceRepository.deleteById(invoiceNumber);
        log.info("Invoice {} deleted successfully", invoiceNumber);
    }

    /**
     * Retrieves a paginated list of all invoices.
     *
     * @param pageable pagination configuration
     * @return page of invoices
     */
    public Page<Invoice> getAllInvoices(Pageable pageable) {
        log.info("Fetching all invoices");
        return invoiceRepository.findAll(pageable);
    }

    /**
     * Retrieves a paginated list of invoices for a specific tenant.
     *
     * @param idNumber tenant national ID
     * @param pageable pagination configuration
     * @return page of invoices
     */
    public Page<Invoice> getInvoicesByTenant(String idNumber, Pageable pageable) {
        log.info("Fetching invoices for tenant with ID number: {}", idNumber);
        return invoiceRepository.findByTenantIdNumber(idNumber, pageable);
    }

    /**
     * Retrieves a paginated list of invoices for a property.
     *
     * @param propertyId property identifier
     * @param pageable   pagination configuration
     * @return page of invoices
     */
    public Page<Invoice> getInvoicesByProperty(Long propertyId, Pageable pageable) {
        log.info("Fetching invoices for property ID: {}", propertyId);
        return invoiceRepository.findByTenantRentalUnitsPropertyId(propertyId, pageable);
    }

    /**
     * Retrieves invoices for a property within a specific date range.
     *
     * @param propertyId property ID
     * @param startDate  start of date range
     * @param endDate    end of date range
     * @param page       page number
     * @param size       page size
     * @return page of invoices
     */
    public Page<Invoice> getInvoicesByPropertyAndDateRange(
            Long propertyId, LocalDate startDate, LocalDate endDate, int page, int size) {
        log.info("Fetching invoices for property {} between {} and {}", propertyId, startDate, endDate);
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByTenantRentalUnitsPropertyIdAndInvoiceDateBetween(
                propertyId, startDate, endDate, pageable);
    }

    /**
     * Retrieves invoices for a property by status.
     *
     * @param propertyId property ID
     * @param status     invoice status
     * @param page       page number
     * @param size       page size
     * @return page of invoices
     */
    public Page<Invoice> getInvoicesByPropertyAndStatus(
            Long propertyId, InvoiceStatus status, int page, int size) {
        log.info("Fetching invoices for property {} with status {}", propertyId, status);
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByTenantRentalUnitsPropertyIdAndStatus(propertyId, status, pageable);
    }

    /**
     * Retrieves invoices for a property by status and within a date range.
     *
     * @param propertyId property ID
     * @param status     invoice status
     * @param startDate  start date
     * @param endDate    end date
     * @param page       page number
     * @param size       page size
     * @return page of invoices
     */
    public Page<Invoice> getInvoicesByPropertyStatusAndDateRange(
            Long propertyId, InvoiceStatus status, LocalDate startDate, LocalDate endDate, int page, int size) {
        log.info("Fetching invoices for property {} with status {} between {} and {}",
                propertyId, status, startDate, endDate);
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByTenantRentalUnitsPropertyIdAndStatusAndInvoiceDateBetween(
                propertyId, status, startDate, endDate, pageable);
    }

    /**
     * Retrieves a single invoice by its invoice number.
     *
     * @param invoiceNumber invoice number
     * @return the found invoice or null if not found
     */
    public Invoice getInvoice(String invoiceNumber) {
        log.info("Fetching invoice with number {}", invoiceNumber);
        return invoiceRepository.findById(invoiceNumber).orElse(null);
    }
}
