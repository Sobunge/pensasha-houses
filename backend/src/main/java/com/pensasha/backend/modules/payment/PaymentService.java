package com.pensasha.backend.modules.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.exceptions.ResourceNotFoundException;
import com.pensasha.backend.modules.invoice.Invoice;
import com.pensasha.backend.modules.invoice.InvoiceRepository;
import com.pensasha.backend.modules.user.tenant.TenantProfile;
import com.pensasha.backend.modules.user.tenant.TenantProfileRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service class for managing Payment-related business logic, 
 * including M-Pesa webhook processing and invoice reconciliation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;
    private final TenantProfileRepository tenantProfileRepository;

    @Transactional
    public Payment processIncomingPayment(
            String transactionReference,
            BigDecimal amount,
            LocalDateTime paymentDate,
            MethodsOfPayment method,
            String sourceIdentifier,
            Long tenantId,
            UUID invoiceId
    ) {
        log.info("Processing incoming payment. Ref: {}, Amount: {}, Method: {}", 
                transactionReference, amount, method);

        // 1. Idempotency Check (prevents double-crediting on webhook retries)
        if (transactionReference != null && !transactionReference.isBlank()) {
            Optional<Payment> existing = paymentRepository.findByTransactionReference(transactionReference);
            if (existing.isPresent()) {
                log.warn("Duplicate payment transaction reference detected: {}. Skipping.", transactionReference);
                return existing.get();
            }
        }

        // 2. Resolve Tenant
        TenantProfile tenant = tenantProfileRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant with id: " + tenantId + " not found"));

        // 3. Build & Save Payment
        Payment payment = new Payment();
        payment.setTransactionReference(transactionReference);
        payment.setAmount(amount);
        payment.setPaymentDate(paymentDate != null ? paymentDate : LocalDateTime.now());
        payment.setMethod(method);
        payment.setSourceIdentifier(sourceIdentifier);
        payment.setTenant(tenant);
        payment.setStatus(PaymentStatus.COMPLETED);

        if (invoiceId != null) {
            Invoice invoice = invoiceRepository.findById(invoiceId)
                    .orElseThrow(() -> new ResourceNotFoundException("Invoice with id: " + invoiceId + " not found"));
            payment.setInvoice(invoice);
        }

        Payment savedPayment = paymentRepository.save(payment);
        log.info("Successfully recorded payment with ID: {}", savedPayment.getId());
        return savedPayment;
    }

    @Transactional
    public Payment updatePaymentDetails(Long paymentId, Payment paymentDetails) {
        log.info("Updating payment with ID: {}", paymentId);

        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment with id: " + paymentId + " not found"));

        existingPayment.setAmount(paymentDetails.getAmount());
        existingPayment.setPaymentDate(paymentDetails.getPaymentDate());
        existingPayment.setMethod(paymentDetails.getMethod());
        existingPayment.setInvoice(paymentDetails.getInvoice());

        return paymentRepository.save(existingPayment);
    }

    public Optional<Payment> getPaymentById(Long id) {
        log.info("Fetching payment with ID: {}", id);
        return paymentRepository.findById(id);
    }

    public Page<Payment> getAllPayments(Pageable pageable) {
        log.info("Fetching all payments with pagination: {}", pageable);
        return paymentRepository.findAll(pageable);
    }

    @Transactional
    public void deletePayment(Long id) {
        log.info("Deleting payment with ID: {}", id);
        paymentRepository.deleteById(id);
    }

    @Transactional
    public Payment assignPaymentToInvoice(UUID invoiceId, Long paymentId) {
        log.info("Assigning invoice ID: {} to payment ID: {}", invoiceId, paymentId);

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment with id: " + paymentId + " not found"));

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice with id: " + invoiceId + " not found"));

        payment.setInvoice(invoice);
        return paymentRepository.save(payment);
    }
}