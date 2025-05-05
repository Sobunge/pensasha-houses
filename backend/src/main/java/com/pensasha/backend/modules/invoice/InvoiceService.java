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

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final TenantRepository tenantRepository;
    private final InvoiceSequenceRepository invoiceSequenceRepository;

    // Generate invoice number using database sequence
    @Transactional
    public String generateInvoiceNumber() {
        InvoiceSequence sequence = invoiceSequenceRepository.findById(1L)
                .orElseGet(() -> {
                    InvoiceSequence seq = new InvoiceSequence();
                    seq.setId(1L);
                    seq.setLastNumber(0L);
                    return seq;
                });

        Long newNumber = sequence.getLastNumber() + 1;
        sequence.setLastNumber(newNumber);
        invoiceSequenceRepository.save(sequence);

        String year = String.valueOf(LocalDate.now().getYear());
        return String.format("INV-%s-%04d", year, newNumber);
    }

    // Manual generation of an invoice
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    /**
     * Generates invoices for all active tenants.
     */
    @Transactional
    public void generateMonthlyInvoices() {
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
    }

    // Controlled update: update only status and payment date
    @Transactional
    public Invoice updateInvoiceStatus(String invoiceNumber, InvoiceStatus status) {
        Invoice invoice = invoiceRepository.findById(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        invoice.setStatus(status);

        return invoiceRepository.save(invoice);
    }

    // Deleting an invoice
    @Transactional
    public void deleteInvoice(String invoiceNumber) {
        Invoice invoice = invoiceRepository.findById(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        // Check if the invoice is paid
        if (InvoiceStatus.PAID.equals(invoice.getStatus())) {
            throw new RuntimeException("Cannot delete a paid invoice.");
        }

        // Optional: Check for other conditions like 'Closed' or 'Archived'
        if (InvoiceStatus.CLOSED.equals(invoice.getStatus())) {
            throw new RuntimeException("Cannot delete a closed invoice.");
        }

        invoiceRepository.deleteById(invoiceNumber);
    }

    // Viewing all invoices
    public Page<Invoice> getAllInvoices(Pageable pageable) {
        return invoiceRepository.findAll(pageable);
    }

    // Viewing all invoices by tenant
    public Page<Invoice> getInvoicesByTenant(String idNumber, Pageable pageable) {
        return invoiceRepository.findByTenantIdNumber(idNumber, pageable);
    }

    public Page<Invoice> getInvoicesByProperty(Long propertyId, Pageable pageable) {
        return invoiceRepository.findByTenantUnitPropertyId(propertyId, pageable);
    }

    public Page<Invoice> getInvoicesByPropertyAndDateRange(
            Long propertyId, LocalDate startDate, LocalDate endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByTenantUnitPropertyIdAndInvoiceDateBetween(
                propertyId, startDate, endDate, pageable);
    }

    public Page<Invoice> getInvoicesByPropertyAndStatus(
            Long propertyId, InvoiceStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByTenantUnitPropertyIdAndStatus(
                propertyId, status, pageable);
    }

    public Page<Invoice> getInvoicesByPropertyStatusAndDateRange(
            Long propertyId, InvoiceStatus status, LocalDate startDate, LocalDate endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return invoiceRepository.findByTenantUnitPropertyIdAndStatusAndInvoiceDateBetween(
                propertyId, status, startDate, endDate, pageable);
    }

    // Viewing an invoice
    public Invoice getInvoice(String invoiceNumber) {
        return invoiceRepository.findById(invoiceNumber).orElse(null);
    }

}
