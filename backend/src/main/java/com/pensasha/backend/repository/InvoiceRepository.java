package com.pensasha.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, String>{

    List<Invoice> findByInvoiceDateMonth(int month);

    List<Invoice> findByTenantId(Long tenantId);

}
