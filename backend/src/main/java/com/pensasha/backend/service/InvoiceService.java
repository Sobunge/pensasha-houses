package com.pensasha.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    // Creating an invoice
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    // Schedule invoice creation 5th of every month
    @Scheduled(cron = "0 0 0 5 * *") // At 00:00 on the 5th day of every month
    public void generateMonthlyInvoices() {
        List<Tenant> tenants = tenantRepository.findAll();
        for (Tenant tenant : tenants) {
            if (LocalDate.now().isAfter(tenant.getLeaseStartDate())
                    && LocalDate.now().isBefore(tenant.getLeaseEndDate())) {

                Invoice invoice = new Invoice();
                invoice.setTenant(tenant);
                invoice.setAmountDue(tenant.getMonthlyRent());
                invoice.setAmountPaid(0.0);
                invoice.setDueDate(LocalDate.now());
                invoice.setStatus(InvoiceStatus.DRAFT);

                invoiceRepository.save(invoice);
            }
        }
        System.out.println("Invoices generated for " + LocalDate.now());
    }

    // Updating an invoice

    // Deleting an invoice

    // Viewing all invoices

    // Viewing all invoices by Month

    // Viewing all invoices by tenant

    // Viewing all invoices by units

    // Viewing an invoice

}
