package com.pensasha.backend.modules.invoice;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.modules.user.tenant.TenantRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final TenantRepository tenantRepository;
    private final InvoiceSequenceRepository invoiceSequenceRepository;

    @Transactional
    public String generateInvoiceNumber() {
        log.info("Generating new invoice number");

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
        String invoiceNumber = "INV-%s-%04d".formatted(year, newNumber);

        log.info("Generated invoice number: {}", invoiceNumber);
        return invoiceNumber;
    }

    public Invoice createInvoice(Invoice invoice) {
        log.info("Creating invoice: {}", invoice);
        if (invoice.getInvoiceNumber() == null) {
            invoice.setInvoiceNumber(UUID.randomUUID()); // generate UUID
        }
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public void generateMonthlyInvoices() {
        log.info("Generating monthly invoices for active tenants");

        List<Invoice> newInvoices = tenantRepository.findAll().stream()
                .map(tenant -> {
                    Invoice invoice = new Invoice();
                    invoice.setInvoiceNumber(UUID.randomUUID());
                    invoice.setTenant(tenant);
                    invoice.setInvoiceDate(LocalDate.now());
                    invoice.setDueDate(LocalDate.now().plusDays(5));
                    invoice.setStatus(InvoiceStatus.PENDING);
                    return invoice;
                })
                .toList();

        invoiceRepository.saveAll(newInvoices);
        log.info("Generated and saved {} invoices", newInvoices.size());
    }

    @Transactional
    public Invoice updateInvoiceStatus(UUID invoiceNumber, InvoiceStatus status) {
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

    @Transactional
    public void deleteInvoice(UUID invoiceNumber) {
        log.info("Attempting to delete invoice {}", invoiceNumber);

        Invoice invoice = invoiceRepository.findById(invoiceNumber)
                .orElseThrow(() -> {
                    log.error("Invoice {} not found for deletion", invoiceNumber);
                    return new RuntimeException("Invoice not found");
                });

        if (InvoiceStatus.PAID.equals(invoice.getStatus()) || InvoiceStatus.CLOSED.equals(invoice.getStatus())) {
            log.warn("Cannot delete invoice {} with status {}", invoiceNumber, invoice.getStatus());
            throw new RuntimeException("Cannot delete a paid or closed invoice.");
        }

        invoiceRepository.deleteById(invoiceNumber);
        log.info("Invoice {} deleted successfully", invoiceNumber);
    }

    public Page<Invoice> getAllInvoices(Pageable pageable) {
        log.info("Fetching all invoices");
        return invoiceRepository.findAll(pageable);
    }

    public Page<Invoice> getInvoicesByTenant(String idNumber, Pageable pageable) {
        log.info("Fetching invoices for tenant with ID number: {}", idNumber);
        return invoiceRepository.findByTenantIdNumber(idNumber, pageable);
    }

    public Page<Invoice> getInvoicesByProperty(Long propertyId, Pageable pageable) {
        log.info("Fetching invoices for property ID: {}", propertyId);
        return invoiceRepository.findByLeaseUnitPropertyId(propertyId, pageable);
    }

    public Page<Invoice> getInvoicesByPropertyAndDateRange(
            Long propertyId, LocalDate startDate, LocalDate endDate, int page, int size) {
        log.info("Fetching invoices for property {} between {} and {}", propertyId, startDate, endDate);
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByLeaseUnitPropertyIdAndInvoiceDateBetween(
                propertyId, startDate, endDate, pageable);
    }

    public Page<Invoice> getInvoicesByPropertyAndStatus(
            Long propertyId, InvoiceStatus status, int page, int size) {
        log.info("Fetching invoices for property {} with status {}", propertyId, status);
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByLeaseUnitPropertyIdAndStatus(propertyId, status, pageable);
    }

    public Page<Invoice> getInvoicesByPropertyStatusAndDateRange(
            Long propertyId, InvoiceStatus status, LocalDate startDate, LocalDate endDate, int page, int size) {
        log.info("Fetching invoices for property {} with status {} between {} and {}",
                propertyId, status, startDate, endDate);
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByLeaseUnitPropertyIdAndStatusAndInvoiceDateBetween(
                propertyId, status, startDate, endDate, pageable);
    }

    public Invoice getInvoice(UUID invoiceNumber) {
        log.info("Fetching invoice with number {}", invoiceNumber);
        return invoiceRepository.findById(invoiceNumber).orElse(null);
    }
}
