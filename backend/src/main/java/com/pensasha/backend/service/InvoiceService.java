package com.pensasha.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pensasha.backend.entity.Invoice;
import com.pensasha.backend.repository.InvoiceRepository;
import com.pensasha.backend.repository.TenantRepository;
import com.pensasha.backend.repository.UnitRepository;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private UnitRepository unitRepository;

    // Creating an invoice
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    // Schedule invoice creation

    // Updating an invoice

    // Deleting an invoice

    // Viewing all invoices

    // Viewing all invoices by Month

    // Viewing all invoices by tenant

    // Viewing all invoices by units

    // Viewing an invoice

}
