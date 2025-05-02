package com.pensasha.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pensasha.backend.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, String>{

}
