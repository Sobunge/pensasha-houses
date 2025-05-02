package com.pensasha.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.pensasha.backend.entity.Invoice;
import com.pensasha.backend.entity.InvoiceSequence;
import com.pensasha.backend.entity.InvoiceStatus;
import com.pensasha.backend.entity.Tenant;
import com.pensasha.backend.repository.InvoiceRepository;
import com.pensasha.backend.repository.InvoiceSequenceRepository;
import com.pensasha.backend.repository.TenantRepository;
import com.pensasha.backend.repository.UnitRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final TenantRepository tenantRepository;
    private final UnitRepository unitRepository;
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

    // Schedule invoice creation 5th of every month
    @Scheduled(cron = "0 0 0 5 * ?")
    @Transactional
    public void generateMonthlyInvoices() {
        List<Tenant> tenants = tenantRepository.findAll();

        for (Tenant tenant : tenants) {
            if (tenant.getLeaseEndDate().isAfter(LocalDate.now())) {
                Invoice invoice = new Invoice();
                invoice.setInvoiceNumber(generateInvoiceNumber());
                invoice.setTenant(tenant);
                invoice.setAmountDue(tenant.getMonthlyRent());
                invoice.setInvoiceDate(LocalDate.now());
                invoice.setDueDate(LocalDate.now().plusDays(5));
                invoice.setStatus(InvoiceStatus.PENDING);

                invoiceRepository.save(invoice);
            }
        }
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
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    // Viewing all invoices by Month
    public List<Invoice> getInvoicesByMonth(int month) {
        return invoiceRepository.findByInvoiceDateMonth(month);
    }

    // Viewing all invoices by tenant
    public List<Invoice> getInvoicesByTenant(Long tenantId) {
        return invoiceRepository.findByTenantId(tenantId);
    }

    // Viewing all invoices by units

    // Viewing an invoice
    public Invoice getInvoice(String invoiceNumber) {
        return invoiceRepository.findById(invoiceNumber).orElse(null);
    }

}
